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
        stage('Start Server') {
            steps {
                // Use nohup to keep server running after pipeline ends
                sh 'nohup npm start > /dev/null 2>&1 &'
                sh 'sleep 10' // Give server time to start
            }
        }
        
        stage('Verify Accessibility') {
            steps {
                // Check if port is open (alternative to curl)
                sh 'nc -zv 203.194.114.176 3000 || exit 1'
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline Complete'
        }
    }
}