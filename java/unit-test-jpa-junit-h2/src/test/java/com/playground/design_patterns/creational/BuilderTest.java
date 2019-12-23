package com.playground.design_patterns.creational;

import org.junit.Before;
import org.junit.Test;

import com.playground.design_patterns.creational.builder.Car;
import com.playground.design_patterns.creational.builder.CarBuilder;
import com.playground.design_patterns.creational.builder.CarManualBuilder;
import com.playground.design_patterns.creational.builder.Director;
import com.playground.design_patterns.creational.builder.Manual;

public class BuilderTest {
	
	@Before
	public void before() {
	}

	@Test
	public void runBusinessLogic_success() {
		Director director = new Director();

        
        CarBuilder builder = new CarBuilder();
        director.constructSportsCar(builder);

        // The final product is often retrieved from a builder object, since
        // Director is not aware and not dependent on concrete builders and
        // products.
        Car car = builder.getResult();
        System.out.println("Car built:\n" + car.getType());


        CarManualBuilder manualBuilder = new CarManualBuilder();

        // Director may know several building recipes.
        director.constructSportsCar(manualBuilder);
        Manual carManual = manualBuilder.getResult();
        System.out.println("\nCar manual built:\n" + carManual.print());
	}

}
