package ai.riq.site.careers.db.repository;

import ai.riq.site.careers.db.entity.TeamEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<TeamEntity, Long> {
    List<TeamEntity> findByDepartmentId(Long departmentId);

}