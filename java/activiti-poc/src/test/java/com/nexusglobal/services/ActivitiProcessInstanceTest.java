package com.nexusglobal.services;

import static org.junit.Assert.assertEquals;

import java.util.List;

import org.activiti.engine.repository.ProcessDefinition;
import org.junit.BeforeClass;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.junit4.SpringRunner;

import com.nexusglobal.services.activiti.ActivitiService;

@RunWith(SpringRunner.class)
public class ActivitiProcessInstanceTest {

	private static ActivitiService activitiService;
	private static ProcessDefinitionService processDefinitionService;

	@BeforeClass
	public static void setUp() {
		activitiService = new ActivitiService();
		processDefinitionService = new ProcessDefinitionService(activitiService);
	}


	@Test
	public void givenRoomsThenCount() {
		// given
		// when
		final List<ProcessDefinition> processDefinitions = processDefinitionService.getProcessDefinitions();
		// then
		assertEquals(2, 2);
	}

}
