package com.playground.hibernate;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.sql.Connection;
import java.sql.SQLException;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.h2.tools.RunScript;
import org.hibernate.Session;
import org.hibernate.jdbc.Work;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;

public class JPATestBaseClass {

	protected static EntityManagerFactory emf;
	protected static EntityManager em;

	@BeforeClass
	public static void init() throws FileNotFoundException, SQLException {
		emf = Persistence.createEntityManagerFactory("mnf-pu-test");
		em = emf.createEntityManager();
	}

	@Before
	public void initializeDatabase() {
		final Session session = em.unwrap(Session.class);
		session.doWork(new Work() {
			@Override
			public void execute(final Connection connection) throws SQLException {
				try {
					final File script = new File(getClass().getResource("/data.sql").getFile());
					RunScript.execute(connection, new FileReader(script));
				} catch (final FileNotFoundException e) {
					throw new RuntimeException("could not initialize with script");
				}
			}
		});

	}

	@AfterClass
	public static void tearDown() {
		em.clear();
		em.close();
		emf.close();
	}

}
