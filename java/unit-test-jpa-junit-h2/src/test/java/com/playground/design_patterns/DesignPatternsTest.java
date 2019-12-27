package com.playground.design_patterns;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.io.File;

import org.junit.Test;

import com.playground.design_patterns.structural.adapter.RoundHole;
import com.playground.design_patterns.structural.adapter.RoundPeg;
import com.playground.design_patterns.structural.adapter.SquarePeg;
import com.playground.design_patterns.structural.adapter.SquarePegAdapter;
import com.playground.design_patterns.structural.bridge.AdvancedRemote;
import com.playground.design_patterns.structural.bridge.BasicRemote;
import com.playground.design_patterns.structural.bridge.Device;
import com.playground.design_patterns.structural.bridge.Radio;
import com.playground.design_patterns.structural.bridge.Tv;
import com.playground.design_patterns.structural.decorator.CompressionDecorator;
import com.playground.design_patterns.structural.decorator.DataSource;
import com.playground.design_patterns.structural.decorator.DataSourceDecorator;
import com.playground.design_patterns.structural.decorator.EncryptionDecorator;
import com.playground.design_patterns.structural.decorator.FileDataSource;
import com.playground.design_patterns.structural.facade.VideoConversionFacade;

public class DesignPatternsTest {
	
	@Test
	public void facade_test() {
	 	VideoConversionFacade converter = new VideoConversionFacade();
	    File mp4Video = converter.convertVideo("youtubevideo.ogg", "mp4");
	}
	
	@Test 
	public void adapter_test() {
		RoundHole hole = new RoundHole(5);
        RoundPeg rpeg = new RoundPeg(5);

        assertTrue(hole.fits(rpeg) );

        SquarePeg smallSqPeg = new SquarePeg(2);
        SquarePeg largeSqPeg = new SquarePeg(20);
       
        // Adapter solves the problem.
        SquarePegAdapter smallSqPegAdapter = new SquarePegAdapter(smallSqPeg);
        SquarePegAdapter largeSqPegAdapter = new SquarePegAdapter(largeSqPeg);
        
        assertTrue(hole.fits(smallSqPegAdapter));
        assertFalse(hole.fits(largeSqPegAdapter));
        
	}
	
	@Test 
	public void decorator_test() {
		
	  String salaryRecords = "Name,Salary\nJohn Smith,100000\nSteven Jobs,912000";
	  DataSourceDecorator encoded = new CompressionDecorator(
	                                         new EncryptionDecorator(
	                                             new FileDataSource("out/OutputDemo.txt")));
	  encoded.writeData(salaryRecords);
	  DataSource plain = new FileDataSource("out/OutputDemo.txt");
	}
	
	@Test 
	public void bridge_test() {
		Device device = new Tv();
        BasicRemote basicRemote = new BasicRemote(device);
        basicRemote.power();
        device.printStatus();

        device = new Radio();
        AdvancedRemote advancedRemote = new AdvancedRemote(device);
        advancedRemote.power();
        advancedRemote.mute();
        device.printStatus();
	}
}
