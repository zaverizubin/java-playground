package com.playground.sorting;

public class SimpleSorting {

	long[] arr;

	public void BubbleSort(final long[] arr) {
		this.arr = arr;

		int j, k;

		for (j = arr.length - 1; j > 1; j--) {
			for (k = 0; k < j; k++) {
				if (arr[k] > arr[k + 1]) {
					swap(k, k + 1);
				}
			}
		}
	}

	private void swap(final int one, final int two) {
		final long temp = arr[two];
		arr[two] = arr[one];
		arr[one] = temp;
	}


	public void SelectionSort(final long[] arr) {
		this.arr = arr;

		int j, k;

		for (j = 0; j < arr.length - 1; j++) {
			int min = j;
			for (k = j + 1; k < arr.length; k++) {
				if (arr[k] < arr[min]) {
					min = k;
				}
			}
			swap(j, min);
		}
	}

	public void InsertionSort(final long[] arr) {
		this.arr = arr;

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
	}

}
