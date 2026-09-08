package ai.riq.site.careers.controller;

import ai.riq.site.careers.service.DepartmentService;
import ai.riq.site.dto.DepartmentDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

//LET'S FILE KNOW THIS IS A CONTROLLER
@RestController
//SHARED URL PREFIX - EVERYTHING LIVES UNDER CAREERS
@RequestMapping("/api/careers")
//GENERATES CONSTRUCTOR
@RequiredArgsConstructor
public class DepartmentController {

    private final DepartmentService departmentService;

    //GET = GET SOMETHING. HANDLES GET HTTP GET REQUEST.
    @GetMapping("/{slug}")
    //PATH VARIABLE -
    public DepartmentDTO getDepartmentBySlug(@PathVariable String slug) {
        return departmentService.getBySlug(slug);
    }

    @GetMapping
    public List<DepartmentDTO> getAllDepartments() {
        return departmentService.getAllDepartments();
    }


}
