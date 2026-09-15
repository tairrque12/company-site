package ai.riq.site.careers.db.repository;

import ai.riq.site.careers.db.entity.JobPostingEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobPostingRepository extends JpaRepository<JobPostingEntity, Long> {
    List<JobPostingEntity> findByTeamId(Long teamId);
}