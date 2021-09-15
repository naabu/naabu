pipeline {
    agent { label 'docker' }
    triggers {
        bitbucketPush()
    }
    environment {
        APP_VERSION = '1'
    }
    stages {
        stage('Build') {
            steps {
                sh 'echo $GIT_BRANCH'
                sh 'echo $GIT_COMMIT'
                sh 'docker-compose -f cypress-docker-compose.yml up -d --build'
                sh 'docker-compose -f cypress-docker-compose.yml exec -d sveltekit npm run dev'
                sh 'docker-compose -f cypress-docker-compose.yml exec -d sveltekit npm run emulate'
                sleep 10
            }
        }
        stage('Test') {
              environment {
                TEST_ENVIROMENTFILE = 'TEST'
                // we will be recording test results and video on Cypress dashboard
                // to record we need to set an environment variable
                // we can load the record key variable from credentials store
                // see https://jenkins.io/doc/book/using/using-credentials/
                // CYPRESS_RECORD_KEY = credentials('cypress-example-kitchensink-record-key')
              }
              steps {
                echo 'Cypress tests'
                sh 'docker-compose -f cypress-docker-compose.yml exec -T cypress npm ci'
                sh "docker-compose -f cypress-docker-compose.yml exec -T cypress npm run test"
              }
        }
        stage('Push') {
            when {
                branch 'master'
            }
            steps {
                echo 'Deploying project to Firebase'
            }
        }
    }
    post {
        always {
            sh 'docker-compose -f cypress-docker-compose.yml down'
        }
    }
}