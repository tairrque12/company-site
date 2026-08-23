package ai.riq.site.dto;

import lombok.Builder;
import lombok.Getter;

//THIS IS INFO THAT MY CLIENT WILL GET BACK IN RESPONSE TO SUBMITTING APPLICATION

@Getter
@Builder
public class JobApplicationResponseDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String jobPostingTitle;
    private String departmentName;
    private String submittedAt;
}
