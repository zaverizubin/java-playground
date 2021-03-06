package com.nexusglobal.services.activiti;

import java.util.List;
import java.util.Map;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.runtime.ProcessInstance;

public class RuntimeServiceProvider {

	ProcessEngine processEngine;

	public RuntimeServiceProvider(final ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}

	public void createNewProcessInstance(final String processDefinitionId, final String userId) {
		final ProcessInstance processInstance = startProcessInstance(processDefinitionId, userId);
		addUserToProcessInstance(processInstance.getId(), userId);
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

	public void addUserToProcessInstance(final String processInstanceId, final String userId) {
		processEngine.getRuntimeService().addParticipantUser(processInstanceId, userId);
	}

	public ProcessInstance getProcessInstance(final String processInstanceId) {
		return processEngine.getRuntimeService().createProcessInstanceQuery().processInstanceId(processInstanceId)
				.includeProcessVariables().singleResult();
	}

	public List<ProcessInstance> getRunningProcessInstances(final String processDefinitionId) {
		return processEngine.getRuntimeService().createProcessInstanceQuery().active()
				.processDefinitionId(processDefinitionId).includeProcessVariables().asc()
				.list();
	}

	public List<ProcessInstance> getRunningProcessInstancesByUser(final String processDefinitionId,
			final String userId) {
		return processEngine.getRuntimeService().createProcessInstanceQuery().active()
				.processDefinitionId(processDefinitionId).involvedUser(userId).includeProcessVariables()
				.orderByProcessDefinitionKey().asc().list();
	}



	public List<ProcessInstance> getProcessInstances(final String processDefinitionId) {
		return processEngine.getRuntimeService().createProcessInstanceQuery().processDefinitionId(processDefinitionId)
				.list();
	}

	public void deleteProcessInstance(final String processInstanceId, final String reason) {
		processEngine.getRuntimeService().deleteProcessInstance(processInstanceId, reason);

	}

	public void setProcessInstanceVariables(final String processId, final Map<String, ? extends Object> variables) {
		processEngine.getRuntimeService().setVariables(processId, variables);
	}

	public void cancelAllProcessInstances(final String processDefinitionId) {
		List<ProcessInstance> processInstances = null;
		processInstances = getProcessInstances(processDefinitionId);
		for (final ProcessInstance processInstance : processInstances) {
			deleteProcessInstance(processInstance.getId(), null);
		}
	}

}
