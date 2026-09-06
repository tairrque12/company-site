package ai.riq.site.careers.service;

import ai.riq.site.careers.db.entity.DepartmentEntity;
import ai.riq.site.careers.db.repository.DepartmentRepository;
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

;

//
@ExtendWith(MockitoExtension.class)
public class DepartmentServiceTest {

    //CREATES A FAKE REPO FOR US.
    @Mock
    DepartmentRepository departmentRepository;

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
}
