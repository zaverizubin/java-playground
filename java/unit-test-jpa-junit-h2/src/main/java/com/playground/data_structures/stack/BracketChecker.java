package com.playground.data_structures.stack;

public class BracketChecker {

	String input;
	StackX stackX;

	public BracketChecker(final String input) {
		this.input = input;
		stackX = new StackX(input.length());
	}

	public Boolean check() {

		final char[] chars = input.toCharArray();

		for (int i = 0; i < chars.length; i++) {
			final char ch = chars[i];
			switch (ch) {
			case '[':
			case '{':
			case '(':
				stackX.push(ch);
				break;
			case ']':
			case '}':
			case ')':
				if (!stackX.isEmpty()) {
					final char chx = stackX.pop();
					if (ch == ']' && chx != '[' || ch == '}' && chx != '{' || ch == ')' && chx != '(') {
						System.out.println("Error: " + ch + " at " + i);
					}
				} else {
					System.out.println("Error: " + ch + " at " + i);
				}
				break;
			}
		}

		return stackX.isEmpty();
	}

}
