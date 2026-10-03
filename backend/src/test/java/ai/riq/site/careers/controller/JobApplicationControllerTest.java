package ai.riq.site.careers.controller;

import ai.riq.site.careers.service.JobApplicationService;
import ai.riq.site.dto.JobApplicationRequestDTO;
import ai.riq.site.dto.JobApplicationResponseDTO;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import tools.jackson.databind.ObjectMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@ExtendWith(MockitoExtension.class)
public class JobApplicationControllerTest {

    // FAKE SERVICE
    @Mock
    JobApplicationService jobApplicationService;

    // REAL CONTROLLER
    @InjectMocks
    JobApplicationController jobApplicationController;

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        mockMvc = MockMvcBuilders
                .standaloneSetup(jobApplicationController)
                .build();
    }

    // TEST 1: DIRECT CONTROLLER UNIT TEST
    @Test
    void shouldCreateApplication() {

        // ARRANGE - Information submitted by the applicant
        JobApplicationRequestDTO requestDTO =
                JobApplicationRequestDTO.builder()
                        .jobPostingId(1L)
                        .firstName("Tairrque")
                        .lastName("Baker")
                        .preferredFirstName("Tairrque")
                        .email("tbaker1312@gmail.com")
                        .country("United States")
                        .phone("334-820-9553")
                        .city("Lanett")
                        .build();

        // Expected result after saving
        JobApplicationResponseDTO expectedResponse =
                JobApplicationResponseDTO.builder()
                        .id(10L)
                        .firstName("Tairrque")
                        .lastName("Baker")
                        .jobPostingTitle("AI Engineer")
                        .departmentName("Robotics")
                        .submittedAt("2026-10-01T12:00:00Z")
                        .build();

        // Pretend the service successfully saved the application
        when(jobApplicationService.save(requestDTO))
                .thenReturn(expectedResponse);

        // ACT - Call the real controller
        ResponseEntity<JobApplicationResponseDTO> actualResponse =
                jobApplicationController.createApplication(requestDTO);

        // ASSERT - Controller called the service
        verify(jobApplicationService).save(requestDTO);

        // ASSERT - Returned HTTP 201
        assertEquals(
                HttpStatus.CREATED,
                actualResponse.getStatusCode()
        );

        // ASSERT - Returned the expected response body
        assertThat(actualResponse.getBody())
                .usingRecursiveComparison()
                .isEqualTo(expectedResponse);
    }

    // TEST 2: MOCKMVC HTTP POST TEST
    @Test
    void shouldReturn201WhenApplicationIsSubmitted() throws Exception {

        // ARRANGE
        JobApplicationRequestDTO requestDTO =
                JobApplicationRequestDTO.builder()
                        .jobPostingId(1L)
                        .firstName("Tairrque")
                        .lastName("Baker")
                        .preferredFirstName("Tairrque")
                        .email("tbaker1312@gmail.com")
                        .country("United States")
                        .phone("334-820-9553")
                        .city("Lanett")
                        .build();

        JobApplicationResponseDTO expectedResponse =
                JobApplicationResponseDTO.builder()
                        .id(10L)
                        .firstName("Tairrque")
                        .lastName("Baker")
                        .jobPostingTitle("AI Engineer")
                        .departmentName("Robotics")
                        .submittedAt("2026-10-01T12:00:00Z")
                        .build();

        // The service is mocked because we're testing the controller
        when(jobApplicationService.save(requestDTO))
                .thenReturn(expectedResponse);

        // ACT + ASSERT
        mockMvc.perform(
                        post("/api/job-applications")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(
                                        objectMapper.writeValueAsString(requestDTO)
                                )
                )

                // Verify HTTP status
                .andExpect(status().isCreated())

                // Verify response is JSON
                .andExpect(content().contentTypeCompatibleWith(
                        MediaType.APPLICATION_JSON
                ))

                // Verify returned JSON fields
                .andExpect(jsonPath("$.id").value(10))
                .andExpect(jsonPath("$.firstName").value("Tairrque"))
                .andExpect(jsonPath("$.lastName").value("Baker"))
                .andExpect(jsonPath("$.jobPostingTitle").value("AI Engineer"))
                .andExpect(jsonPath("$.departmentName").value("Robotics"))
                .andExpect(jsonPath("$.submittedAt")
                        .value("2026-10-01T12:00:00Z"));

        // Verify the service was called
        verify(jobApplicationService).save(requestDTO);
    }
}