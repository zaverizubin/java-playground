package com.playground.sorting;


import java.util.Observable;
import java.util.concurrent.TimeUnit;

public class BubbleSort extends Observable {

	
	public long[] sort(final long[] arr) {
		
		int j, k;

		for (j = arr.length - 1; j > 1; j--) {
			for (k = 0; k < j; k++) {
				if (arr[k] > arr[k + 1]) {
					swap(arr, k, k + 1);
				}
			}
		}
		return arr;
	}

	private void swap(final long[] arr, final int one, final int two) {
		final long temp = arr[two];
		arr[two] = arr[one];
		arr[one] = temp;
	}

	
	
}
