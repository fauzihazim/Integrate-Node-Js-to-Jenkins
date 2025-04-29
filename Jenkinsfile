pipeline{
    agent {
        node {
            label "master" // or your specific agent label
        }
    }

    tools {
        nodejs 'NodeJS 22.14.0' // Make sure this matches your Jenkins Global Tool config
    }
    // stages {
    //     stage('Install Dependencies'){
    //         steps {
    //             sh 'npm install'
    //         }
    //     }

    //     stage('Start Application') {
    //         steps {
    //             sh '''
    //             pm2 delete all || true        # Stop previous processes
    //             pm2 startup && pm2 save
    //             '''
    //         }
    //     }
    // }
    environment {
        SSH_CREDS = credentials('vps-ssh-key')  // Load credentials
    }
    stages {
        stage('Deploy') {
        steps {
            sshagent([SSH_CREDS]) {  // Activate SSH agent
            sh '''
                ssh -o StrictHostKeyChecking=no deploy@203.194.114.176 "
                git pull
                pm2 restart ecosystem.config.js
                "
            '''
            }
        }
        }
    }
}