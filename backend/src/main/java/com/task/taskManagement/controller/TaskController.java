package com.task.taskManagement.controller;

import com.task.taskManagement.model.Task;
import com.task.taskManagement.model.Task.Priority;
import com.task.taskManagement.repository.TaskRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/task")
public class TaskController {

    @Autowired
    private TaskRepository taskRepo;

    @GetMapping("/list")
    public List<Task> getTasks(HttpSession session) {
        String userEmail = (String) session.getAttribute("username");
        return taskRepo.findByUserEmail(userEmail);
    }

    @PostMapping("/add")
    public Map<String, Object> addTask(@RequestBody Task task, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        task.setUserEmail((String) session.getAttribute("username"));
        task.setStatus("pending");
        taskRepo.save(task);
        response.put("success", true);
        response.put("message", "Task added successfully.");
        return response;
    }

    @PutMapping("/update/{id}")
    public Map<String, Object> updateTask(@PathVariable Integer id, @RequestBody Map<String, String> updates) {
        Map<String, Object> response = new HashMap<>();
        Task task = taskRepo.findById(id).orElse(null);
        if (task != null) {
            if (updates.containsKey("status")) task.setStatus(updates.get("status"));
            if (updates.containsKey("title")) task.setTitle(updates.get("title"));
            if (updates.containsKey("description")) task.setDescription(updates.get("description"));
            if (updates.containsKey("priority")) task.setPriority(Priority.valueOf(updates.get("priority").toUpperCase()));
            taskRepo.save(task);
            response.put("success", true);
            response.put("message", "Task updated successfully.");
        } else {
            response.put("success", false);
            response.put("error", "Task not found.");
        }
        return response;
    }

    @DeleteMapping("/delete/{id}")
    public Map<String, Object> deleteTask(@PathVariable Integer id) {
        Map<String, Object> response = new HashMap<>();
        if (taskRepo.existsById(id)) {
            taskRepo.deleteById(id);
            response.put("success", true);
            response.put("message", "Task deleted successfully.");
        } else {
            response.put("success", false);
            response.put("error", "Task not found.");
        }
        return response;
    }
}
