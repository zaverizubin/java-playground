package in.focalworks.backend.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import in.focalworks.backend.data.entity.Room;

public interface RoomRepository extends JpaRepository<Room, Long> {
	Page<Room> findBy(Pageable page);

	Page<Room> findByNameLikeIgnoreCase(String name, Pageable page);

	Page<Room> findByNameLikeIgnoreCaseOrderByNameAsc(String name, Pageable page);

	Page<Room> findByNameLikeIgnoreCaseOrderByNameDesc(String name, Pageable page);

	Page<Room> findByNameLikeIgnoreCaseOrderByFacilitator_UsernameAsc(String name, String username, Pageable page);

	Page<Room> findByNameLikeIgnoreCaseOrderByFacilitator_UsernameDesc(String name, String username, Pageable page);

	Page<Room> findByNameLikeIgnoreCaseOrderByScorer_UsernameAsc(String name, String username, Pageable page);

	Page<Room> findByNameLikeIgnoreCaseOrderByScorer_UsernameDesc(String name, String username, Pageable page);

	int countByNameLikeIgnoreCase(String name);
}
