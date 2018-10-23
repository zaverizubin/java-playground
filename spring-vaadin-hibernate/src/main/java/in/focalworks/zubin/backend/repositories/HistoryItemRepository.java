package in.focalworks.zubin.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import in.focalworks.zubin.backend.data.entity.HistoryItem;

public interface HistoryItemRepository extends JpaRepository<HistoryItem, Long> {
}
