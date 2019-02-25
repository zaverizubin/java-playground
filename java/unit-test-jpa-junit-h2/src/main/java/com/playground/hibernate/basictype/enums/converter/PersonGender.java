package com.playground.hibernate.basictype.enums.converter;

import javax.persistence.Convert;
import javax.persistence.Id;

public class PersonGender {

	public PersonGender() {

	}

	public PersonGender(final Long id, final String name, final Gender gender) {
		super();
		this.setId(id);
		this.setName(name);
		this.setGender(gender);
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Gender getGender() {
		return gender;
	}

	public void setGender(Gender gender) {
		this.gender = gender;
	}

	@Id
	private Long id;

	private String name;

	@Convert(converter = GenderConverter.class)
	private Gender gender;

}
