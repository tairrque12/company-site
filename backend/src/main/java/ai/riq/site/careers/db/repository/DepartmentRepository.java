package ai.riq.site.careers.db.repository;

import ai.riq.site.careers.db.entity.DepartmentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DepartmentRepository extends JpaRepository <DepartmentEntity, Long> {
    Optional<DepartmentEntity> findBySlug(String slug);

}
