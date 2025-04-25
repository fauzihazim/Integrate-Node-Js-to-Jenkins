pipeline {
    agent {
        node {
            label "master"
        }
    }
    
    tools {
        nodejs 'NodeJS 22.14.0' // Match the name you configured in Global Tools
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
        stage('Start') {
            steps {
                sshagent(['ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQDMzcEiC0dbAlUsNwGDjL5SG9Mi4KglFTLjHSSaSX7bJxt32GUHYXTR/92s6lL8MpyQxcRtErD73hWqJv2BSz+bvUkrquWjJLVwquwN7I+y4H15OewHnSNxfYXslwi3X2ShEEOv1+bUH8kN/0/oy/FMRRpkO6GL2J3L9M9uWmr7bXdnyJT0M7zBfd0s8yxURbfP/H7e8Yub5o3923XGGLgbkQ+aFtXzAlaGiy+qHgQnyA4vq8Bxf0JMfhEN23jZb/Z9S4QQ1zHjnWneQJ6qL0IJ1Z42u39TNf6/k8tzaK6XlNS4JZQhNAvPmHBHO5Jnr0emm9vwb+GLFlA/uZFQZlqk5jG9TLcath53tZYYOsvmHHEJ7Z9h8ei3nwZ5SoYzj4zKvUqGcKLY4AXNeGsZ01/P7iS9Jw5KOJv9i8xeRXBDShOBOwV4ruwBH4umQ8XoUNwgB65ghbltMP6GZ9DudR1OfIk4ZTWuVwybPTOnJeXPPxPCU/VrtROh0DmFIdSkF0hD0qYW1DKybr8tVOYYj5WB319a4Vxs68ANE4L2USagLM8vUqyUi2PqkNjqu2VNCWH2+tt7SHwJgFdDbJncZZV+ndNLOJzZwVbKKKuRftXnDwiI9WpiL6Xc9tyZucUsrqb01eGVxviPyKHgA02DRq+3Z0oVGXBG+YS8/tjiO001mw== root@beta4590host.com']) {
                    sh '''
                    ssh root@203.194.114.176 <<EOF
                    cd /home/user/node-apps
                    npm install --production
                    pm2 restart all
                    exit
                    EOF
                    '''
                }

                sh 'sleep 5; curl -f http://203.194.114.176:3000 || exit 1'
                sh 'curl -f http://203.194.114.176:3000/getStudents'
                sh 'pm2 list'
                sh 'curl -f http://203.194.114.176:3000'
                echo 'Start Stage Complete'
            }
        }
    }
    
    post {
        always {
            sh 'curl -f http://203.194.114.176:3000'
            echo 'Pipeline Complete'
        }
    }
}