package com.smartcampus.api.dto.request;

import com.smartcampus.api.enums.TicketStatus;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TicketStatusUpdateRequest {
    @NotNull(message = "Status cannot be null")
    private TicketStatus status;
    
    private String assignedTechnicianId;
    
    private String resolutionNotes;
}
