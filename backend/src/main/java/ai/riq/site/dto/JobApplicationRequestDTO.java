package ai.riq.site.dto;

import lombok.Builder;
import lombok.Getter;

//REQUEST DTO = CLIENT PROVIDES THIS INFO.

@Getter
@Builder
public class JobApplicationRequestDTO {
    private Long jobPostingId;
    private String firstName;
    private String lastName;
    private String preferredFirstName;
    private String email;
    private String country;
    private String phone;
    private String city;
    private String linkedinUrl;
    private String websiteUrl;

}
// NO ID, RESUME-PATH OR SUBMITTED AT, SERVER CONTROLS ALL 3
