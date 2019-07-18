package com.playground.data_structures.array;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class HighArrayTest {

	HighArray highArray;

	@Before
	public void initializeArray() {

		highArray = new HighArray(10);
		highArray.insert(1);
		highArray.insert(0);
		highArray.insert(3);
		highArray.insert(2);
		highArray.insert(5);
		highArray.insert(7);
		highArray.insert(6);
		highArray.insert(4);
		highArray.insert(8);
		highArray.insert(9);
	}

	@Test
	public void testReverseSort_success() {
		final int size = highArray.size();
		final long[] a = new long[size];
		int nElems = 0;
		long max = 0;
		max = highArray.removeMax();
		while (max != -1) {
			a[nElems] = max;
			nElems++;
			max = highArray.removeMax();
		}

		assertEquals(a.length, size);

	}

	@Test
	public void testDelete_success() {
		final int size = highArray.size();
		final Boolean success = highArray.delete(7);

		assertEquals(highArray.size(), size - 1);
	}

	@Test
	public void testNoDuplicates_success() {
		highArray = new HighArray(9);
		highArray.insert(3);
		highArray.insert(3);
		highArray.insert(3);
		highArray.insert(4);
		highArray.insert(4);
		highArray.insert(4);
		highArray.insert(5);
		highArray.insert(5);
		highArray.insert(5);

		final int size = highArray.size();

		highArray.noDuplicates();
		assertEquals(highArray.size(), size);
	}

}