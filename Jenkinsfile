pipeline {
    agent {
        label 'master'
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
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
        stage('Deploy') {
            steps {
                sh 'scp -r ./build user@your-server:/path/to/deploy/'
            }
        }
    }
}