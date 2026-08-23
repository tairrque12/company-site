package ai.riq.site.careers.db.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Entity
@Table(name = "job_posting")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPostingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id", nullable = false)
    //A job posting has a team
    private TeamEntity team;

    @Column(nullable = false)
    private String title;

    private String location;

    @Column( name = "job_type", nullable = false)
    private String jobType;

    @Column(name = "is_remote", nullable = false)
    private boolean remote;

    @Column(name = "req_id", unique = true)
    private String reqID;

    @Column(nullable = false)
    private boolean active;

    @Column(name = "posted_at", nullable = false)
    private Instant postedAt;

    @Column(name = "about_role", columnDefinition = "TEXT")
    private String aboutRole;

    @Column(columnDefinition = "TEXT")
    private String requirements;

    @Column(columnDefinition = "TEXT")
    private String responsibilities;

    @Column(name = "bonus_qualifications", columnDefinition = "TEXT")
    private String bonusQualifications;

    @Column(name = "salary_min")
    private Integer salaryMinimum;

    @Column(name = "salary_max")
    private Integer salaryMax;
}
