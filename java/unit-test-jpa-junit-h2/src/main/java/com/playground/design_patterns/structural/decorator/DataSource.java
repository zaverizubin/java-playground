package com.playground.design_patterns.structural.decorator;

public interface DataSource {
    void writeData(String data);

    String readData();
}