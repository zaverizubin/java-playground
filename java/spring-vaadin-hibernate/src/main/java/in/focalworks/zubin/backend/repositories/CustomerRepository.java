package in.focalworks.zubin.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import in.focalworks.zubin.backend.data.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
