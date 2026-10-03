
package ai.riq.site.careers.controller;

import ai.riq.site.careers.service.JobApplicationService;
import ai.riq.site.dto.JobApplicationRequestDTO;
import ai.riq.site.dto.JobApplicationResponseDTO;

import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/job-applications")
public class JobApplicationController {

    private final JobApplicationService jobApplicationService;

    @PostMapping
    public ResponseEntity<JobApplicationResponseDTO> createApplication(
            @RequestBody JobApplicationRequestDTO requestDTO
    ) {

        // 1. Delegate the application submission to the service
        JobApplicationResponseDTO response =
                jobApplicationService.save(requestDTO);

        // 2. Return HTTP 201 CREATED with the saved application response
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }
}
