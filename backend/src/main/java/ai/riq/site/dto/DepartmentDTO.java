package ai.riq.site.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

/*
 The full response for GET /api/careers/{slug}.
 * Nests TeamDTO the same way TeamDTO nests JobPostingSummaryDTO — this is
 * a 3-level nested structure: Department -> Teams -> Job Postings, mirroring
 * exactly how the page is structured. One API call returns the whole page's
 * worth of data, already organized, instead of the frontend making several
 * calls and reassembling the pieces itself.
 */

@Getter
@Builder
public class DepartmentDTO {
    private String name;
    private String slug;
    private String tagline;
    private String description;
    private List<TeamDTO> teams;
}
