pipeline{
    agent {
        node {
            label "master" // or your specific agent label
        }
    }

    tools {
        nodejs 'NodeJS 22.14.0' // Make sure this matches your Jenkins Global Tool config
    }
    stages {
        stage('Install Dependencies'){
            steps {
                sh 'npm install'
            }
        }

        stage('Start Application') {
            steps {
                sh '''
                pm2 delete all || true        # Stop previous processes
                pm2 start index.js --name "node-app" # Start the application
                pm2 save --force                      # Save the PM2 process list
                '''
            }
        }

    }
    post {
        always {
            sh 'pm2 resurrect'
        }
    }
}