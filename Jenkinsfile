pipeline {
    agent {
        node {
            label "master"
        }
    }
    
    tools {
        nodejs 'NodeJS 22.14.0' // Match the name you configured in Global Tools
    }
    
    steps {
        sh 'node app.js & echo $! > node.pid'
        sh 'sleep 5; curl -f http://localhost:3000 || exit 1'
    }
    post {
        always {
            sh 'kill $(cat node.pid) 2>/dev/null || true'
        }
    }
}