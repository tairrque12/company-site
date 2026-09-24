package ai.riq.site.careers.service;

import ai.riq.site.careers.db.entity.JobPostingEntity;
import ai.riq.site.careers.db.repository.JobPostingRepository;
import ai.riq.site.dto.JobPostingsDetailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobPostingService {
    private final JobPostingRepository jobPostingRepository;

    public JobPostingsDetailDTO getById(Long id){
        JobPostingEntity entity = jobPostingRepository.findById(id).get();
        return JobPostingsDetailDTO.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .location(entity.getLocation())
                .aboutRole(entity.getAboutRole())
                .responsibilities(entity.getResponsibilities())
                .requirements(entity.getRequirements())
                .bonusQualifications(entity.getBonusQualifications())
                .salaryMin(entity.getSalaryMinimum())
                .salaryMax(entity.getSalaryMax())
                .build();

    }
}
