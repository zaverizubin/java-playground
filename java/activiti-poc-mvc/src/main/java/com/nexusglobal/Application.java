package com.nexusglobal;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.servlet.error.ErrorMvcAutoConfiguration;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import org.springframework.context.annotation.Configuration;

import com.nexusglobal.services.activiti.ActivitiService;



/**
 * Spring boot web application initializer.
 */
@SpringBootApplication(scanBasePackageClasses = { Application.class }, exclude = ErrorMvcAutoConfiguration.class)
@Configuration
public class Application extends SpringBootServletInitializer {

	public static void main(final String[] args) {
		SpringApplication.run(Application.class, args);
	}

	@Override
	protected SpringApplicationBuilder configure(final SpringApplicationBuilder application) {
		return application.sources(Application.class);
	}
}
