package com.example.springmvc;

import java.util.List;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.activiti.engine.RepositoryService;
import org.activiti.engine.RuntimeService;
import org.activiti.engine.TaskService;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;

public class ActivitiService {
	
	ProcessEngine processEngine;
	RepositoryService repositoryService;
	RuntimeService runtimeService;
	TaskService  taskService;
	
	ProcessInstance processInstance;
	List<Task> tasks;
	
	public ActivitiService() {
		processEngine = ProcessEngines.getDefaultProcessEngine();
		repositoryService = processEngine.getRepositoryService();
		runtimeService = processEngine.getRuntimeService();
		taskService = processEngine.getTaskService();
	}
	
	public List<ProcessDefinition> getAvailableProcessDefinitions(){
		return repositoryService.createProcessDefinitionQuery().latestVersion().list();
	}
	
	public BpmnModel getProcessDefinitionModel(String processDefinitionId){
		return repositoryService.getBpmnModel(processDefinitionId);
	}
	
	public void createProcessInstance(String id) {
		processInstance = runtimeService.startProcessInstanceByKey(id);
	}
	
	public void getTaskForProcess(){
		tasks = taskService.createTaskQuery().processDefinitionId(processInstance.getId()).list();
	}

	public void claimTask(String userId) {
		 taskService.claim(tasks.get(0).getId(), userId);
	}
	
	public void markTaskAsComplete() {
		taskService.complete(tasks.get(0).getId());
	}
}
