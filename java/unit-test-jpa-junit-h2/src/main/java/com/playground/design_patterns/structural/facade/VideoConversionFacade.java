package com.playground.design_patterns.structural.facade;

import java.io.File;

/*
 * Facade is a structural design pattern that provides a simplified (but limited) interface to
 *  a complex system of classes, library or framework.
 * */
public class VideoConversionFacade {
    public File convertVideo(String fileName, String format) {
    	
        System.out.println("VideoConversionFacade: conversion started.");
        
        VideoFile file = new VideoFile(fileName);
        Codec sourceCodec = CodecFactory.extract(file);
        Codec destinationCodec;
        
        if (format.equals("mp4")) {
            destinationCodec = new OggCompressionCodec();
        } else {
            destinationCodec = new MPEG4CompressionCodec();
        }
        
        VideoFile buffer = BitrateReader.read(file, sourceCodec);
        
        VideoFile intermediateResult = BitrateReader.convert(buffer, destinationCodec);
        
        File result = (new AudioMixer()).fix(intermediateResult);
        
        System.out.println("VideoConversionFacade: conversion completed.");
        
        return result;
    }
}