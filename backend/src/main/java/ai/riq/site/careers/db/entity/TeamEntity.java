package ai.riq.site.careers.db.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "team")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class TeamEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //many teams belong to one department
    @ManyToOne(fetch = FetchType.LAZY)
    //specifies which table to join with.
    @JoinColumn(name = "department_id", nullable = false)
    private DepartmentEntity department;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String slug;
}
