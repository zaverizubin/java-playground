package com.playground.design_patterns.mvcpattern.service;


import java.util.List;

import com.playground.design_patterns.mvcpattern.model.Person;

public interface PersonService {
    Person createPerson(Person person);
    List<Person> getAllPersons();
}
