package com.smartcampus.api.model;

import com.smartcampus.api.enums.TicketPriority;
import com.smartcampus.api.enums.TicketStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "tickets")
public class Ticket {

    @Id
    private String id;
    
    private String resourceId; // Can be null if it's purely location based
    
    private String location; // Fallback if resourceId is null
    
    private String category; // e.g. PLUMBING, ELECTRICAL, IT, CLEANING
    
    private String description;
    
    private TicketPriority priority;
    
    private String preferredContact;
    
    private List<String> imageUrls;
    
    private TicketStatus status;
    
    private String assignedTechnicianId;
    
    private String resolutionNotes;
    
    private String createdBy;

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;
}
