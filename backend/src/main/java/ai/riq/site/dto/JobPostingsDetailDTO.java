package ai.riq.site.dto;


import lombok.Builder;
import lombok.Getter;

//FULL JD DTO

@Getter
@Builder
public class JobPostingsDetailDTO {
    private Long id;
    private String title;
    private String location;
    private String jobType;
    private String reqId;
    private String aboutRole;
    private String responsibilities;
    private String requirements;
    private String bonusQualifications;
    private Integer salaryMin;
    private Integer salaryMax;
    private String teamName;
    private String departmentName;

}
