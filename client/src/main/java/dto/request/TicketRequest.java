package com.smartcampus.api.dto.request;

import com.smartcampus.api.enums.TicketPriority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.List;

@Data
public class TicketRequest {

    private String resourceId; // Optional
    private String location; // Optional but one of them should exist

    @NotBlank(message = "Category is required")
    private String category;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Priority is required")
    private TicketPriority priority;

    private String preferredContact;

    @Size(max = 3, message = "Maximum of 3 image URLs allowed")
    private List<String> imageUrls;
}
