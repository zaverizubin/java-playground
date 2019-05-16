package com.playground.candidate_test;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

public class EvaluateAnswersOption2 {
	private final List<String> candidateResponses;
	private final List<String> correctAnswers;

	public EvaluateAnswersOption2(final List<String> candidateResponses, final List<String> correctAnswers) {
		this.candidateResponses = candidateResponses;
		this.correctAnswers = correctAnswers;
	}

	public Map<Integer, Float> getCandidateResult() {

		final Map<Integer, Float> result = new HashMap<>();

		for (int i = 0; i < correctAnswers.size(); i++) {

			final int maxScore = calculateCorrectAnswerScore(correctAnswers.get(i));
			final int candidateScore = calculateCandidateScore(candidateResponses.get(i), correctAnswers.get(i));
			final float score = 100 * (float) candidateScore / maxScore;
			result.put(i + 1, (float) (Math.round(score * 100.0) / 100.0));

		}

		return result;

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
