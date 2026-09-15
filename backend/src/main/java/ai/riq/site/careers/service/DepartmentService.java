package ai.riq.site.careers.service;

import ai.riq.site.careers.db.entity.DepartmentEntity;
import ai.riq.site.careers.db.repository.DepartmentRepository;
import ai.riq.site.careers.db.repository.JobPostingRepository;
import ai.riq.site.careers.db.repository.TeamRepository;
import ai.riq.site.dto.DepartmentDTO;
import ai.riq.site.dto.JobPostingSummaryDTO;
import ai.riq.site.dto.TeamDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
//GENERATES A CONSTRUCTOR, PASSES MOCK REPO IN.
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final TeamRepository teamRepository;
    private final JobPostingRepository jobPostingRepository;

    public DepartmentDTO getBySlug(String slug){
        DepartmentEntity entity = departmentRepository.findBySlug(slug).get();

        List<TeamDTO> teams = teamRepository.findByDepartmentId(entity.getId())
                .stream()
                .map(team -> {
                    List<JobPostingSummaryDTO> postings = jobPostingRepository.findByTeamId(team.getId())
                            .stream()
                            .map(posting -> JobPostingSummaryDTO.builder()
                                    .id(posting.getId())
                                    .title(posting.getTitle())
                                    .location(posting.getLocation())
                                    .remote(posting.isRemote())
                                    .build())
                            .toList();

                    return TeamDTO.builder()
                            .name(team.getName())
                            .slug(team.getSlug())
                            .jobPostings(postings)
                            .build();
                })
                .toList();

        //CREATES THE API SHAPED OBJECT OFF A DTO.
        return DepartmentDTO.builder()
                .name(entity.getName())
                .slug(entity.getSlug())
                .tagline(entity.getTagline())
                .description(entity.getDescription())
                .imageUrl(entity.getImageUrl())
                .teams(teams)
                .build();
    }
    public List<DepartmentDTO> getAllDepartments(){
        List<DepartmentEntity> entities = departmentRepository.findAll();
        return entities.stream()
                .map(entity -> DepartmentDTO.builder()
                        .name(entity.getName())
                        .slug(entity.getSlug())
                        .tagline(entity.getTagline())
                        .description(entity.getDescription())
                        .imageUrl(entity.getImageUrl())
                        .build())
                .toList();
    }
}