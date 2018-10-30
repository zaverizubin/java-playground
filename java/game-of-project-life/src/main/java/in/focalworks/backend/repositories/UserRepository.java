package in.focalworks.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import in.focalworks.backend.data.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {

	User findById(long id);

	Page<User> findBy(Pageable page);

	Page<User> findByUsernameLikeIgnoreCase(String username, Pageable page);

	Page<User> findByUsernameLikeAndUsernameNotIgnoreCaseOrderByUsernameAsc(String usernameLike, String usernameNot,
			Pageable page);

	Page<User> findByUsernameLikeAndUsernameNotIgnoreCaseOrderByUsernameDesc(String usernameLike, String usernameNot,
			Pageable page);

	Page<User> findByUsernameLikeAndUsernameNotIgnoreCaseOrderByEnabledAsc(String username, String usernameNot,
			Pageable page);

	Page<User> findByUsernameLikeAndUsernameNotIgnoreCaseOrderByEnabledDesc(String username, String usernameNot,
			Pageable page);

	Page<User> findByRole_Name(String name, Pageable page);

	int countByUsernameLikeIgnoreCase(String username);
}
