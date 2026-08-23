package ai.riq.site.careers.db.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity //maps to db table
@Table(name = "department")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class DepartmentEntity {
    @Id
    //allows db to assign id automatically
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String slug;

    //does not have anything special, no @Colum needed.
    private String tagline;

    //columDefinition = text gives you unlimited text count.
    @Column(columnDefinition = "Text")
    private String description;
}
