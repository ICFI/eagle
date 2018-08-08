#!/bin/bash
set -x

echo "ECS_CLUSTER=${ecs_cluster}" > /etc/ecs/ecs.config

# Reclaim unused Docker disk space - https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-ami-storage-config.html
cat << "EOF" > /usr/local/bin/claimspace.sh
#!/bin/bash
docker ps -q | xargs docker inspect --format='{{ .State.Pid }}' | xargs -IZ sudo fstrim /proc/Z/root/
exit $?
EOF
chmod +x /usr/local/bin/claimspace.sh
echo "5 3 * * * root /usr/local/bin/claimspace.sh" > /etc/cron.d/claimspace

# Mount the EFS filesystem used by containers
EFS_VOLUME_ID="${efs_filesystem_id}"
EFS_MOUNT_DIR=/mnt/efs
yum -y install amazon-efs-utils jq

with_backoff() {
  local max_attempts=$${ATTEMPTS-8}
  local timeout=$${INTIAL_POLLING_INTERVAL-4}
  local attempt=0
  local exitCode=0

  while (( $attempt < $max_attempts ))
  do
    set +e
    "$@"
    exitCode=$?
    set -e

    if [[ $exitCode == 0 ]]
    then
      break
    fi

    echo "Retrying $@ in $timeout.." 1>&2
    sleep $timeout
    attempt=$(( attempt + 1 ))
    timeout=$(( timeout * 2 ))
  done

  if [[ $exitCode != 0 ]]
  then
    echo "Fail: $@ failed to complete after $max_attempts attempts" 1>&2
  fi

  return $exitCode
}

mount_efs() {
    mount -t efs $${EFS_VOLUME_ID} $${EFS_MOUNT_DIR}
    return $?
}

echo 'Stopping NFS ID Mapper...'
service rpcidmapd status &> /dev/null
if [ $? -ne 0 ] ; then
    echo 'rpc.idmapd is already stopped!'
else
    service rpcidmapd stop
    if [ $? -ne 0 ] ; then
        echo 'ERROR: Failed to stop NFS ID Mapper!'
        exit 1
    fi
fi

echo 'Checking if EFS mount directory exists...'
if [ ! -d $${EFS_MOUNT_DIR} ]; then
    echo "Creating directory $${EFS_MOUNT_DIR} ..."
    mkdir -p $${EFS_MOUNT_DIR}
    if [ $? -ne 0 ]; then
        echo 'ERROR: Directory creation failed!'
        exit 1
    fi
else
    echo "Directory $${EFS_MOUNT_DIR} already exists!"
fi

mountpoint -q $${EFS_MOUNT_DIR}
if [ $? -ne 0 ]; then
    echo "mount -t efs $${EFS_VOLUME_ID} $${EFS_MOUNT_DIR}"
    with_backoff mount_efs
    if [ $? -ne 0 ] ; then
        echo 'ERROR: Mount command failed!'
        exit 1
    fi
    if [ ! -d /mnt/efs/jenkins ]; then
        mkdir /mnt/efs/jenkins
        chown 1000:1000 /mnt/efs/jenkins
    fi

    # Pre-install plugins
    docker run -v /mnt/efs/jenkins:/var/jenkins_home jenkins/jenkins:lts-alpine bash -c "export REF=/var/jenkins_home/plugins/ ; /usr/local/bin/install-plugins.sh amazon-ecr amazon-ecs ant build-timeout credentials-binding email-ext findbugs git github-branch-source gradle greenballs jacoco ldap mailer matrix-auth pam-auth pipeline-aws pipeline-github-lib pipeline-stage-view ssh-slaves subversion timestamper workflow-aggregator ws-cleanup"
else
    echo "Directory $${EFS_MOUNT_DIR} is already a valid mountpoint!"
fi

# Additional user data
${additional_user_data_script}