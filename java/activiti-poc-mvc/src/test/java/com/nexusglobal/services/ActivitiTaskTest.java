package com.nexusglobal.services;

import static org.junit.Assert.assertEquals;

import java.util.ArrayList;
import java.util.List;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.bpmn.model.Process;
import org.activiti.bpmn.model.UserTask;
import org.activiti.engine.repository.ProcessDefinition;
import org.activiti.engine.runtime.ProcessInstance;
import org.activiti.engine.task.Task;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.activiti.ActivitiService;

@RunWith(SpringRunner.class)
public class ActivitiTaskTest {

	private static ActivitiService activitiService;
	private static String deploymentKey;
	private static String processDefintionKey;
	private static List<ProcessDefinition> processDefinitions;

	@BeforeClass
	public static void setUp() {
		activitiService = new ActivitiService();
		deploymentKey = SessionData.getSessionData().getDeploymentKey();
		processDefintionKey = "incident-investigation-model-1";
		processDefinitions = activitiService.getRepositoryServiceProvider().getProcessDefinitions(deploymentKey);

	}

	@Test
	public void givenProcessDefinitionThenUserTaskCount() {
		// given
		// when
		final BpmnModel model = activitiService.getProcessEngine().getRepositoryService()
				.getBpmnModel(processDefinitions.get(0).getId());
		final List<Process> processes = model.getProcesses();
		final List<UserTask> userTasks = new ArrayList<>();
		for (final Process p : processes) {
			userTasks.addAll(p.findFlowElementsOfType(UserTask.class));
		}
		// then
		assertEquals(4, userTasks.size());
	}

	@Test
	public void givenProcessIdThenUserTaskCount() {

		final ProcessInstance processInstance = activitiService.getProcessEngine().getRuntimeService()
				.startProcessInstanceById(processDefinitions.get(0).getId());
		final List<Task> tasks = activitiService.getProcessEngine().getTaskService().createTaskQuery().active().list();

		// then
		assertEquals(1, tasks.size());
	}


}
