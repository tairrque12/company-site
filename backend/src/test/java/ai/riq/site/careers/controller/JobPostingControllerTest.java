package ai.riq.site.careers.controller;

import ai.riq.site.careers.service.JobPostingService;
import ai.riq.site.dto.JobPostingsDetailDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tools.jackson.databind.ObjectMapper;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
public class JobPostingControllerTest {

    @Mock
    JobPostingService jobPostingService;

    @InjectMocks
    JobPostingController jobPostingController;

    ObjectMapper objectMapper = new ObjectMapper();
    private MockMvc mockMvc;

    @BeforeEach
    void setup(){
        mockMvc = MockMvcBuilders.standaloneSetup(jobPostingController).build();
    }
    @Test
    void shouldReturnIdWithCorrectJobPosting()throws Exception{
        //ARRANGE
        JobPostingsDetailDTO dto = JobPostingsDetailDTO.builder()
                .id(1L)
                .title("AI Engineer")
                .location("Austin, Texas")
                .aboutRole("I love the role")
                .build();

        //WHEN THE CONTROLLER REQUEST JOB ID 1, RETURN IT'S KNOWN DTO.
        //WE ARE TESTING CONTROLLER IN ISOLATION SO INJECT SERVICE
        when(jobPostingService.getById(1L)).thenReturn(dto);

        //ACT-IMAGINE IT HITTING THIS ENDPOINT
        mockMvc.perform(get("/api/careers/jobs/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("AI Engineer"))
                .andExpect(jsonPath("$.location").value("Austin, Texas"))
                .andExpect(jsonPath("$.aboutRole").value("I love the role"));
    }

}
