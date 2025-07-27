package com.task.taskManagement.controller;

import java.util.List;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.task.taskManagement.model.User;
import com.task.taskManagement.repository.UserRepository;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    UserRepository urepo;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @GetMapping("/current")
    public Map<String, Object> getCurrentUser(HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        String email = (String) session.getAttribute("username");
        
        if (email != null) {
            List<User> users = urepo.findByEMAIL(email);
            if (!users.isEmpty()) {
                response.put("success", true);
                response.put("user", users.get(0));
            } else {
                response.put("success", false);
                response.put("error", "User not found");
            }
        } else {
            response.put("success", false);
            response.put("error", "Not logged in");
        }
        
        return response;
    }

    @PostMapping("/signup")
    public Map<String, Object> signup(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();
        List<User> list = urepo.findByEMAIL(user.getUser_email());
        if (!list.isEmpty()) {
            response.put("success", false);
            response.put("error", "User already exists.");
        } else {
            user.setUser_pass(passwordEncoder.encode(user.getUser_pass()));
            urepo.save(user);
            response.put("success", true);
            response.put("message", "User registered successfully.");
        }
        return response;
    }

    @PostMapping("/login")
    public Map<String, Object> login_user(@RequestBody Map<String, String> loginData, HttpSession session) {
        Map<String, Object> response = new HashMap<>();
        String email = loginData.get("email");
        String password = loginData.get("password");
        List<User> users = urepo.findByEMAIL(email);
        if (!users.isEmpty() && passwordEncoder.matches(password, users.get(0).getUser_pass())) {
            session.setAttribute("username", email);
            response.put("success", true);
            response.put("message", "Login successful.");
        } else {
            response.put("success", false);
            response.put("error", "Invalid credentials.");
        }
        return response;
    }

    @PostMapping("/logout")
    public Map<String, Object> logout_user(HttpSession session) {
        session.invalidate();
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Logged out successfully.");
        return response;
    }
}