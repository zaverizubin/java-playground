package com.playground.hibernate.basictype.enums;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;

@Entity(name = "Phone")
public class Phone {

	public Phone() {
	}

	public Phone(final Long id, final String number, final PhoneType type) {
		setId(id);
		setNumber(number);
		setType(type);
	}

	@Id
	private Long id;

	@Column(name = "phone_number")
	private  String number;

	@Enumerated(EnumType.STRING)
	// @Enumerated(EnumType.ORDINAL)
	@Column(name = "phone_type")
	private  PhoneType type;

	public Long getId() {
		return id;
	}

	public void setId(final Long id) {
		this.id = id;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(final String number) {
		this.number = number;
	}

	public PhoneType getType() {
		return type;
	}

	public void setType(final PhoneType type) {
		this.type = type;
	}

}