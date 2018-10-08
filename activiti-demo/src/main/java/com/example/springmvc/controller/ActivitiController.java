package com.example.springmvc.controller;

import java.util.List;

import org.activiti.bpmn.model.BpmnModel;
import org.activiti.engine.repository.ProcessDefinition;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import com.example.springmvc.ActivitiService;


@Controller
public class ActivitiController {

	ActivitiService activitiService;

	@RequestMapping(value = "/activiti-init", method = RequestMethod.GET)
	public ModelAndView activityInit() throws Exception {

		initActivitiService();
		final ModelAndView mav = new ModelAndView();
		mav.setViewName("main_page");
		mav.addObject("init", true);
		
		List<ProcessDefinition> processDefinition = activitiService.getAvailableProcessDefinitions();
		
		
		
		return mav;
	}

	private void initActivitiService() {
		activitiService  = new ActivitiService();
	}
	
	
}
