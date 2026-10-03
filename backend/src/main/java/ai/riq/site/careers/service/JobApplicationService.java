
package ai.riq.site.careers.service;

import ai.riq.site.careers.db.entity.JobApplicationEntity;
import ai.riq.site.careers.db.entity.JobPostingEntity;

import ai.riq.site.careers.db.repository.JobApplicationRepository;
import ai.riq.site.careers.db.repository.JobPostingRepository;

import ai.riq.site.dto.JobApplicationRequestDTO;
import ai.riq.site.dto.JobApplicationResponseDTO;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@RequiredArgsConstructor
public class JobApplicationService {

    private final JobApplicationRepository jobApplicationRepository;
    private final JobPostingRepository jobPostingRepository;

    public JobApplicationResponseDTO save(JobApplicationRequestDTO requestDTO) {

        // 1. FIND - Find the existing job the applicant is applying for.
        JobPostingEntity jobPosting = jobPostingRepository
                .findById(requestDTO.getJobPostingId())
                .orElseThrow(() ->
                        new IllegalArgumentException(
                                "Job posting not found: " + requestDTO.getJobPostingId()
                        )
                );

        // 2. BUILD - Convert the RequestDTO into a new Entity.
        JobApplicationEntity application = JobApplicationEntity.builder()
                .jobPostingEntity(jobPosting)
                .firstName(requestDTO.getFirstName())
                .lastName(requestDTO.getLastName())
                .preferredFirstName(requestDTO.getPreferredFirstName())
                .email(requestDTO.getEmail())
                .country(requestDTO.getCountry())
                .phone(requestDTO.getPhone())
                .city(requestDTO.getCity())
                .linkedinUrl(requestDTO.getLinkedinUrl())
                .websiteUrl(requestDTO.getWebsiteUrl())
                .submittedAt(Instant.now())
                .build();

        // Resume path is temporarily null until file upload is implemented.

        // 3. SAVE - Persist the application and capture the saved Entity.
        JobApplicationEntity savedApplication =
                jobApplicationRepository.save(application);

        // 4. RETURN - Convert the saved Entity into a ResponseDTO.
        return JobApplicationResponseDTO.builder()
                .id(savedApplication.getId())
                .firstName(savedApplication.getFirstName())
                .lastName(savedApplication.getLastName())
                .jobPostingTitle(
                        savedApplication.getJobPostingEntity().getTitle()
                )
                .submittedAt(
                        savedApplication.getSubmittedAt().toString()
                )
                .build();
    }
}
