package com.playground.data_structures.stack;

public class Reverser {
	private final String input; // input string
	private String output;

	public Reverser(final String in) // constructor
	{
		input = in;
	}

	public String doReverse() // reverse the string
	{
		final int length = input.length();
		final StackX stack = new StackX(length);

		for (int i = 0; i < length; i++) {
			stack.push(input.charAt(i));
		}

		output = "";
		while (!stack.isEmpty()) {
			output += stack.pop();
		}

		return output;
	}

}
