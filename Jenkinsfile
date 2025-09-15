pipeline {
    agent any

    environment {
        DOCKER_COMPOSE_FILE = 'docker-compose.yml'
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Nandanikirtani/Edutainment.git'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} build"
            }
        }

        stage('Start Services') {
            steps {
                sh "docker-compose -f ${DOCKER_COMPOSE_FILE} up -d"
            }
        }

        stage('Verify Containers') {
            steps {
                sh "docker ps"
            }
        }

        stage('Health Check') {
            steps {
                script {
                    // frontend check (Vite/NGINX)
                    sh "curl -f http://localhost:5173 || true"
                    // backend check
                    sh "curl -f http://localhost:5000 || true"
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning unused docker resources...'
            sh "docker system prune -f || true"
        }
    }
}
