package com.playground.data_structures.stack;

public class StackX {

	private final int maxSize;
	private final char[] stackArray;
	private int top;

	public StackX(final int max) // constructor
	{
		maxSize = max;
		stackArray = new char[maxSize];
		top = -1;
	}

	public void push(final char x) {
		stackArray[++top] = x;
	}

	public char pop() {
		return stackArray[top--];
	}

	public char peek() {
		return top == -1 ? null : stackArray[top];
	}

	public boolean isEmpty() {
		return top == -1;
	}
}
