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
                sh 'node app.js & echo $! > node.pid'
                sh 'sleep 5; curl -f http://203.194.114.176:3000 || exit 1'
            }
        }

        stage('Find IP Address') {
            steps {
                script {
                    def ipAddress = sh(
                        script: 'hostname -I | awk \'{print $1}\'',
                        returnStdout: true
                    ).trim()
                    echo "IP Address: ${ipAddress}"
                }
            }
        }

    }
    
    post {
        always {
            sh 'kill $(cat node.pid) 2>/dev/null || true'
        }
    }
}