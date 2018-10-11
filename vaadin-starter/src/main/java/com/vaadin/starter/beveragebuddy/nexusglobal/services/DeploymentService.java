package com.vaadin.starter.beveragebuddy.nexusglobal.services;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.repository.Deployment;

public class DeploymentService {

	ProcessEngine processEngine;

	public DeploymentService(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public Deployment getDeployment(final String deploymentKey){
		return processEngine.getRepositoryService().createDeploymentQuery().deploymentKey(deploymentKey).latest().singleResult();
	}


}
