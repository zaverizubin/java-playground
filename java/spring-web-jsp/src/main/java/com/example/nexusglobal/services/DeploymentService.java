package com.example.nexusglobal.services;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.repository.Deployment;

public class DeploymentService {

	ProcessEngine processEngine;
	
	public DeploymentService(ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public Deployment getDeployment(String deploymentKey){
		return processEngine.getRepositoryService().createDeploymentQuery().deploymentKey(deploymentKey).latest().singleResult();
	}
	
	
}
