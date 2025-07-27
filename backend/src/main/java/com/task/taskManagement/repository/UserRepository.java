package com.task.taskManagement.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.task.taskManagement.model.User;

public interface UserRepository extends JpaRepository<User, Integer> {
    @Query("from User where user_email=?1")
    List<User> findByEMAIL(String email);

    @Query("from User where user_email=?1 and user_pass=?2")
    User findByUsernamePassword(String username, String password);
}

