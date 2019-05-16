package com.playground.candidate_test;

import java.io.FileNotFoundException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Random;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;

public class EvaluateAnswersOption2_Test {

	String[] randomWords;
	List<String> correctAnswers;
	HashMap<Integer, List<String>> candidateAnswers;
	int numberOfCandidates = 5000;

	@Before
	public void init() throws FileNotFoundException, SQLException {
		buildRandomWords();
		buildCorrectAnswers();
		buildCandidateResponses();
	}

	private void buildRandomWords() {
		String random = "Lorem ipsum dolor sit amet consectetur adipiscing elit, sed do eiusmod tempor"
				+ " incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud"
				+ " exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat"
				+ " Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur"
				+ " Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est"
				+ " laborum Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,"
				+ " totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta"
				+ " sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,"
				+ " sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt."
				+ " Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur,";

		random = random.replace(".", "").replace(",", "").replace(";", "");
		randomWords = random.split(" ");
	}

	private void buildCorrectAnswers() {
		correctAnswers = buildRandomAnswers();

	}

	private void buildCandidateResponses() {
		candidateAnswers = new HashMap<>();

		for (int i = 1; i <= numberOfCandidates; i++) {
			candidateAnswers.put(i, buildRandomAnswers());
		}
	}

	private List<String> buildRandomAnswers() {
		final List<String> answers = new ArrayList<>();
		final Random rand1 = new Random();
		final Random rand2 = new Random();

		for (int i = 0; i < 150; i++) {
			final int n = rand2.nextInt(10) + 4;

			String answer = "";
			for (int j = 0; j < n; j++) {
				answer += randomWords[rand1.nextInt(100)] + " ";
			}
			answers.add(answer.trim());
		}
		return answers;
	}

	@Test
	public void testGetCandidateScore_success() {
		final Calendar calendar = Calendar.getInstance();
		final long timeMilli1 = System.currentTimeMillis();

		final Map<Integer, HashMap<Integer, Float>> results = new HashMap<>();

		for (int i = 1; i <= numberOfCandidates; i++) {
			final EvaluateAnswersOption2 testLoadClass = new EvaluateAnswersOption2(candidateAnswers.get(i), correctAnswers);
			final Map<Integer, Float> result = testLoadClass.getCandidateResult();
			results.put(i, (HashMap<Integer, Float>) result);
		}

		final long timeMilli2 = System.currentTimeMillis();

		final long totalTime = (timeMilli2 - timeMilli1) / 1000;
		System.out.println(totalTime);
		Assert.assertEquals(results.size(), numberOfCandidates);

	}




}
