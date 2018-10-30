package in.focalworks.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import in.focalworks.backend.data.entity.Session;

public interface SessionRepository extends JpaRepository<Session, Long> {
	Page<Session> findBy(Pageable page);


	Page<Session> findSessionOrderByRoom_NameAsc(Pageable page);

	Page<Session> findSessionOrderByRoom_NameDesc(Pageable page);

	Page<Session> findSessionOrderByStartDateAsc(Pageable page);

	Page<Session> findSessionOrderByStartDateDesc(Pageable page);

	Page<Session> findSessionOrderByEndDateAsc(Pageable page);

	Page<Session> findSessionOrderByEndDateDesc(Pageable page);

	Page<Session> findSessionOrderByCompletedAsc(Pageable page);

	Page<Session> findSessionOrderByCompletedDesc(Pageable page);

	int countBySessionKeyLikeIgnoreCase(String sessionkey);
}
