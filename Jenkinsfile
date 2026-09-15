def version

pipeline {

    agent {
        label 'AGENT-1'
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
       
    }

    environment {
        nexusUrl = 'nexus.localhelp.store:8081'
        APP_NAME  = "frontend"
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh '''
                   npm install
                '''
            }
        }

        stage('Build React Application') {
            steps {
                sh '''
                    npm run build

                    ls -ltr build
                '''
            }
        }

        stage('Prepare Artifact') {
            steps {
                script {
                    version = env.BUILD_NUMBER
                }

                 sh '''
                    zip -r frontend-${BUILD_NUMBER}.zip build
                '''

                 sh '''
                    ls -lh *.zip
                '''

            }
        }

          stage('Docker Build and Push to ECR') {
            steps {
                sh """
                    echo "===== LOGIN TO ECR ====="

                    aws ecr get-login-password --region ${region} | \
                    docker login \
                        --username AWS \
                        --password-stdin \
                        ${account_id}.dkr.ecr.${region}.amazonaws.com


                    echo "===== BUILDING FRONTEND DOCKER IMAGE ====="

                    docker build \
                        -t ${account_id}.dkr.ecr.${region}.amazonaws.com/${ECR_REPO}:${version} \
                        .


                    echo "===== DOCKER IMAGE CREATED ====="

                    docker images | grep ${ECR_REPO}


                    echo "===== PUSHING IMAGE TO ECR ====="

                    docker push \
                        ${account_id}.dkr.ecr.${region}.amazonaws.com/${ECR_REPO}:${version}
                """
            }
        }

         stage('Deploy to K8') {
            steps {
                sh """
                    echo "========= AUTHENTICATE TO EKS =========="

                    aws eks update-kubeconfig \
                        --region ${region} \
                        --name localhelp-dev

                    export KUBECONFIG=/home/ec2-user/.kube/config

                    kubectl get nodes


                    echo "========= DEPLOY FRONTEND USING HELM =========="

                    cd helm

                    sed -i 's/IMAGE_VERSION/${version}/g' values.yaml

                    helm upgrade --install frontend . \
                        --namespace localhelp \
                        --create-namespace


                    echo "========== CHECK NAMESPACE AND PODS =========="

                    kubectl get ns

                    kubectl get pods -n localhelp

                    echo "========== FRONTEND DEPLOYMENT STATUS =========="

                    kubectl rollout status \
                        deployment/frontend \
                        -n localhelp
                """
            }
        }



        stage('Upload Artifact to S3') {
            steps {
                sh """
                    echo "===== UPLOADING FRONTEND ARTIFACT TO S3 ====="

                    aws s3 cp \
                        frontend-${version}.zip \
                        s3://localhelp-frontend-artifacts/frontend/${version}/frontend-${version}.zip

                    echo "===== S3 UPLOAD COMPLETED ====="

                    echo "===== S3 ARTIFACTS ====="

                    aws s3 ls \
                        s3://localhelp-frontend-artifacts/frontend/${version}/
                """
            }
        }
    }


      
        // stage('Upload Artifact to Nexus') {
        //     steps {
        //         script {

        //             nexusArtifactUploader(
        //                 nexusVersion: 'nexus3',
        //                 protocol: 'http',
        //                 nexusUrl: nexusUrl,
        //                 repository: 'frontend',
        //                 credentialsId: 'nexus-auth',

        //                 groupId: 'com.localhelp',
        //                 version: version,

        //                 artifacts: [
        //                     [
        //                         artifactId: APP_NAME,
        //                         classifier: '',
        //                         file: "frontend-${version}.zip",
        //                         type: 'zip'
        //                     ]                            
        //                 ]
        //             )

        //         }
        //     }
        // }
        // stage('Trigger Frontend Deployment') {

        //     steps {

        //         build(
        //             job: 'frontend-deploy',
        //             wait: false,
        //             parameters: [
        //                 string(
        //                     name: 'VERSION',
        //                     value: version
        //                 )
        //             ]
        //         )

        //     }

        // }
    }

    post {

        always {
            echo "===== CLEANING WORKSPACE ====="
            deleteDir()
        }

        success {
            echo "Frontend Pipeline Successful"
        }

        failure {
            echo "Frontend Pipeline Failed"
        }
    }
