package ai.riq.site.dto;

import lombok.*;

// REQUEST DTO - A CONTAINER FOR THE INFORMATION THE USER SUBMITTED.
// THE BROWSER SENDS JSON, THE BACKEND TURNS IT INTO A JOB REQUEST DTO.

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
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

// NO ID, RESUME PATH OR SUBMITTED AT.
// THE SERVER CONTROLS ALL THREE.