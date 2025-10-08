// Simple Jenkins pipeline for Digital Minimalism Dashboard
// Just checkout code and run Python health check

pipeline {
  agent any

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Health Check') {
      steps {
        script {
          echo 'Running project health check...'
          if (isUnix()) {
            sh 'python3 health-check.py || python health-check.py'
          } else {
            bat 'python health-check.py'
          }
          echo 'Health check completed successfully!'
        }
      }
    }
  }

  post {
    success {
      echo 'Build succeeded - Project is healthy!'
    }
    failure {
      echo 'Build failed - Check health check output'
    }
  }
}

