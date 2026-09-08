package ai.riq.site.careers.service;

import ai.riq.site.careers.db.entity.DepartmentEntity;
import ai.riq.site.careers.db.entity.TeamEntity;
import ai.riq.site.careers.db.repository.DepartmentRepository;
import ai.riq.site.careers.db.repository.TeamRepository;
import ai.riq.site.dto.DepartmentDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class DepartmentServiceTest {

    //CREATES A FAKE REPO FOR US.
    @Mock
    DepartmentRepository departmentRepository;

    @Mock
    TeamRepository teamRepository;

    //CREATES A REAL SERVICE - THE CLASS I AM ACTUALLY TESTING
    @InjectMocks
    DepartmentService departmentService;

    @Test
    void shouldReturnDepartmentDtoWhenSlugExists(){
        //ARRANGE - BUILD FAKE ENTITY
        DepartmentEntity entity = DepartmentEntity.builder()
                .id(1L)
                .name("Robotics")
                .slug("robotics")
                .tagline("Engineer The Impossible")
                .description("I love this")
                .imageUrl("robotics.jpg")
                .build();
        //WHEN SOMEONE CALLS FIND-BY-SLUG WITH robotics, return the entity
        when(departmentRepository.findBySlug("robotics")).thenReturn(Optional.of(entity));
        //WHEN SOMEONE ASKS FOR THIS DEPARTMENT'S TEAMS, SAY THERE ARE NONE.
        when(teamRepository.findByDepartmentId(entity.getId())).thenReturn(List.of());

        //ACT -CALL THE REAL METHOD ON THE SERVICE
        DepartmentDTO result = departmentService.getBySlug("robotics");

        //ASSERT - VERIFY DTO FIELDS
        assertThat(result.getName()).isEqualTo("Robotics");
        assertThat(result.getSlug()).isEqualTo("robotics");
        assertThat(result.getImageUrl()).isEqualTo("robotics.jpg");
    }

    @Test
    void shouldReturnAllDepartmentsAsDtos(){
        //ARRANGE - BUILD FAKE ENTITY
        DepartmentEntity entity = DepartmentEntity.builder()
                .id(1L)
                .name("Robotics")
                .slug("robotics")
                .tagline("Engineer The Impossible")
                .description("I love this")
                .imageUrl("robotics.jpg")
                .build();

        when(departmentRepository.findAll()).thenReturn(List.of(entity));

        //ACT - ACTUALLY CHECKS SERVICE
        List<DepartmentDTO> result = departmentService.getAllDepartments();

        //ASSERT - VERIFY ITS CORRECT
        assertThat(result).hasSize(1);
        //DOES THE CONTENT MATCH
        assertThat(result.get(0).getName()).isEqualTo("Robotics");
        assertThat(result.get(0).getSlug()).isEqualTo("robotics");
        assertThat(result.get(0).getTagline()).isEqualTo("Engineer The Impossible");
        assertThat(result.get(0).getImageUrl()).isEqualTo("robotics.jpg");
    }

    @Test
    void shouldReturnDepartmentDtoWhenSlugExist(){
        //ARRANGE
        DepartmentEntity department = DepartmentEntity.builder()
                .id(1L)
                .name("Robotics")
                .slug("robotics")
                .tagline("Engineer The Impossible")
                .description("I love this")
                .imageUrl("robotics.jpg")
                .build();

        //ARRANGE
        TeamEntity team = TeamEntity.builder()
                .department(department)
                .name("AI & Robotics")
                .slug("ai-robotics")
                .build();
        //WHEN SOMEONE ASK FOR DEPARTMENT NAME ROBOTICS, HAND THEM BACK THE ONE I MADE IF IT'S THERE.
        when(departmentRepository.findBySlug("robotics")).thenReturn(Optional.of(department));
        //WHEN SOMEONE ASK FOR THE TEAM I MADE, HAND THEM BACK THE ONE I JUST MADE.
        when(teamRepository.findByDepartmentId(department.getId())).thenReturn(List.of(team));

        //ACT
        DepartmentDTO result = departmentService.getBySlug("robotics");

        //ASSERT
        assertThat(result.getTeams()).isNotNull();
        assertThat(result.getTeams()).hasSize(1);
        assertThat(result.getTeams().get(0).getName()).isEqualTo("AI & Robotics");
    }
}