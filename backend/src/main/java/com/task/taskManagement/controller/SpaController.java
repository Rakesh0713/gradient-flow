package com.task.taskManagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpaController {
    @GetMapping("/")
    public String landing() {
        return "landing";
    }

    @GetMapping("/dashboard")
    public String dashboard() {
        return "dashboard";
    }

    @GetMapping({"/{path:^(?!api|static|css|js|images).*$}", "/{path:^(?!api|static|css|js|images).*$}/**"})
    public String fallback() {
        return "landing";
    }
} 