package in.focalworks.backend.repositories;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import in.focalworks.backend.data.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

	Role findBy(Pageable page);

	Role findById(long id);

	Role findByNameIgnoreCase(String name);

}
