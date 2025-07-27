package com.task.taskManagement.repository;

import com.task.taskManagement.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByUserEmail(String userEmail);
}
