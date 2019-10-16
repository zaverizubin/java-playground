package com.playground.sorting;

public class InsertionSort {

	public long[] sort(final long[] arr) {
		
		int j, k;

		for (j = 1; j < arr.length - 1; j++) {
			final long val = arr[j];
			k = j;
			while (k > 0 && arr[k - 1] > val) {
				arr[k] = arr[k - 1];
				--k;
			}
			arr[k] = val;
		}
		
		return arr;
	}

}
