package com.playground.sorting;

public class SelectionSort {
	
	public long[] sort(final long[] arr) {
		
		int j, k;

		for (j = 0; j < arr.length - 1; j++) {
			int min = j;
			for (k = j + 1; k < arr.length; k++) {
				if (arr[k] < arr[min]) {
					min = k;
				}
			}
			swap(arr, j, min);
		}
		return arr;
	}
	
	private void swap(final long[] arr, final int one, final int two) {
		final long temp = arr[two];
		arr[two] = arr[one];
		arr[one] = temp;
	}


}
