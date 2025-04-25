pipeline {
    agent {
        node {
            label "master" // or your specific agent label
        }
    }

    tools {
        nodejs 'NodeJS 22.14.0' // Make sure this matches your Jenkins Global Tool config
    }

    environment {
        APP_NAME = "my-node-app"
        APP_PORT = "3000"
        SERVER_IP = "203.194.114.176"
        ENTRY_FILE = "index.js" // Change if your app entry point is different
    }

    stages {
        stage('Check Node and NPM version') {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        // stage('Install PM2') {
        //     steps {
        //         sh 'npm install -g pm2'
        //     }
        // }

        stage('Start App with PM2') {
            steps {
                sh '''
                    pm2 delete ${APP_NAME} || true
                    pm2 start ${ENTRY_FILE} --name ${APP_NAME}
                '''
            }
        }

        stage('Deploy') {
            steps {
                sh 'pm2 startOrRestart pm2.config.json'
            }
        }

        stage('Health Check') {
            steps {
                script {
                    sh '''
                        echo "Waiting for app to start..."
                        sleep 5
                        curl -f http://${SERVER_IP}:${APP_PORT} || {
                            echo "Health check failed. App not reachable."
                            pm2 logs ${APP_NAME}
                            exit 1
                        }
                    '''
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution finished.'
            sh 'pm2 save'
        }

        failure {
            echo 'Build failed! Check logs.'
        }
    }
}
