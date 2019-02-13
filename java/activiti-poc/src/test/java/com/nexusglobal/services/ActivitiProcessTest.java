package com.nexusglobal.services;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.activiti.engine.repository.ProcessDefinition;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import com.nexusglobal.models.SessionData;
import com.nexusglobal.services.activiti.ActivitiService;

@RunWith(SpringRunner.class)
public class ActivitiProcessTest {

	private static ActivitiService activitiService;
	private static ProcessService processDefinitionService;
	private static String deploymentKey;

	@BeforeClass
	public static void setUp() {
		activitiService = new ActivitiService();
		processDefinitionService = new ProcessService(activitiService);
		deploymentKey = SessionData.getSessionData().getDeploymentKey();
	}

	@Test
	public void givenDeploymentKeyThenProcessDefinitionCount() {
		// given
		// when
		final List<ProcessDefinition> processDefinitions = processDefinitionService
				.getProcessDefinitions(deploymentKey);
		// then
		assertEquals(2, processDefinitions.size());
	}

}
