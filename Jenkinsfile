pipeline {
    agent { docker { image 'node:14-alpine' } }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
        stage('e2e tests') {
            steps {
                sh 'ng ng e2e'
        }
    }
}
