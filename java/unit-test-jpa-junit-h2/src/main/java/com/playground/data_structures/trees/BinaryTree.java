package com.playground.data_structures.trees;

public class BinaryTree {

	
	public static class Node
	{
		int iData; 
		double fData; 
		Node leftChild; 
		Node rightChild; 
	}
	
	public Node find(int key, Node root) {
		Node current = root;
		
		while(current != null) {
			if(current.iData == key) {
				return current;
			}else if(key < current.iData) {
				current = current.leftChild; 
			}else {
				current = current.rightChild; 
			}
		}
		return null;
	}
	
	public void insert(Node newNode, Node root) {
		if(root ==null) {
			return;
		}
		
		Node parent = null;
		Node current = root;
		while(true) {
			parent = current;
			if(newNode.iData < current.iData) {
				current = current.leftChild; 
				if(current == null) {
					parent.leftChild  = newNode;
					return;
				}
			}else {
				current = current.rightChild;
				if(current == null) {
					parent.rightChild  = newNode;
					return;
				}
			}
		}
	}
	
	public void inOrder(Node current, StringBuilder output) {
		if(current != null) {
			inOrder(current.leftChild, output);
			output.append(current.iData + "->");
			inOrder(current.rightChild, output);
		}
	}
	
	public void preOrder(Node current, StringBuilder output) {
		if(current != null) {
			output.append(current.iData + "->");
			inOrder(current.leftChild, output);
			inOrder(current.rightChild, output);
		}
	}
	
	public void postOrder(Node current, StringBuilder output) {
		if(current != null) {
			inOrder(current.leftChild, output);
			inOrder(current.rightChild, output);
			output.append(current.iData + "->");
		}
	}
	
	public int min(Node current) {
		if(current.leftChild != null) {
			return min(current.leftChild);
		}
		return current.iData;
		
	}
	
	public int max(Node current) {
		if(current.rightChild != null) {
			return max(current.rightChild);
		}
		return current.iData;
	}
}
