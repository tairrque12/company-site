package ai.riq.site.careers.controller;

import ai.riq.site.careers.service.JobApplicationService;
import ai.riq.site.dto.JobApplicationRequestDTO;
import ai.riq.site.dto.JobApplicationResponseDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
public class JobApplicationControllerTest {


    @Mock
    JobApplicationService jobApplicationService;

    @InjectMocks
    JobApplicationController jobApplicationController;

    @Test
    void shouldCreateApplication(){
        //ARRANGE
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

        JobApplicationResponseDTO expectedResponse = JobApplicationResponseDTO.builder()
                .id(10L)
                .firstName("Tairrque")
                .lastName("Baker")
                .jobPostingTitle("AI Engineer")
                .departmentName("Robotics")
                .submittedAt("2026-10-01T12:00:00Z")
                .build();
        when(jobApplicationService.save(jobApplicationRequestDTO)).thenReturn(expectedResponse);

        // ACT
        ResponseEntity<JobApplicationResponseDTO> actualResponse =
                jobApplicationController.createApplication(jobApplicationRequestDTO);

        // ASSERT

        //DID THE CONTROLLER CALL THE SERVICE?
        verify(jobApplicationService).save(jobApplicationRequestDTO);
        //DID THE CONTROLLER RETURN HTTP STATUS 201
        assertEquals(HttpStatus.CREATED, actualResponse.getStatusCode());
        //DID THE CONTROLLER RETURN EXPECTED DTO
        assertThat(actualResponse.getBody()).usingRecursiveComparison().isEqualTo(expectedResponse);


    }
}
