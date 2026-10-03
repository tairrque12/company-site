package ai.riq.site.careers.service;

import ai.riq.site.careers.db.entity.JobApplicationEntity;
import ai.riq.site.careers.db.entity.JobPostingEntity;
import ai.riq.site.careers.db.repository.JobApplicationRepository;
import ai.riq.site.careers.db.repository.JobPostingRepository;
import ai.riq.site.dto.JobApplicationRequestDTO;
import ai.riq.site.dto.JobApplicationResponseDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Assertions.assertThat;


import java.time.Instant;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

//RequestDTO = what the applicant submitted.
//ResponseDTO = what the service returns after saving.

@ExtendWith(MockitoExtension.class)
public class JobApplicationTest {

    //FAKE REPO
    @Mock
    JobPostingRepository jobPostingRepository;

    //FAKE REPO
    @Mock
    JobApplicationRepository jobApplicationRepository;

    //INJECT REAL SERVICE
    @InjectMocks
    JobApplicationService jobApplicationService;

    @Test
    void shouldSaveApplication(){
        //ARRANGE - REQUEST DTO IS REPRESENTING THE INFO A USER WOULD SUBMIT FROM THE FRON-END
        JobApplicationRequestDTO jobApplicationRequestDTO = JobApplicationRequestDTO.builder()
                .jobPostingId(1L)
                .firstName("Tairrque")
                .lastName("Baker")
                .preferredFirstName("Tairrque")
                .email("tbaker1312@gmail.com")
                .country("United States")
                .phone("334-820-9553")
                .city("Lanett")
                .build();

        //EXPECTED RESPONSE AFTER SUBMITTING
        JobApplicationResponseDTO expectedResponse =
                JobApplicationResponseDTO.builder()
                        .id(10L)
                        .firstName("Tairrque")
                        .lastName("Baker")
                        .jobPostingTitle("AI Engineer")
                        .submittedAt("2026-10-01T12:00:00Z")
                        .build();

        //THE JOB THEY ARE APPLYING FOR.
        JobPostingEntity jobPosting = JobPostingEntity.builder()
                .id(1L)
                .title("AI Engineer")
                .build();

        //WHEN THE SERVICE ASKED FOR JOB POSTING REPO, RETURN AI ENGINEER.
        // FIND BY ID ALWAYS RETURNS OPTIONAL OF
        when(jobPostingRepository.findById(1L)).thenReturn(Optional.of(jobPosting));
        
        //WHAT THE DATABASE RETURNS AFTER SAVING
        //THE ID IS THE APPLICATION ID
        JobApplicationEntity savedApplication = JobApplicationEntity.builder()
                .id(10L)
                .jobPostingEntity(jobPosting)
                .firstName("Tairrque")
                .lastName("Baker")
                .preferredFirstName("Tairrque")
                .email("tbaker1312@gmail.com")
                .country("United States")
                .phone("334-820-9553")
                .city("Lanett")
                .submittedAt(Instant.parse("2026-10-01T12:00:00Z"))
                .build();

        //WHEN THE SERVICE ASK THE APP INFO TO SAVE ANY ENTITY, PRETEND IT SAVED AND RETURNED THE SAVED APPLICATION
        when(jobApplicationRepository.save(any(JobApplicationEntity.class))).thenReturn(savedApplication);

        //ACT - SHOULD CALL REAL SERVICE
                                                    //HERE IS INFORMATION THEY SUBMITTED, SAVE THEIR APPLICATION
        JobApplicationResponseDTO actualResponse = jobApplicationService.save(jobApplicationRequestDTO);

        //ASSERT
        verify(jobApplicationRepository).save(any(JobApplicationEntity.class));
        assertThat(actualResponse).usingRecursiveComparison().isEqualTo(expectedResponse);


    }
}
