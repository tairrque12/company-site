package ai.riq.site.careers.db.repository;

import ai.riq.site.careers.db.entity.DepartmentEntity;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
@Transactional
public class DepartmentRepositoryTest {
    @Autowired
    private DepartmentRepository departmentRepository;

    @Test
    void shouldGetDepartmentBySlug(){
        DepartmentEntity department = DepartmentEntity.builder()
                .id(1L)
                .name("Test Department")
                .slug("test-department")
                .tagline("A department for testing")
                .description("Exist only for this test")
                .build();
        departmentRepository.saveAndFlush(department);
        Optional<DepartmentEntity> found = departmentRepository.findBySlug("test-department");
        assertThat(found).isPresent();
        assertThat(found.get()).usingRecursiveComparison().isEqualTo(department);

    }

}
