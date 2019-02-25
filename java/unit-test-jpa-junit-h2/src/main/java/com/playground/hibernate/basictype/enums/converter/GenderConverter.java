package com.playground.hibernate.basictype.enums.converter;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class GenderConverter implements AttributeConverter<Gender, Character> {

	@Override
	public Character convertToDatabaseColumn(final Gender value) {
		if (value == null) {
			return null;
		}

		return value.getCode();
	}

	@Override
	public Gender convertToEntityAttribute(final Character value) {
		if (value == null) {
			return null;
		}

		return Gender.fromCode(value);
	}
}