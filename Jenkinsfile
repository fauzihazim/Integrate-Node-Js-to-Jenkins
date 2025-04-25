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
                sh '''
                    ssh userName@development-server-ip <<EOF       
                    cd /your-project-path 
                    git pull      
                    npm install --production      
                    pm2 restart all
                    exit      
                    EOF
                '''
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