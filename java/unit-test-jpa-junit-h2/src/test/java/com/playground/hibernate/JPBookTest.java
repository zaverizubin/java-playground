package com.playground.hibernate;

import static junit.framework.TestCase.assertNotNull;
import static org.hibernate.testing.transaction.TransactionUtil.doInJPA;
import static org.junit.Assert.assertEquals;

import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.BeforeClass;
import org.junit.Test;

import com.playground.hibernate.entities.Book;

public class JPBookTest {

	protected static EntityManagerFactory entityManagerFactory() {
		return Persistence.createEntityManagerFactory("mnf-pu-test");
	}

	@BeforeClass
	public static void initializeDatabase() {
		doInJPA(JPBookTest::entityManagerFactory, em -> {
			em.persist(new Book(1, "Unit Test Hibernate/JPA with in memory H2 Database"));
		});
	}

	@Test
	public void testGetObjectById_success() {
		doInJPA(JPBookTest::entityManagerFactory, em -> {
			final Book book = em.find(Book.class, 1);
			assertNotNull(book);
		});
	}

	@Test
	public void testGetAll_success() {
		doInJPA(JPBookTest::entityManagerFactory, em -> {
			final List<Book> books = em.createNamedQuery("Book.getAll", Book.class).getResultList();
			assertEquals(1, books.size());
		});
	}

	@Test
	public void testPersist_success() {
		doInJPA(JPBookTest::entityManagerFactory, em -> {
			em.persist(new Book(10, "Unit Test Hibernate/JPA with in memory H2 Database"));
			final List<Book> books = em.createNamedQuery("Book.getAll", Book.class).getResultList();
			assertNotNull(books);
			assertEquals(2, books.size());
		});
	}

	@Test
	public void testDelete_success(){
		doInJPA(JPBookTest::entityManagerFactory, em -> {
			final Book book = em.find(Book.class, 1);
			em.remove(book);
			final List<Book> books = em.createNamedQuery("Book.getAll", Book.class).getResultList();
			assertEquals(1, books.size());
		});

	}
}
