package com.playground.design_patterns.behavorial.iterator;

public interface IProfileIterator {
    boolean hasNext();

    Profile getNext();

    void reset();
}
