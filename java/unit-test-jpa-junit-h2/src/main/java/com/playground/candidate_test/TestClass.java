package com.playground.candidate_test;

import java.util.HashSet;

public class TestClass {
	private final String candidateResponse;
	private final String correctAnswer;

	public TestClass(final String candidateResponse, final String correctAnswer) {
		this.candidateResponse = candidateResponse;
		this.correctAnswer = correctAnswer;
	}

	public float getCandidateResult() {
		final int maxScore = calculateCorrectAnswerScore(correctAnswer);
		final int candidateScore = calculateCandidateScore(candidateResponse, correctAnswer);
		return (float) (100 * (candidateScore * 1.0 / maxScore));

	}

	public int calculateCorrectAnswerScore(String input) {
		int score = 0;
		input = input.trim();
		input = input.substring(0, input.length() - 1);
		final String[] arrOfWords = input.split(" ");

		for (final String word : arrOfWords) {
			score += getWordScore(word);
		}
		return score;
	}

	public int calculateCandidateScore(final String candidateResponse, final String correctAnswer) {

		final String[] arrOfCorrectAnswer = correctAnswer.split(" ");
		final String[] arrOfCandidateResponse = candidateResponse.split(" ");

		int score = 0;

		final HashSet<String> set = new HashSet();

		for (final String word : arrOfCorrectAnswer) {
			set.add(word.toLowerCase());
		}

		for (final String word : arrOfCandidateResponse) {
			if (set.contains(word.toLowerCase())) {
				score += getWordScore(word);
			}
		}
		return score;

	}

	private int getWordScore(final String word) {
		int score = 0;
		try {
			Double.parseDouble(word);
			score = 4;
		} catch (final NumberFormatException e) {
			if (word.length() > 7) {
				score = 3;
			} else if (word.length() >= 5) {
				score = 1;
			}
		}
		return score;
	}

}
