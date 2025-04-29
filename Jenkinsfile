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
                '''
            }
        }
        stage('Coba Credential Key') {
            steps {
                sshagent(credentials: ['vps-ssh-key']) {
                    sh """
                        ssh -o StrictHostKeyChecking=no root@203.194.114.176 "
                        npm install --production
                        pm2 restart ecosystem.config.cjs || 
                            pm2 start ecosystem.config.cjs
                        pm2 save
                        "
                    """
                }
            }
        }
    }
}