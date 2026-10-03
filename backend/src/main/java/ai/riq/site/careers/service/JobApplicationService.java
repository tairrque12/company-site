package ai.riq.site.careers.service;

import ai.riq.site.careers.db.entity.JobApplicationEntity;
import ai.riq.site.careers.db.entity.JobPostingEntity;
import ai.riq.site.careers.db.repository.JobApplicationRepository;
import ai.riq.site.careers.db.repository.JobPostingRepository;
import ai.riq.site.dto.JobApplicationRequestDTO;
import ai.riq.site.dto.JobApplicationResponseDTO;
import ai.riq.site.dto.JobPostingsDetailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobApplicationService {
    private final JobApplicationRepository jobApplicationRepository;
    private final JobPostingRepository jobPostingRepository;

    public JobApplicationResponseDTO save(JobApplicationRequestDTO requestDTO){
        //1. Find the existing job the applicant is applying for
        JobPostingEntity jobPosting = jobPostingRepository.findById(requestDTO.getJobPostingId()).orElseThrow();

        //2.TURN THE REQUEST DTO INTO A NEW JOB APP ENTITY
        JobApplicationEntity application = JobApplicationEntity.builder()
                .jobPostingEntity(jobPosting)
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .email(requestDTO.getEmail())
                .phone(requestDTO.getPhone())
                .city(requestDTO.getCity())
                .build();

        //3. SAVE THE NEW APPLICATION
        JobApplicationEntity savedApplication = jobApplicationRepository.save(application);

        //4. TURN THE SAVED ENTITY INTO A RESPONSE DTO
        return JobApplicationResponseDTO.builder()
                .id(savedApplication.getId())
                .firstName(savedApplication.getFirstName())
                .lastName(savedApplication.getLastName())
                .jobPostingTitle(savedApplication.getJobPostingEntity().getTitle())
                .submittedAt(savedApplication.getSubmittedAt().toString())
                .build();
    }

}
