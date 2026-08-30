package ai.riq.site.careers.service;

import ai.riq.site.careers.db.entity.DepartmentEntity;
import ai.riq.site.careers.db.repository.DepartmentRepository;
import ai.riq.site.dto.DepartmentDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.mockito.Mockito.when;

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
                .build();
        //WHEN SOMEONE CALLS FIND-BY-SLUG WITH robotics, return the entity
        when(departmentRepository.findBySlug("robotics")).thenReturn(Optional.of(entity));

        //ACT -CALL THE REAL METHOD ON THE SERVICE
        DepartmentDTO result = departmentService.getBySlug("robotics");

        //ASSERT - VERIFY DTO FIELDS
        assertThat(result.getName()).isEqualTo("Robotics");
        assertThat(result.getSlug()).isEqualTo("robotics");

    }
}
