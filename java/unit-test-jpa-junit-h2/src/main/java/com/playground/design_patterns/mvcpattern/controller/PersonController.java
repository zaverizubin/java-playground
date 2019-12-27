package com.playground.design_patterns.mvcpattern.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.playground.design_patterns.mvcpattern.model.Person;
import com.playground.design_patterns.mvcpattern.service.PersonService;

@Controller
public class PersonController {

    @Autowired
    PersonService personService;

    @RequestMapping(value = "", method = RequestMethod.GET)
    public String greetingForm(Model model) {
        model.addAttribute("person", new Person());
        return "greeting";
    }

    @RequestMapping(value = "/person", method = RequestMethod.POST)
    public String addPerson(Model model, @ModelAttribute Person person) {
        personService.createPerson(person);
        model.addAttribute("people", personService.getAllPersons());
        return "result";
    }
}
