node {

    // ~~~ Build Configuration

    // Code repo
    def repo = 'https://github.com/ICFI/eagle.git'
    def branch = 'master'

    // Container
    def name = 'eagle'

    // ~~~ Build Environment

    // Cluster name is used to label resources to differentiate between deployments
    def cluster = sh (script: 'cat /etc/ecs/ecs.config | sed s/ECS_CLUSTER=//', returnStdout: true).trim()

    // Query the EC2 metadata service and return the current AWS region in which we're running
    def region = sh (script: 'curl -s http://169.254.169.254/latest/dynamic/instance-identity/document | jq -r .region', returnStdout: true).trim()

    // Name of the image including the ECR repo
    def image = "${awsIdentity().account}.dkr.ecr.${region}.amazonaws.com/${name}-${cluster}"

    stage('Preparation') {
        git url: repo, branch: branch
    }
    stage('Build App') {
        sh "./gradlew npmInstall build -Dorg.gradle.daemon=false"
    }
    stage('Build Container') {
        sh "aws configure set default.region ${region}"
        sh "sudo \$(aws ecr get-login --no-include-email)"
        sh "sudo docker build -t ${name}:${env.BUILD_ID} --build-arg JAR_FILE=./build/libs/${name}.jar -f ./container/Dockerfile  ."
    }
    stage('Push Container') {
        sh "sudo docker tag ${name}:${env.BUILD_ID} ${image}:${env.BUILD_ID}"
        sh "sudo docker tag ${name}:${env.BUILD_ID} ${image}:latest"
        sh "sudo docker push ${image}:${env.BUILD_ID}"
        sh "sudo docker push ${image}:latest"
    }
    stage('Deploy Container') {
        sh "aws ecs update-service --cluster ${cluster} --service ${name} --force-new-deployment"
    }
}