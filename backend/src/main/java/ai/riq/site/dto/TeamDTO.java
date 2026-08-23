package ai.riq.site.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TeamDTO {
    private Long id;
    private String name;
    private String slug;
    //NESTING- one team DTO holds many job postings inside of it.
    private List<JobPostingSummaryDTO> jobPostings;
}
