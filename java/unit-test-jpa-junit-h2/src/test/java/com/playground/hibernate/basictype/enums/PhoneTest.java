package com.playground.hibernate.basictype.enums;

import static org.junit.Assert.assertNotNull;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.BeforeClass;
import org.junit.Test;

public class PhoneTest {

	protected static EntityManagerFactory entityManagerFactory() {
		return Persistence.createEntityManagerFactory("test");
	}

	@BeforeClass
	public static void initializeDatabase() {
		doInJPA(PhoneTest::entityManagerFactory, em -> {
			em.persist(new Phone(1L, "123-456-908", PhoneType.LAND_LINE));
		});
	}

	@Test
	public void testGetObjectById_success() {
		doInJPA(PhoneTest::entityManagerFactory, em -> {
			assertNotNull(em.find(Phone.class, 1L));
		});
	}


}
