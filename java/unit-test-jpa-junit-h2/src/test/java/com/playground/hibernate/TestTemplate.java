package com.playground.hibernate;

import static org.hibernate.testing.transaction.TransactionUtil.doInJPA;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.BeforeClass;
import org.junit.Test;

import com.playground.hibernate.entities.Book;

public class TestTemplate {

	protected static EntityManagerFactory entityManagerFactory() {
		return Persistence.createEntityManagerFactory("test");
	}

	@BeforeClass
	public static void initializeDatabase() {
		doInJPA(TestTemplate::entityManagerFactory, em -> {
			em.persist(new Book(1, "Unit Test Hibernate/JPA with in memory H2 Database"));
		});
	}

	@Test
	public void testGetObjectById_success() {
		doInJPA(TestTemplate::entityManagerFactory, em -> {

		});
	}


}
