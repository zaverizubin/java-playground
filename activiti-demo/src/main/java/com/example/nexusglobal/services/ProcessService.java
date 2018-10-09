package com.example.nexusglobal.services;

import java.util.List;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;

public class ProcessService {

	ProcessEngine processEngine;
	
	public ProcessService(ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}
	
	public List<ProcessDefinition> getProcessDefinitionsByDeployment(String deploymentId){
		return processEngine.getRepositoryService().createProcessDefinitionQuery().deploymentId(deploymentId).latestVersion().list();
	}
	
	
	public ProcessInstance createProcessInstance(String processKey) {
		return processEngine.getRuntimeService().startProcessInstanceByKey(processKey);
	}
	
	public List<ProcessInstance> getProcessInstancesForDefinition(String processId) {
		return processEngine.getRuntimeService().createProcessInstanceQuery().processDefinitionId(processId).list();
	}
	
	public BpmnModel getProcessDefinitionModel(String processDefinitionId){
		return processEngine.getRepositoryService().getBpmnModel(processDefinitionId);
	}
	
	public void deleteProcessInstance(String processInstanceId) {
		processEngine.getRuntimeService().deleteProcessInstance(processInstanceId, null);
	}
	
}
