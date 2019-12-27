package com.playground.design_patterns.behavorial.iterator;

public interface ISocialNetwork {
		
    IProfileIterator createFriendsIterator(String profileEmail);

    IProfileIterator createCoworkersIterator(String profileEmail);
    
}