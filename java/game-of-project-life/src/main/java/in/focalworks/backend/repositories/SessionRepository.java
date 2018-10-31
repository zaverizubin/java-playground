package in.focalworks.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import in.focalworks.backend.data.entity.Session;

@Repository
public interface SessionRepository extends JpaRepository<Session, Long> {
	Page<Session> findBy(Pageable page);


	Page<Session> findAllByOrderByRoom_NameAsc(Pageable page);

	Page<Session> findAllByOrderByRoom_NameDesc(Pageable page);

	Page<Session> findAllByOrderByStartDateAsc(Pageable page);

	Page<Session> findAllByOrderByStartDateDesc(Pageable page);

	Page<Session> findAllByOrderByEndDateAsc(Pageable page);

	Page<Session> findAllByOrderByEndDateDesc(Pageable page);

	/*
	 * Page<Session> findSessionOrderByCompletedAsc(Pageable page);
	 *
	 * Page<Session> findSessionOrderByCompletedDesc(Pageable page);
	 */

	int countBySessionKeyLikeIgnoreCase(String sessionkey);
}
