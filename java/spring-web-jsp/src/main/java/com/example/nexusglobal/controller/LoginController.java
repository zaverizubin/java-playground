package com.example.nexusglobal.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class LoginController {

	@RequestMapping(value = "/main", method = RequestMethod.GET)
	public ModelAndView printWelcome(final ModelMap model, final Principal principal) {
		final String name = principal.getName();
		final ModelAndView mav = new ModelAndView();
		mav.setViewName("main_page");
		mav.addObject("username", name);
		mav.addObject("init", false);
		return mav;

	}

	@RequestMapping(value = "/login", method = RequestMethod.GET)
	public String login(final ModelMap model) {
		return "login_page";

	}

	@RequestMapping(value = "/loginError", method = RequestMethod.GET)
	public String loginError(final ModelMap model) {
		model.addAttribute("error", "true");
		return "login_page";

	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logout(final ModelMap model) {

		return "login_page";

	}

}