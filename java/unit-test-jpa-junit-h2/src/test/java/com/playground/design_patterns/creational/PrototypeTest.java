package com.playground.design_patterns.creational;

import java.util.ArrayList;
import java.util.List;

import org.junit.Before;
import org.junit.Test;

import com.playground.design_patterns.creational.prototype.Circle;
import com.playground.design_patterns.creational.prototype.Rectangle;
import com.playground.design_patterns.creational.prototype.Shape;

public class PrototypeTest {

	 List<Shape> shapes = new ArrayList<>();
     List<Shape> shapesCopy = new ArrayList<>();
     
     @Before
 	public void before() {
    	 Circle circle = new Circle();
         circle.x = 10;
         circle.y = 20;
         circle.radius = 15;
         circle.color = "red";
         shapes.add(circle);

         Circle anotherCircle = (Circle) circle.clone();
         shapes.add(anotherCircle);

         Rectangle rectangle = new Rectangle();
         rectangle.width = 10;
         rectangle.height = 20;
         circle.color = "blue";
         shapes.add(rectangle);
 	}
     
     @Test
 	public void runBusinessLogic_success() {
    	 
    	 for (Shape shape : shapes) {
             shapesCopy.add(shape.clone());
         }

         for (int i = 0; i < shapes.size(); i++) {
             if (shapes.get(i) != shapesCopy.get(i)) {
                 System.out.println(i + ": Shapes are different objects (yay!)");
                 if (shapes.get(i).equals(shapesCopy.get(i))) {
                     System.out.println(i + ": And they are identical (yay!)");
                 } else {
                     System.out.println(i + ": But they are not identical (booo!)");
                 }
             } else {
                 System.out.println(i + ": Shape objects are the same (booo!)");
             }
         }
 	}
}
