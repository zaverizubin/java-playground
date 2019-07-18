package com.playground.data_structures.array;

public class OrderedArray {
	private final long[] a; // ref to array a

	private int nElems; // number of data items

	public OrderedArray(final int max) {
		a = new long[max]; // create the array
		nElems = 0;
	}

	public int size() {
		return nElems;
	}

	public int find(final long searchKey) {
		int upperBound, lowerBound;
		lowerBound = 0;
		upperBound = nElems - 1;
		int currIn;
		while (true) {
			currIn = (upperBound + lowerBound) / 2;
			if (a[currIn] == searchKey) {
				return lowerBound;
			} else if (lowerBound > upperBound) {
				return nElems;
			} else {
				if (a[currIn] < searchKey) {
					lowerBound = currIn + 1;
				} else {
					upperBound = currIn - 1;
				}
			}

		}

	}

	public long get(final int index) {
		if (index < nElems) {
			return a[index];
		} else {
			return -1;
		}

	}

	public void insert(final long value) {
		int j, k;
		for (j = 0; j < nElems; j++) {
			if (a[j] > value) {
				break;
			}
		}
		for (k = nElems - 1; k >= j; k--) {
			a[k + 1] = a[k];
		}
		a[j] = value;
		nElems++;
	}

	public boolean delete(final long value) {
		int j, k;
		j = find(value);
		if (j == nElems) {
			return false;
		}

		for (k = j; k < nElems; k++) {
			a[k] = a[k + 1];
		}

		nElems--;
		return true;
	}

	public OrderedArray merge(final OrderedArray arr) {

		final OrderedArray dest = new OrderedArray(arr.size() + size());

		for (int j = 0; j < arr.size(); j++) {
			dest.insert(arr.get(j));
		}
		for (int j = 0; j < nElems; j++) {
			dest.insert(a[j]);
		}

		return dest;
	}

	public void display() // displays array contents
	{
		for (int j = 0; j < nElems; j++)
		{
			System.out.print(a[j] + " "); // display it
		}
		System.out.println(" ");
	}
}
