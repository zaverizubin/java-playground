package in.focalworks.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import in.focalworks.backend.data.entity.Team;
import in.focalworks.backend.data.entity.User;

public interface TeamRepository extends JpaRepository<Team, Long> {

	User findById(long id);

	Page<Team> findBy(Pageable page);

	Page<Team> findByNameLikeIgnoreCase(String name, Pageable page);

	Page<Team> findByNameLikeIgnoreCaseOrderByNameAsc(String name, Pageable page);

	Page<Team> findByNameLikeIgnoreCaseOrderByNameDesc(String name, Pageable page);

	Page<Team> findByNameLikeIgnoreCaseOrderByEnabledAsc(String name, Pageable page);

	Page<Team> findByNameLikeIgnoreCaseOrderByEnabledDesc(String name, Pageable page);

	int countByNameLikeIgnoreCase(String name);
}
