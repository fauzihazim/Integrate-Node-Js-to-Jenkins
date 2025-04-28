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
        // stage('Clone Repository'){
        //     steps{
        //         git branch: 'main',
        //             url: 'https://github.com/MIRTAHAALI/express_server_for_flutter_app_testing.git'
        //     }
        // }
        
        stage('Install Dependencies'){
            steps {
                sh 'npm install'
            }
        }
        //  stage('Install pm2'){
        //     steps {
        //         sh 'npm install pm2 -g'
        //     }
        // }
        
        // stage('Deploy'){
        //     steps {
        //         sh 'pm2 startOrRestart pm2.config.json'
        //     }
        // }
        stage('Start Application') {
            steps {
                sh '''
                pm2 delete all || true        # Stop previous processes
                pm2 start index.js --name "node-app" --no-autorestart # Start the application
                pm2 save                      # Save the PM2 process list
                '''
            }
        }

    }
    // post {
    //     always {
    //         echo 'Restarting application...'
    //         sh 'pm2 restart node-app'
    //     }
    // }
}