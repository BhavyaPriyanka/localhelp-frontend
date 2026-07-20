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


      
        stage('Upload Artifact to Nexus') {
            steps {
                script {

                    nexusArtifactUploader(
                        nexusVersion: 'nexus3',
                        protocol: 'http',
                        nexusUrl: nexusUrl,
                        repository: 'frontend',
                        credentialsId: 'nexus-auth',

                        groupId: 'com.localhelp',
                        version: version,

                        artifacts: [
                            [
                                artifactId: APP_NAME,
                                classifier: '',
                                file: "frontend-${version}.zip",
                                type: 'zip'
                            ]                            
                        ]
                    )

                }
            }
        }
        stage('Trigger Frontend Deployment') {

            steps {

                build(
                    job: 'frontend-deploy',
                    wait: false,
                    parameters: [
                        string(
                            name: 'VERSION',
                            value: version
                        )
                    ]
                )

            }

        }
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
}