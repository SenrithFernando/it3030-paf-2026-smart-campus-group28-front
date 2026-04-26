package com.example.server.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookingDTO {
    
    private Long id;
    
    @NotBlank(message = "Resource name is required")
    private String resourceName;
    
    @NotBlank(message = "Location is required")
    private String location;
    
    @NotNull(message = "Start time is required")
    private LocalDateTime startTime;
    
    @NotNull(message = "End time is required")
    private LocalDateTime endTime;
    
    @NotBlank(message = "Booked by (person/department) is required")
    private String bookedBy;
    
    @NotBlank(message = "Purpose is required")
    private String purpose;
    
    private String status;
    
    private LocalDateTime createdAt;
    
    private LocalDateTime updatedAt;
    
    private String notes;
}
