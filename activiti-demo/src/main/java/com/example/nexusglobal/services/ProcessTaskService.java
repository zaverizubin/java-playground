package com.example.nexusglobal.services;

import java.util.List;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.task.Task;

public class ProcessTaskService {
	
	ProcessEngine processEngine;
	
	public ProcessTaskService(ProcessEngine processEngine) {
		this.processEngine = processEngine;
	}
	
	public List<Task> getTaskForProcess(String processDefinitionId){
		return processEngine.getTaskService().createTaskQuery().processDefinitionId(processDefinitionId).list();
	}

	public void claimTask(Task task, String userId) {
		processEngine.getTaskService().claim(task.getId(), userId);
	}
	
	public void markTaskAsComplete(Task task) {
		processEngine.getTaskService().complete(task.getId());
	}
}
