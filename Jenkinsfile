pipeline {
    agent any

    environment {
        NODEJS_HOME = '/Users/mac/.nvm/versions/node/v22.11.0/bin'
        DOCKER_BIN = '/usr/local/bin'
        PATH = "${NODEJS_HOME}:${DOCKER_BIN}:${env.PATH}"
        DOCKER_HUB_CREDENTIALS = 'docker-hub-creds'   
        DOCKER_IMAGE_NAME = 'jashank06/edutainment_1'
        DOCKER_TAG = "latest"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Nandanikirtani/Edutainment.git'
            }
        }

        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Backend Build') {
            steps {
                dir('backend') {
                    sh 'npm install'
                    // Agar backend me build script ho, uncomment karna:
                    // sh 'npm run build'
                }
            }
        }

        stage('Archive Artifacts') {
            steps {
                archiveArtifacts artifacts: 'frontend/dist/**', allowEmptyArchive: true, fingerprint: true
            }
        }

        stage('Docker Compose Up') {
            steps {
                dir('.') {
                    sh 'docker-compose down'
                    sh 'docker-compose build'
                    sh 'docker-compose up -d'
                }
            }
        }

        stage('Docker Push to Hub') {
    steps {
        withCredentials([usernamePassword(credentialsId: "${DOCKER_HUB_CREDENTIALS}", usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
            sh """
                echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin

                # Backend image
                docker build -t ${DOCKER_USER}/edutainment-backend:latest -f backend/Dockerfile backend
                docker push ${DOCKER_USER}/edutainment-backend:latest

                # Frontend image
                docker build -t ${DOCKER_USER}/edutainment-frontend:latest -f frontend/Dockerfile frontend
                docker push ${DOCKER_USER}/edutainment-frontend:latest

                docker logout
            """
        }
    }
}
    }

    post {
        success {
            echo '✅ Build, Docker Deployment & Push Successful!'
        }
        failure {
            echo '❌ Build or Docker Deployment Failed!'
        }
    }
}
