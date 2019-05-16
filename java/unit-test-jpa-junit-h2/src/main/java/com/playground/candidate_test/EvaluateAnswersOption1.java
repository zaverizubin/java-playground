package com.playground.candidate_test;

import java.util.HashSet;

public class EvaluateAnswersOption1 {
	private final String candidateResponse;
	private final String correctAnswer;

	public EvaluateAnswersOption1(final String candidateResponse, final String correctAnswer) {
		this.candidateResponse = candidateResponse;
		this.correctAnswer = correctAnswer;
	}

	public float getCandidateResult() {
		final int maxScore = calculateCorrectAnswerScore(correctAnswer);
		final int candidateScore = calculateCandidateScore(candidateResponse, correctAnswer);
		final float score = 100 * (float) candidateScore / maxScore;
		return (float) (Math.round(score * 100.0) / 100.0);

	}

	public int calculateCorrectAnswerScore(String correctAnswer) {
		int score = 0;
		correctAnswer = correctAnswer.trim();
		correctAnswer = correctAnswer.replace(".", "").replace(",", "").replace(";", "");
		final String[] arrOfWords = correctAnswer.split(" ");

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
