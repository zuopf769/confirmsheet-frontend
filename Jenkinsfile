//所有的脚本命令都放在pipeline中
pipeline{
   //指定任务在哪个集群节点中执行
   agent any
//    //声明全局变量，方便后面使用
//    environment {
//         gitbranch='dev'
//    }
   stages{
	   stage('拉取git创库代码'){
	      steps{
	        script {
	        if("${JENKINS_ENV}" == 'qa'){
	         checkout([$class: 'GitSCM', branches: [[name: "${gitbranch}"]], extensions: [], userRemoteConfigs: [[credentialsId: 'bca0ef49-ed0c-49dd-ae51-9db8838cff32', url: 'http://1.13.0.252:3000/CodeDevelopmentPlatform/eventbridge-frontend.git']]])
	        }
	        if("${JENKINS_ENV}" == 'dev'){
	           //使用checkout:Check out from version control 生成
               checkout([$class: 'GitSCM', branches: [[name: "${gitbranch}"]], extensions: [], userRemoteConfigs: [[credentialsId: 'f926406a-0513-467e-adb5-d0086a908a1b', url: 'http://1.13.0.252:3000/CodeDevelopmentPlatform/eventbridge-frontend.git']]])
	        }
	        echo "拉取git创库代码，分支【${gitbranch}】  - SUCCESS "
	        }
	      }
	   }
	   stage('通过npm构建项目'){
	      steps{
	      	 nodejs('node_14') {
                        // some block
                     		   sh '''npm install --registry=https://registry.npmmirror.com
                                npm install
                                #npm install html-webpack-plugin
                                npm run build'''
              }
		  }
	   }
	    stage('推送html到nginx'){
       	      steps{
       	      sh '''mkdir -p /data/project/eventbridge-frontend'''
       	      sh '''cp -rf ./dist/* /data/project/eventbridge-frontend'''
       	  }
       	}
   }
   //    钉钉通知，在阶段后，大括号后
     post{
       success{
           dingtalk(
           //         系统配置钉钉时的id
               robot: 'workflowdingding',
               type: 'MARKDOWN',
               title: "success:${JOB_NAME}",
               text:["-成功构建:${JOB_NAME} \n-  持续时间 ${currentBuild.durationString} \n- 环境 【${JENKINS_ENV}】 \n- 分支 【${gitbranch}】"]
           )
       }
       failure{
           dingtalk(
           //         系统配置钉钉时的id
                       robot: 'workflowdingding',
                       type: 'MARKDOWN',
                       title: "failure: ${JOB_NAME}【${JENKINS_ENV}】",
                       text:["-构建失败:${JOB_NAME} \n-  持续时间 ${currentBuild.durationString} \n- 环境 【${JENKINS_ENV}】\n- 分支 【${gitbranch}】"]
           )
       }
     }
}
