pipeline {
    agent {
        label 'master'
    }
    tools {
        nodejs 'NodeJS 22.14.0' // Match the name you configured in Global Tools
    }
    stages {
        // stage('Clone Repository') {
        //     steps {
        //         git branch: 'main', url: 'https://github.com/your-username/your-repo.git'
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
        // stage('Run Tests') {
        //     steps {
        //         sh 'npm test'
        //     }
        // }
        // stage('Start') {
        //     steps {
        //         sh 'npm run build'
        //     }
        // }
        stage('Deploy') {
            steps {
                // Copy project files to the remote server
                sh '''
                scp -r . root@203.194.114.176:/home/user/node-apps/
                pm2 delete all || true    # Stop previous PM2 processes
                pm2 start index.js --name "backend-app" # Start the app
                pm2 save                  # Save PM2 process for server reboot
                EOF
                '''
            }
        }
    }
    post {
        always {
            // Cleanup or status notification
            echo 'Pipeline execution completed!'
        }
    }
}