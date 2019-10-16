package com.playground.data_structures.stack;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;


public class StackTest {
	StackX stackX;

	@Before
	public void initializeStack() {

		stackX = new StackX(10);

	}

	@Test
	public void testReverser_success() {
		final String input = "madam";

		final Reverser reverser = new Reverser(input);
		final String output = reverser.doReverse();

		assertEquals(input, output);

	}

	@Test
	public void testBracketChecker_success() {
		final String input = "[m[[a][d][a]m]]]";

		final BracketChecker bracketChecker = new BracketChecker(input);
		final Boolean output = bracketChecker.check();

		assertEquals(output, true);

	}

}
