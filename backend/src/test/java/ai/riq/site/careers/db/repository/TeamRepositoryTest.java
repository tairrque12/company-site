package ai.riq.site.careers.db.repository;

import ai.riq.site.careers.db.entity.DepartmentEntity;
import ai.riq.site.careers.db.entity.TeamEntity;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@Transactional
public class TeamRepositoryTest {

    //NEED DEPARTMENT TO HAVE TEAM - SET UP DEPARTMENT DB
    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private TeamRepository teamRepository;

    @Test
    void shouldFindtTeamsByDepartmentId(){
        DepartmentEntity department = DepartmentEntity.builder()
                .name("Test Department")
                .slug("test-department")
                .imageUrl("testingDepartment.jpg")
                .tagline("We love testing")
                .description("Testing is needed")
                .build();
        //SAVE AND FLUSH BUILDS AND SAVES SO IT HAS SOMETHING TO REFERENCE.
        departmentRepository.saveAndFlush(department);

        TeamEntity team = TeamEntity.builder()
                //PASSES THE ACTUAL SAVED DEPARTMENT IN.
                .department(department)
                .name("Test Team")
                .slug("test-team")
                .build();
        teamRepository.saveAndFlush(team);

        //ASK THE DEPARTMENT OBJECT FOR REAL ID, THEN ASK TEAM REPO TO FIND EVERY TEAM THAT BELONGS WITH THAT EXACT ID.
        List<TeamEntity> result = teamRepository.findByDepartmentId(department.getId());

        assertThat(result).hasSize(1);
        assertThat(result.get(0).getName()).isEqualTo("Test Team");
    }
}