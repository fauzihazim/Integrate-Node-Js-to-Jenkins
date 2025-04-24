pipeline {
    agent {
        node {
            label "linux && node22_14_0"
        }
    }
    
    tools {
        nodejs 'NodeJS 22.14.0' // Match the name you configured in Global Tools
    }
    
    stages {
        // stage('Checkout') {
        //     steps {
        //         git branch: 'main', url: 'https://github.com/yourusername/your-repo.git'
        //     }
        // }

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
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        // Add additional stages as needed (build, deploy, etc.)
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
        cleanup {
            echo "Cleaning up"
        }
    }
}