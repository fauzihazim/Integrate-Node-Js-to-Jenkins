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
                    # Clean up any previous PM2 instances
                    pm2 kill || true
                    
                    # Start application with PM2
                    pm2 start index.js --name my-app
                    sleep 5  # Wait for startup
                    curl -f http://localhost:3000 || exit 1  # Verify endpoint
                '''
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