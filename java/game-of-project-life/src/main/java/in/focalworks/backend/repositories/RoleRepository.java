package in.focalworks.backend.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import in.focalworks.backend.data.entity.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {

	Optional<Role> findByNameIgnoreCase(String name);

}
