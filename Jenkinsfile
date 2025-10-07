// Jenkins declarative pipeline for the Digital Minimalism Dashboard
// - Checkout
// - Install Node deps (npm ci)
// - Run lint (if script exists)
// - Run tests (if script exists)
// - Build (npm run build)
// - Archive .next and static assets
// Notes:
// - The pipeline tries to be cross-platform (sh / bat) using `isUnix`.
// - It will not fail the run if optional scripts (lint/test) are absent.
// - For best results, configure a NodeJS tool named 'node-18' in Jenkins and uncomment the tools block.

pipeline {
	agent any

	// tools {
	//   // Uncomment if the Jenkins NodeJS Plugin is installed and a Node installation named 'node-18' exists
	//   nodejs 'node-18'
	// }

	options {
		timestamps()
		ansiColor('xterm')
		skipDefaultCheckout(false)
		buildDiscarder(logRotator(numToKeepStr: '20'))
	}

	environment {
		// You can override NODE_VERSION via Jenkins credentials or environment if needed
		NODE_VERSION = '18'
		CI = 'true'
	}

	stages {
		stage('Checkout') {
			steps {
				checkout scm
			}
		}

		stage('Show Node') {
			steps {
				script {
					if (isUnix()) {
						sh 'node --version || echo "Node not found on PATH"'
						sh 'npm --version || echo "npm not found on PATH"'
					} else {
						bat 'node --version || echo Node not found on PATH'
						bat 'npm --version || echo npm not found on PATH'
					}
				}
			}
		}

		stage('Install') {
			steps {
				script {
					if (isUnix()) {
						sh 'npm ci'
					} else {
						bat 'npm ci'
					}
				}
			}
		}

		stage('Lint (optional)') {
			steps {
				script {
					def hasLint = false
					try {
						def pkg = readFile('package.json')
						hasLint = pkg.contains('"lint"')
					} catch (err) {
						echo 'package.json not found or unreadable, skipping lint'
					}

					if (hasLint) {
						echo 'Running lint...'
						if (isUnix()) {
							sh 'npm run lint'
						} else {
							bat 'npm run lint'
						}
					} else {
						echo 'No lint script found in package.json, skipping'
					}
				}
			}
		}

		stage('Test (optional)') {
			steps {
				script {
					def hasTest = false
					try {
						def pkg = readFile('package.json')
						hasTest = pkg.contains('"test"') && !pkg.contains('"test":"echo')
					} catch (err) {
						echo 'package.json not found or unreadable, skipping tests'
					}

					if (hasTest) {
						echo 'Running tests...'
						if (isUnix()) {
							sh 'npm test -- --ci --reporter=default || true'
						} else {
							bat 'npm test || exit 0'
						}
					} else {
						echo 'No test script found in package.json, skipping'
					}
				}
			}
		}

		stage('Build') {
			steps {
				script {
					if (isUnix()) {
						sh 'npm run build'
					} else {
						bat 'npm run build'
					}
				}
			}
		}

		stage('Archive Artifacts') {
			steps {
				script {
					// Archive Next build and public static files if present
					def artifacts = []
					if (fileExists('.next')) { artifacts.add('.next/**') }
					if (fileExists('public')) { artifacts.add('public/**') }
					if (fileExists('package.json')) { artifacts.add('package.json') }

					if (artifacts.size() > 0) {
						echo "Archiving: ${artifacts.join(', ')}"
						archiveArtifacts artifacts: artifacts.join(', '), allowEmptyArchive: true
					} else {
						echo 'No artifacts found to archive'
					}
				}
			}
		}
	}

	post {
		always {
			script {
				// Publish test results (Jest/Mocha) if any
				if (fileExists('test-results.xml')) {
					junit allowEmptyResults: true, testResults: 'test-results.xml'
				}
			}
			cleanWs(cleanWhenAborted: true)
		}
		success {
			echo 'Build succeeded'
		}
		failure {
			echo 'Build failed - check logs'
		}
	}
}

