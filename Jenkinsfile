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
            // steps {
            //     sh 'npm start'
            // }
            steps {
                sh '''
                    npm install
                    nohup nodemon app.js > nodemon.log 2>&1 &
                    echo $! > nodemon.pid
                    sleep 5  # Wait for startup
                '''
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
            echo "Steps is running"
        }
        success {
            echo "Successfully running"
        }
        failure {
            echo "Failed running"
        }
        // cleanup {
        //     echo "Cleaning up"
        // }
    }
}