package com.vaadin.starter.beveragebuddy.nexusglobal.services;

import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.runtime.ProcessInstance;

public class RuntimeService {

	ProcessEngine processEngine;

	public RuntimeService(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public ProcessInstance startProcessInstance(final String processDefinitionId, final String userId) {
		ProcessInstance processInstance = null;
		try {
			processEngine.getIdentityService().setAuthenticatedUserId(userId);
			processInstance = processEngine.getRuntimeService().startProcessInstanceById(processDefinitionId);
		} finally {
			processEngine.getIdentityService().setAuthenticatedUserId(null);
		}

		return processInstance;
	}

	public ProcessInstance getProcessInstance(final String processInstanceId) {
		return processEngine.getRuntimeService().createProcessInstanceQuery().processInstanceId(processInstanceId)
				.singleResult();
	}

	public List<ProcessInstance> getRunningProcessInstancesByUser(final String userId) {
		return processEngine.getRuntimeService().createProcessInstanceQuery().active().involvedUser(userId)
				.orderByProcessDefinitionKey().asc().list();
	}

	public void addUserToProcessInstance(final String processInstanceId, final String userId) {
		processEngine.getRuntimeService().addParticipantUser(processInstanceId, userId);
	}

	public List<ProcessInstance> getProcessInstances(final String processDefintionId) {
		return processEngine.getRuntimeService().createProcessInstanceQuery().processDefinitionId(processDefintionId)
				.list();
	}

	public void deleteProcessInstance(final String processInstanceId, final String reason) {
		processEngine.getRuntimeService().deleteProcessInstance(processInstanceId, reason);
	}
}
