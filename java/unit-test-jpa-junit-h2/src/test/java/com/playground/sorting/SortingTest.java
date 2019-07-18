package com.playground.sorting;

import static org.junit.Assert.assertArrayEquals;

import org.junit.Before;
import org.junit.Test;

public class SortingTest {

	private final long[] arr = { 3, 1, 6, 2, 5, 8, 4, 7, 9 };


	@Before
	public void initializeArray() {

	}

	private long[] getLoadTestArray() {
		final int maxSize = 100000;
		final long[] loadArr = new long[maxSize];

		for (int j = 0; j < maxSize; j++) {
			final long n = (long) (java.lang.Math.random() * (maxSize - 1));
			loadArr[j] = n;
		}
		return loadArr;
	}

	private long[] getInverseSortedLoadTestArray() {
		final int maxSize = 100000;
		final long[] loadArr = new long[maxSize];

		for (int j = 0; j < maxSize; j++) {
			final long n = (long) (java.lang.Math.random() * (maxSize - 1));
			loadArr[j] = n;
		}
		final SimpleSorting sort = new SimpleSorting();
		sort.InsertionSort(loadArr);

		final long[] inverseLoadArr = new long[maxSize];
		for (int j = 0; j < maxSize; j++) {
			inverseLoadArr[j] = loadArr[maxSize - j - 1];
		}

		return inverseLoadArr;
	}

	@Test
	public void testBubbleSort_success() {
		final SimpleSorting sort = new SimpleSorting();
		sort.BubbleSort(arr);

		final long[] methodOutput = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
		assertArrayEquals(arr, methodOutput);
	}

	@Test
	public void testSelectionSort_success() {
		final SimpleSorting sort = new SimpleSorting();
		sort.SelectionSort(arr);

		final long[] methodOutput = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
		assertArrayEquals(arr, methodOutput);
	}

	@Test
	public void testInsertionSort_success() {
		final SimpleSorting sort = new SimpleSorting();
		sort.InsertionSort(arr);

		final long[] methodOutput = { 1, 2, 3, 4, 5, 6, 7, 8, 9 };
		assertArrayEquals(arr, methodOutput);
	}

	@Test
	public void testLoadSort_success() {
		final long[] arr = getLoadTestArray();
		long[] arrClone;
		final SimpleSorting sort = new SimpleSorting();
		long start, end;

		arrClone = arr.clone();
		start = System.currentTimeMillis();
		sort.BubbleSort(arrClone);
		end = System.currentTimeMillis();
		System.out.println("Array size: " + arr.length + " - Bubble sort: " + (end - start) / 1000 + "secs");

		arrClone = arr.clone();
		start = System.currentTimeMillis();
		sort.SelectionSort(arrClone);
		end = System.currentTimeMillis();
		System.out.println("Array size: " + arr.length + " - Selection sort: " + (end - start) / 1000 + "secs");

		arrClone = arr.clone();
		start = System.currentTimeMillis();
		sort.InsertionSort(arrClone);
		end = System.currentTimeMillis();
		System.out.println("Array size: " + arr.length + " - Insertion sort: " + (end - start) / 1000 + "secs");
	}

	@Test
	public void testLoadInverseSorted_success() {
		final long[] arr = getInverseSortedLoadTestArray();
		long[] arrClone;
		final SimpleSorting sort = new SimpleSorting();

		long start, end;

		arrClone = arr.clone();
		start = System.currentTimeMillis();
		sort.BubbleSort(arrClone);
		end = System.currentTimeMillis();
		System.out
		.println("Reverse Sorted Array size: " + arr.length + " - Bubble sort: " + (end - start) / 1000
				+ "secs");

		arrClone = arr.clone();
		start = System.currentTimeMillis();
		sort.SelectionSort(arrClone);
		end = System.currentTimeMillis();
		System.out.println(
				"Reverse Sorted Array size: " + arr.length + " - Selection sort: " + (end - start) / 1000 + "secs");

		arrClone = arr.clone();
		start = System.currentTimeMillis();
		sort.InsertionSort(arrClone);
		end = System.currentTimeMillis();
		System.out.println(
				"Reverse Sorted Array size: " + arr.length + " - Insertion sort: " + (end - start) / 1000 + "secs");
	}


}
