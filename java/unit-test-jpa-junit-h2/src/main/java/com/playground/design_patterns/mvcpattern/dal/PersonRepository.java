package com.playground.design_patterns.mvcpattern.dal;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.playground.design_patterns.mvcpattern.model.Person;

@Repository
public interface PersonRepository extends JpaRepository<Person, Long> {
}
