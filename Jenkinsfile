pipeline {
    agent { label 'docker' }
    triggers {
        bitbucketPush()
    }
    environment {
        APP_VERSION = '1'
        ENVIRONMENT = "Cypress"
        ALGOLIA_KEY = credentials('algolia-private-api-key')
        ALGOLIA_CONFIG_FILE = credentials('algolia-config-file')
        FIREBASE_CONFIG_FILE = credentials('firebase-config-file')
    }
    stages {
        stage('Build') {
            steps {
                sh 'echo $GIT_BRANCH'
                sh 'echo $GIT_COMMIT'
                sh 'printenv'
                sh 'rm -rf node_modules'
                sh 'rm -rf test-results'
                sh 'rm -rf config/algolia-secret-admin-api-key.txt'
                sh 'echo -n $ALGOLIA_KEY >> config/algolia-secret-admin-api-key.txt'
                sh 'cp $ALGOLIA_CONFIG_FILE config/config-algolia.js'
                sh 'cp $FIREBASE_CONFIG_FILE config/config-firebase.js'
                sh 'ls -lh config/'
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
              sh "docker-compose -f jenkins-docker-compose.yml exec -T playwright npx playwright test --grep @ping"
              sh "docker-compose -f jenkins-docker-compose.yml exec -T playwright npx playwright test --grep @goal"
              sh "docker-compose -f jenkins-docker-compose.yml exec -T playwright npx playwright test --grep @activity"
              sh "docker-compose -f jenkins-docker-compose.yml exec -T playwright npx playwright test --grep @module"
              // sh "docker-compose -f jenkins-docker-compose.yml exec -T playwright npx playwright test --project=docker course-module-flow.spec.js"
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
            sh 'docker-compose -f jenkins-docker-compose.yml logs sveltekit-test'
            sh 'docker-compose -f jenkins-docker-compose.yml logs firebase'
            archiveArtifacts artifacts: 'test-results/**/*.zip', allowEmptyArchive: true
            sh 'docker-compose -f jenkins-docker-compose.yml down'
        }
    }
}