package in.focalworks.backend.repositories;

import static org.junit.Assert.assertEquals;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.junit4.SpringRunner;

import in.focalworks.app.DataGenerator;
import in.focalworks.backend.data.entity.User;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryIntegrationTest {

	@Autowired
	private TestEntityManager entityManager;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private DataGenerator dataGenerator;

	private Pageable createPageRequest(final int firstResult, final int maxResults) {
		return PageRequest.of(firstResult, maxResults);
	}


	@Test
	public void givenUsersWhenUserNotAdminThenCount() {


		// when
		final Pageable page = createPageRequest(0, 20);
		final Page<User> users = userRepository.findByRoles_NameNot("admin", page);
		// then
		assertEquals(2, users.getContent().size());
	}

}
