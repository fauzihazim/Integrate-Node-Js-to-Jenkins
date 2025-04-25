pipeline {
    agent {
        label 'master'
    }

    tools {
        nodejs 'NodeJS 22.14.0' // Configured Node.js version in Jenkins
    }

    environment {
        DEPLOY_PATH = "/home/user/node-apps"      // Deployment path on the remote server
        SERVER_USER = "root"                      // SSH user for remote server
        SERVER_IP = "203.194.114.176"             // IP address of the remote server
        APP_NAME = "node-app"                     // PM2 application name
        PUBLIC_KEY = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDMzcEiC0dbAlUsNwGDjL5SG9Mi4KglFTLjHSSaSX7bJxt32GUHYXTR/92s6lL8MpyQxcRtErD73hWqJv2BSz+bvUkrquWjJLVwquwN7I+y4H15OewHnSNxfYXslwi3X2ShEEOv1+bUH8kN/0/oy/FMRRpkO6GL2J3L9M9uWmr7bXdnyJT0M7zBfd0s8yxURbfP/H7e8Yub5o3923XGGLgbkQ+aFtXzAlaGiy+qHgQnyA4vq8Bxf0JMfhEN23jZb/Z9S4QQ1zHjnWneQJ6qL0IJ1Z42u39TNf6/k8tzaK6XlNS4JZQhNAvPmHBHO5Jnr0emm9vwb+GLFlA/uZFQZlqk5jG9TLcath53tZYYOsvmHHEJ7Z9h8ei3nwZ5SoYzj4zKvUqGcKLY4AXNeGsZ01/P7iS9Jw5KOJv9i8xeRXBDShOBOwV4ruwBH4umQ8XoUNwgB65ghbltMP6GZ9DudR1OfIk4ZTWuVwybPTOnJeXPPxPCU/VrtROh0DmFIdSkF0hD0qYW1DKybr8tVOYYj5WB319a4Vxs68ANE4L2USagLM8vUqyUi2PqkNjqu2VNCWH2+tt7SHwJgFdDbJncZZV+ndNLOJzZwVbKKKuRftXnDwiI9WpiL6Xc9tyZucUsrqb01eGVxviPyKHgA02DRq+3Z0oVGXBG+YS8/tjiO001mw== root@beta4590host.com" // Your id_rsa.pub content
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

        stage('Run Tests') {
            steps {
                echo 'Running tests...'
                sh 'npm test'
            }
        }

        stage('Transfer Files to Server') {
            steps {
                echo 'Transferring project files to the remote server...'
                sh '''
                scp -r . ${SERVER_USER}@${SERVER_IP}:${DEPLOY_PATH}/
                '''
            }
        }

        stage('Deploy with PM2') {
            steps {
                echo 'Deploying application using PM2 on the remote server...'
                sh '''
                ssh ${SERVER_USER}@${SERVER_IP} << EOF
                cd ${DEPLOY_PATH}
                pm2 delete all || true    # Stop previous PM2 processes
                pm2 start index.js --name "${APP_NAME}" # Start the application
                pm2 save                  # Save PM2 process list for reboot
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
            echo 'Pipeline failed. Check logs for details.'
        }
    }

}