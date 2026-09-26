package ai.riq.site.careers.service;

import ai.riq.site.careers.db.entity.JobPostingEntity;
import ai.riq.site.careers.db.repository.JobPostingRepository;
import ai.riq.site.dto.JobPostingSummaryDTO;
import ai.riq.site.dto.JobPostingsDetailDTO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.assertj.core.api.Assertions.assertThat;


import java.util.Optional;

import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class JobPostingServiceTest {

    @Mock
    JobPostingRepository jobPostingRepository;

    @InjectMocks
    JobPostingService jobPostingService;

    @Test
    void shouldReturnJobPostingDetailsById(){
        //ARRANGE
        JobPostingEntity entity = JobPostingEntity.builder()
                .id(1L)
                .title("AI Engineer")
                .location("Austin, Texas")
                .aboutRole("I love the role")
                .responsibilities("Love your job")
                .requirements("Genuine motivation to work on safety problems you care about why this work matters.")
                .bonusQualifications("Background in CSAM detection, integrity engineering, or platform abuse.")
                .salaryMinimum(150000)
                .salaryMax(300000)
                .build();

        when(jobPostingRepository.findById(1L)).thenReturn(Optional.of(entity));

        //ACT
        JobPostingsDetailDTO result = jobPostingService.getById(1L);


        //ASSERT
        assertThat(result.getId()).isEqualTo(1L);
        assertThat(result.getTitle()).isEqualTo("AI Engineer");
        assertThat(result.getLocation()).isEqualTo("Austin, Texas");
        assertThat(result.getAboutRole()).isEqualTo("I love the role");
        assertThat(result.getResponsibilities()).isEqualTo("Love your job");
        assertThat(result.getBonusQualifications()).isEqualTo("Background in CSAM detection, integrity engineering, or platform abuse.");
        assertThat(result.getRequirements()).isEqualTo("Genuine motivation to work on safety problems you care about why this work matters.");
        assertThat(result.getSalaryMin()).isEqualTo(150000);
        assertThat(result.getSalaryMax()).isEqualTo(300000);
        assertThat(result).usingRecursiveComparison().ignoringFields("teamName", "departmentName", "reqId", "salaryMin").isEqualTo(entity);

    }
}
