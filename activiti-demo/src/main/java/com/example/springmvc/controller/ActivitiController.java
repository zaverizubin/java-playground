package com.example.springmvc.controller;

import org.activiti.engine.ProcessEngine;
import org.activiti.engine.ProcessEngines;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ActivitiController {

	ProcessEngine processEngine;

	@RequestMapping(value = "/activiti-init", method = RequestMethod.GET)
	public ModelAndView activityInit() throws Exception {

		initActivitiProcessEngine();
		final ModelAndView mav = new ModelAndView();
		mav.setViewName("main_page");
		mav.addObject("init", true);
		return mav;
	}

	@RequestMapping(value = "/{accountId}", method = RequestMethod.GET)
	public ModelAndView findAccount(@PathVariable final int accountId, final Model model) {
		final ModelAndView mav = new ModelAndView();
		mav.setViewName("account");
		mav.addObject("someText", String.format("Showing account %d", accountId));
		return mav;
	}

	private void initActivitiProcessEngine() {
		processEngine = ProcessEngines.getDefaultProcessEngine();

	}
}
