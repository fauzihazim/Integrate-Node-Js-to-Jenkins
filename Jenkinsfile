pipeline {
    agent {
        label 'master'
    }

    tools {
        nodejs 'NodeJS 22.14.0' // Configured Node.js version in Jenkins
    }

    environment {
        DEPLOY_PATH = "/home/user/node-apps"                        // Deployment path on your VPS
        SERVER_USER = "root"                                        // SSH username
        SERVER_IP = "203.194.114.176"                               // VPS IP address
        APP_NAME = "backend-app"                                    // PM2 app name
        PUBLIC_KEY = credentials('jenkins-master-credential-id')    // Jenkins ID
    }

    stages {
        stage('Add Public Key to Remote Server') {
            steps {
                echo 'Adding public key to the remote server...'
                sh '''
                echo "${PUBLIC_KEY}" | ssh ${SERVER_USER}@${SERVER_IP} "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
                '''
            }
        }
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm install'
            }
        }
        // stage('Run Tests') {
        //     steps {
        //         echo 'Running tests...'
        //         sh 'npm test'
        //     }
        // }
        stage('Transfer Files') {
            steps {
                echo 'Transferring application files...'
                sh '''
                scp -r . ${SERVER_USER}@${SERVER_IP}:${DEPLOY_PATH}/
                '''
            }
        }
        stage('Deploy with PM2') {
            steps {
                echo 'Deploying application using PM2...'
                sh '''
                ssh ${SERVER_USER}@${SERVER_IP} << EOF
                cd ${DEPLOY_PATH}
                pm2 delete all || true    # Stop previous processes
                pm2 start index.js --name "${APP_NAME}" # Start app
                pm2 save                  # Save PM2 configuration
                EOF
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed!'
        }
        success {
            echo 'Application deployed successfully!'
        }
        failure {
            echo 'Pipeline failed. Please check logs.'
        }
    }
}