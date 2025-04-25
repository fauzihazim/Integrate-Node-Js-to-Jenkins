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
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'scp -r ./build root@203.194.114.176:/home/user/node-apps/'
            }
        }
    }
}