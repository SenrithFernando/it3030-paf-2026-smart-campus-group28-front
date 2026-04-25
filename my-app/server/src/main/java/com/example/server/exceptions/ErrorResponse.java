package com.example.server.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.Map;

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ErrorResponse {
    private String message;
    private int status;
    private LocalDateTime timestamp;
    private String path;
    private Map<String, String> validationErrors;
    
    // Getters
    public String getMessage() {
        return message;
    }
    
    public int getStatus() {
        return status;
    }
    
    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    
    public String getPath() {
        return path;
    }
    
    public Map<String, String> getValidationErrors() {
        return validationErrors;
    }
    
    // Setters
    public void setMessage(String message) {
        this.message = message;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }
    
    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
    
    public void setPath(String path) {
        this.path = path;
    }
    
    public void setValidationErrors(Map<String, String> validationErrors) {
        this.validationErrors = validationErrors;
    }
}
