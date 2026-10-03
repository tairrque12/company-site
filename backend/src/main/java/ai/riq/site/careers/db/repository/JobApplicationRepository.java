package ai.riq.site.careers.db.repository;


import ai.riq.site.careers.db.entity.JobApplicationEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobApplicationRepository extends JpaRepository<JobApplicationEntity, Long> {

}
