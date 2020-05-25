node ("ServidorUbuntu"){
    try{
        stage('Slack init notification'){
            slackSend color: "good", message: "La ejecucion numero ${env.BUILD_NUMBER} del proyecto ${env.JOB_NAME} ha sido iniciada"
        }
        stage('Captura de codigo') { 
            git branch: 'develop', credentialsId: '145aadb0-0079-4be3-a4f7-db1feb344a85', url: 'https://github.com/DiegoAvmor/MyScheduleLite.git'
        }
        stage('Analisis') {
            def scannerhome = tool 'SonaScanner';
            withSonarQubeEnv('Sonarqube') {
                sh """${scannerhome}/bin/sonar-scanner -D sonar.projectKey=MyScheduleLite -D sonar.projectName=MyScheduleLite -D sonar.projectVersion=1.0 -D sonar.sourceEncoding=UTF-8 -D sonar.sources=."""
            }
        }
        stage('slack notification'){
            slackSend color: "good", message: "La ejecucion ${env.BUILD_NUMBER} del proyecto ${env.JOB_NAME} ha concluido con exito"
        }
    }catch(e){
        slackSend color: "danger", message: "La ejecucion ${env.BUILD_NUMBER} del proyecto ${env.JOB_NAME} ha fallado"
    }
}
/**
node("ServidorUbuntu"){
    try{
        stage('Captura de codigo') { 
            git branch: 'develop', credentialsId: '145aadb0-0079-4be3-a4f7-db1feb344a85', url: 'https://github.com/DiegoAvmor/MyScheduleLite.git'
        }
        stage('database file'){
            sh label: '', script: 'cp /home/mrico/jenkins/workspace/utilities/dbconfig.json /home/mrico/jenkins/workspace/MyScheduleLite/resource'
        }
        stage('Docker destroy containers'){
            sh label: '', script: 'docker stop myscheduleliteproduccion && docker rm myscheduleliteproduccion && docker rmi myschedulelite:produccion'
        }
        stage('Docker init containers'){
            sh label: '', script: 'docker build -t myschedulelite:produccion . && docker run -d -p 80:80 --name myscheduleliteproduccion myschedulelite:produccion'
        }
        stage('slack notification'){
            slackSend color: "good", message: "El despliegue de la ejecucion ${env.BUILD_NUMBER} del proyecto ${env.JOB_NAME} ha concluido con exito"
        }
    }catch(e){
        slackSend color: "danger", message: "El despliegue de la ejecucion ${env.BUILD_NUMBER} del proyecto ${env.JOB_NAME} ha fallado"
    }
}
**/