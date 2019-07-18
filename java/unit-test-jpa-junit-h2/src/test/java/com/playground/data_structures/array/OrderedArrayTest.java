package com.playground.data_structures.array;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

public class OrderedArrayTest {

	OrderedArray orderedArray;

	@Before
	public void initializeArray() {

		orderedArray = new OrderedArray(10);
		orderedArray.insert(0);
		orderedArray.insert(1);
		orderedArray.insert(3);
		orderedArray.insert(2);
		orderedArray.insert(4);
		orderedArray.insert(7);
		orderedArray.insert(6);
		orderedArray.insert(5);
		orderedArray.insert(9);
		orderedArray.insert(8);
	}

	@Test
	public void testFindByValue_success() {
		final int index = orderedArray.find(7);
		assertEquals(7, index);

	}


	@Test
	public void testMerge_success() {
		final OrderedArray otherOrderedArray = new OrderedArray(10);
		otherOrderedArray.insert(1);
		otherOrderedArray.insert(3);
		otherOrderedArray.insert(2);
		otherOrderedArray.insert(4);

		final OrderedArray mergedArr = orderedArray.merge(otherOrderedArray);

		assertEquals(orderedArray.size() + otherOrderedArray.size(), mergedArr.size());

	}
}