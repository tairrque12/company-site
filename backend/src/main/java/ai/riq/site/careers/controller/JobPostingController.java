package ai.riq.site.careers.controller;

import ai.riq.site.careers.service.JobPostingService;
import ai.riq.site.dto.JobPostingsDetailDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/careers/jobs/")
@RequiredArgsConstructor
public class JobPostingController {

    private final JobPostingService jobPostingService;
    //HANDLES GET HTTP REQUEST
    @GetMapping("/{id}")
    public JobPostingsDetailDTO getById(@PathVariable Long id){
       return jobPostingService.getById(id);
    }

}
