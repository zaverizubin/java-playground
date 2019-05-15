package com.playground.candidate_test;

import org.junit.Assert;
import org.junit.Test;

public class CandidateTest {

	@Test
	public void testGetCandidateScore_success() {
		final String candidateResponse = "There are Twenty-Four hours in a day. A year has 14 months.";
		final String correctAnswer = "There are twenty-four hours in a day, 30 days in a month, and 12 months in the calendar year.";

		final TestClass testClass = new TestClass(candidateResponse, correctAnswer);
		final float result = testClass.getCandidateResult();

		Assert.assertEquals(27.777f, result, 0.002);

	}




}
