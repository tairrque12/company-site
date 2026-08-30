package ai.riq.site.careers.controller;

import ai.riq.site.careers.service.DepartmentService;
import ai.riq.site.dto.DepartmentDTO;
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
public class DepartmentControllerTest {

    @Mock
    DepartmentService departmentService;

    @InjectMocks
    DepartmentController departmentController;

    //CONVERTS JAVA OBJECTS INTO JSON- NEEDED TO ACCEPT DATA
    ObjectMapper objectMapper = new ObjectMapper();

    //LETS YOU SIMULATE A WEB-SERVER WITHOUT ACTUALLY DOING IT.
    private MockMvc mockMvc;

    //NEEDED BEFORE EVERY CONTROLLER TEST - WIRES UP FAKE SERVER DOESNT ALLOW STATE TO LEAK IN TO EACH INDIVIUAL TEST
    @BeforeEach
    void setup(){
        mockMvc = MockMvcBuilders.standaloneSetup(departmentController).build();
    }
    @Test
    void shouldReturnDepartmentWhenSlugExist() throws Exception{
        //ARRANGE - BUILD FAKE DTO INSTEAD OF ENTITY
        DepartmentDTO dto = DepartmentDTO.builder()
                .name("Robotics")
                .slug("robotics")
                .tagline("Engineer The Impossible")
                .description("This is Awesome!")
                .build();
        when(departmentService.getBySlug("robotics")).thenReturn(dto);

        //ACT - SIMULATE AN EXACT HTTP GET REQUEST HITTING THIS URL
        mockMvc.perform(get("/api/careers/robotics"))
                //VERIIES THAT WE GOT 200OK STATUS CODE
                .andExpect(status().isOk())
                //REACHES INTO JSON OBJECT GET NAME CALLED ROBOTICS AND SLUG robotics
                .andExpect(jsonPath("$.name").value("Robotics"))
                .andExpect(jsonPath("$.slug").value("robotics"));
    }
}

