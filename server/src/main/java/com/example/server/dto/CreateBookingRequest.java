package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreateBookingRequest {
    
    @NotBlank(message = "Resource name is required")
    private String resourceName;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @NotNull(message = "Start time is required")
    @FutureOrPresent(message = "Start time must be in the future or present")
    private LocalDateTime startTime;
    
    @NotNull(message = "End time is required")
    @Future(message = "End time must be in the future")
    private LocalDateTime endTime;
    
    @NotBlank(message = "Booked by (person/department) is required")
    private String bookedBy;
    
    @NotBlank(message = "Purpose is required")
    private String purpose;
    
    private String notes;
    
    // Getters
    public String getResourceName() {
        return resourceName;
    }
    
    public String getLocation() {
        return location;
    }
    
    public LocalDateTime getStartTime() {
        return startTime;
    }
    
    public LocalDateTime getEndTime() {
        return endTime;
    }
    
    public String getBookedBy() {
        return bookedBy;
    }
    
    public String getPurpose() {
        return purpose;
    }
    
    public String getNotes() {
        return notes;
    }
    
    // Setters
    public void setResourceName(String resourceName) {
        this.resourceName = resourceName;
    }
    
    public void setLocation(String location) {
        this.location = location;
    }
    
    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }
    
    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }
    
    public void setBookedBy(String bookedBy) {
        this.bookedBy = bookedBy;
    }
    
    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}
