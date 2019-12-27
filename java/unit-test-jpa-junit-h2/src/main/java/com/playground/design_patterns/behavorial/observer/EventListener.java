package com.playground.design_patterns.behavorial.observer;

import java.io.File;

public interface EventListener {
    void update(String eventType, File file);
}