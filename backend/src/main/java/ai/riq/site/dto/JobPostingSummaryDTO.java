package ai.riq.site.dto;

import lombok.Builder;
import lombok.Getter;

//JOB POSTING WITHOUT DETAILS

@Getter
@Builder
public class JobPostingSummaryDTO {
    private Long id;
    private String title;
    private String location;
    private boolean remote;
}

