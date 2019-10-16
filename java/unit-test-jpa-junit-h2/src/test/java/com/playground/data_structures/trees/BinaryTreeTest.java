package com.playground.data_structures.trees;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import com.playground.data_structures.trees.BinaryTree.Node;


public class BinaryTreeTest {
	BinaryTree binaryTree;
	Node root;
	
	@Before
	public void initializeBinaryTree() {
	
		binaryTree = new BinaryTree();
		root = new BinaryTree.Node();
		
		root.iData = 63;
		
		root.leftChild = new Node() {{iData=27;}};
		root.rightChild = new Node() {{iData=80;}};
		
		root.leftChild.leftChild = new Node() {{iData=13;}};
		root.leftChild.rightChild = new Node() {{iData=51;}};
		
		root.rightChild.leftChild = new Node() {{iData=70;}};
		root.rightChild.rightChild = new Node() {{iData=92;}};
		
		root.rightChild.rightChild.leftChild = new Node() {{iData=82;}};
		
		root.leftChild.leftChild.rightChild = new Node() {{iData=26;}};
		
		root.leftChild.rightChild.leftChild = new Node() {{iData=33;}};
		root.leftChild.rightChild.rightChild = new Node() {{iData=58;}};
		
		root.leftChild.rightChild.rightChild.leftChild = new Node() {{iData=57;}};
		root.leftChild.rightChild.rightChild.rightChild = new Node() {{iData=60;}};
	}

	@Test
	public void testFind_success() {
		Node node = binaryTree.find(82,root);
		assertEquals(82, node.iData);
	}

	@Test
	public void testInsert_success() {
		Node node = new Node();
		node.iData = 64;
		node.fData = 64;
		binaryTree.insert(node, root);
		node = binaryTree.find(64,root);
		assertEquals(64, node.iData);
	}

	@Test
	public void testInorder_success() {
		StringBuilder output = new StringBuilder(); 
		binaryTree.inOrder(root, output);
		assert("13->26->27->33->51->57->58->60->63->70->80->82->92->".equals(output.toString()));
	}
	
	@Test
	public void testMin_success() {
		int min = binaryTree.min(root);
		assertEquals(13,min);
	}
	
	@Test
	public void testMax_success() {
		int min = binaryTree.max(root);
		assertEquals(92,min);
	}
}
