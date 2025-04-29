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
                    sh '''
                        [ -d ~/.ssh ] || mkdir ~/.ssh && chmod 0700 ~/.ssh
                        ssh-keyscan -t rsa,dsa http://203.194.114.176 >> ~/.ssh/jenkins-deploy-key
                        ssh root@http://203.194.114.176 ...
                    '''
                }
            }
        }
    }
}