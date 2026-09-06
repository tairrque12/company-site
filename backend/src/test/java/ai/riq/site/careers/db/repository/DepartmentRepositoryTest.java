package ai.riq.site.careers.db.repository;

import ai.riq.site.careers.db.entity.DepartmentEntity;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

//SPINS UP ENTIRE REAL APPLICATION
@SpringBootTest
@Transactional
public class DepartmentRepositoryTest {
    @Autowired
    private DepartmentRepository departmentRepository;

    @Test
    void shouldGetDepartmentBySlug(){
        // STEP 1: ARRANGE - SET UP THE DATA
        DepartmentEntity department = DepartmentEntity.builder()
                .id(1L)
                .name("Test Department")
                .slug("test-department")
                .tagline("A department for testing")
                .description("Exist only for this test")
                .build();
        //
        departmentRepository.saveAndFlush(department);
        //STEP 2: ACT: CALL THE ACTUAL THING YOU ARE TESTING
        Optional<DepartmentEntity> found = departmentRepository.findBySlug("test-department");
        //STEP 3: ASSERT: VERIFY THE RESULT
        assertThat(found).isPresent();
        assertThat(found.get()).usingRecursiveComparison().isEqualTo(department);
        //RECURSIVE COMPARISON VERIFIES EACH FIELD ONE BY ONE INSTEAD OF HAVIMG TO DO IT YOURSELF.
    }

}
