pipeline {
    agent {
        label 'master'
    }

    tools {
        nodejs 'NodeJS 22.14.0' // Configured Node.js version in Jenkins
    }

    environment {
        APP_NAME = "my-node-app"
        DEPLOY_DIR = "/var/www/${APP_NAME}"
    }

    stages {
        // Automatic code checkout handled by Git plugin
        stage('Install Dependencies') {
            steps {
                sh 'npm ci --only=production'
            }
        }

        stage('Build') {
            when {
                expression { fileExists('package.json') && 
                           fileExists('npm-scripts.json') && 
                           scriptExists('build') }
            }
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to Production') {
            steps {
                sshagent(credentials: ['server-ssh-key']) {
                    sh """
                        # Sync files to server
                        rsync -avz --delete \
                            --exclude='node_modules' \
                            --exclude='.git' \
                            -e "ssh -o StrictHostKeyChecking=no" \
                            ./ ${DEPLOY_DIR}/

                        # Install and restart
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_USER}@${DEPLOY_SERVER} \
                            "cd ${DEPLOY_DIR} && \
                            npm install --production && \
                            pm2 restart ${APP_NAME}"
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            slackSend (
                color: currentBuild.currentResult == 'SUCCESS' ? 'good' : 'danger',
                message: "${env.JOB_NAME} #${env.BUILD_NUMBER}: ${currentBuild.currentResult}"
            )
        }
    }
}