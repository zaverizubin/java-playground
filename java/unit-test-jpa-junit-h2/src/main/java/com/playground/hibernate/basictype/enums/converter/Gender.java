package com.playground.hibernate.basictype.enums.converter;

public enum Gender {

	MALE('M'), FEMALE('F');

	private final char code;

	Gender(final char code) {
		this.code = code;
	}

	public static Gender fromCode(final char code) {
		if (code == 'M' || code == 'm') {
			return MALE;
		}
		if (code == 'F' || code == 'f') {
			return FEMALE;
		}
		throw new UnsupportedOperationException("The code " + code + " is not supported!");
	}

	public char getCode() {
		return code;
	}
}