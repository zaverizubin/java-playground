package com.example.nexusglobal.controller;

import java.util.List;

import org.activiti.engine.repository.Deployment;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.example.nexusglobal.services.ActivitiService;

@Controller
public class ActivitiController {

	private ActivitiService activitiService;
	private Deployment deployment;
	private List<ProcessDefinition> processDefinitions;
	
	
	@RequestMapping(value = "/activiti-init", method = RequestMethod.GET)
	public ModelAndView activityInit() throws Exception {

		initActivitiService();
		final ModelAndView mav = new ModelAndView();
		mav.setViewName("main_page");
		mav.addObject("init", true);
		
		getDeployment("incident-management");
		if(deployment!= null) {
			getProcessDefinitions(deployment);
		}
		
		return mav;
	}
	
	@RequestMapping(value = "/activiti-create-instance", method = RequestMethod.GET)
	public ModelAndView activityCreateInstance() throws Exception {
		final ModelAndView mav = new ModelAndView();
		createProcessInstance(processDefinitions.get(0));
		return mav;
	}

	@RequestMapping(value = "/activiti-delete-instances", method = RequestMethod.GET)
	public ModelAndView activityDeleteInstances() throws Exception {
		final ModelAndView mav = new ModelAndView();
		
		initActivitiService();
		List<ProcessInstance> processInstances;
		
		if(processDefinitions != null) {
			processInstances =  getProcessInstancesForDefinition(processDefinitions.get(0));
			for(ProcessInstance processInstance: processInstances) {
				activitiService.getProcessService().deleteProcessInstance(processInstance.getId());
			}
		}
		
		return mav;
	}
	
	private void initActivitiService() {
		activitiService  = new ActivitiService();
		deployment = getDeployment("incident-management");
		if(deployment!= null) {
			processDefinitions = getProcessDefinitions(deployment);
		}
	}
	
	private Deployment getDeployment(String deploymentKey){
		return activitiService.getDeploymentService().getDeployment(deploymentKey);
	}
	
	private List<ProcessDefinition> getProcessDefinitions(Deployment deployment) {
		return activitiService.getProcessService().getProcessDefinitionsByDeployment(deployment.getId());
	}
	
	private List<ProcessInstance> getProcessInstancesForDefinition(ProcessDefinition processDefinition) {
		return  activitiService.getProcessService().getProcessInstancesForDefinition(processDefinition.getId());
	}
	
	private ProcessInstance createProcessInstance(ProcessDefinition processDefinition) {
	 	return activitiService.getProcessService().createProcessInstance(processDefinition.getKey());
	}
	
	private List<Task> getTaskForProcess(ProcessDefinition processDefinition){
		return activitiService.getProcessTaskService().getTaskForProcess(processDefinition.getId());
	}
	
}
