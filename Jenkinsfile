node {

    // ~~~ Build Configuration

    sh "printenv"

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
      dir(name) {
        git url: repo, branch: branch
        // cleanup from prior runs
        sh "ls -al"
        sh "sudo rm -rf $WORKSPACE/analysis_results"
        sh "mkdir $WORKSPACE/analysis_results"
    	sh 'sudo docker stop analysis_results || true'
      }
    }

    stage('Build Image') {
      dir(name) {
        sh 'set -x'
	    sh "sudo docker build -t ${name}:${env.BUILD_ID} -f ./container/Dockerfile ."
	    println "pull analysis results from docker build stage image"
	    // find the intermediate build-stage image by its "test" label
	    def build_stage_image_id = sh (script: 'sudo docker images --filter "label=test=true" -q', returnStdout: true).tokenize()[0]
	    // tag that image so we can run it
	    sh "sudo docker tag $build_stage_image_id analysis_results:latest"
	    // run the image so we can get analysis results from it
	    sh 'sudo docker run --rm --name analysis_results -d analysis_results:latest tail -f /dev/null'
	    // copy the analysis results locally
	    sh "sudo docker cp analysis_results:/app/build $WORKSPACE/analysis_results"
	    // kill the container
	    sh "sudo docker stop analysis_results &"
      }
    }

    stage ('Publish Test Results') {
        dir ('analysis_results'){
          jacoco()
        }
        // junit plugin wants "fresh" test results (a build with no changes
        //   will have test results with older dates).
        sh 'sudo touch analysis_results/build/test-results/test/*.xml'
        junit 'analysis_results/build/test-results/test/*.xml'
    }

    stage('Push Image') {
        sh "aws configure set default.region ${region}"
        sh "sudo \$(aws ecr get-login --no-include-email)"
        sh "sudo docker tag ${name}:${env.BUILD_ID} ${image}:${env.BUILD_ID}"
        sh "sudo docker tag ${name}:${env.BUILD_ID} ${image}:latest"
        sh "sudo docker push ${image}:${env.BUILD_ID}"
        sh "sudo docker push ${image}:latest"
    }

    stage('Deploy Service') {
        sh "aws ecs update-service --cluster ${cluster} --service ${name} --force-new-deployment"
    }
}
