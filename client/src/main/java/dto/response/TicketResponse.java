package com.smartcampus.api.dto.response;

import com.smartcampus.api.enums.TicketPriority;
import com.smartcampus.api.enums.TicketStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class TicketResponse {
    private String id;
    private String resourceId;
    private String location;
    private String category;
    private String description;
    private TicketPriority priority;
    private String preferredContact;
    private List<String> imageUrls;
    private TicketStatus status;
    private String assignedTechnicianId;
    private String resolutionNotes;
    private String createdBy;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
