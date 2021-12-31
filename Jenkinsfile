pipeline {
    agent { label 'docker' }
    triggers {
        bitbucketPush()
    }
    environment {
        APP_VERSION = '1'
        ENVIRONMENT = "Cypress"
        ALGOLIA_KEY = credentials('algolia-private-api-key')
    }
    stages {
        stage('Build') {
            steps {
                sh 'echo $GIT_BRANCH'
                sh 'echo $GIT_COMMIT'
                sh 'printenv'
                sh 'rm -rf svelte/node_modules'
                sh 'echo $ALGOLIA_KEY >> config/secret-algolia-key.txt'
                sh 'docker-compose -f jenkins-docker-compose.yml build'
                sh 'docker-compose -f jenkins-docker-compose.yml up -d --remove-orphans'
                // sh 'docker-compose -f cypress-docker-compose.yml exec -T -u node sveltekit printenv'
                // sh 'docker-compose -f cypress-docker-compose.yml exec -T -d -u node sveltekit npm run dev'
                // sh 'docker-compose -f cypress-docker-compose.yml exec -T -d -u node sveltekit npm run emulate'
                sleep 60 
                sh 'docker-compose -f jenkins-docker-compose.yml logs sveltekit-test'
                sh 'docker-compose -f jenkins-docker-compose.yml logs firebase'
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
              echo 'Playwright tests'
              // sh 'docker-compose -f cypress-docker-compose.yml exec -T cypress npm ci'
              sh "docker-compose -f jenkins-docker-compose.yml exec -T playwright npm run playwright-docker"
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
            archiveArtifacts artifacts: 'svelte/test-results/**/*.zip', fingerprint: true
            sh 'docker-compose -f jenkins-docker-compose.yml down'
        }
    }
}