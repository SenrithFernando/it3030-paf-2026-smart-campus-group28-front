package com.smartcampus.api.controller;

import com.smartcampus.api.dto.request.TicketRequest;
import com.smartcampus.api.dto.request.TicketStatusUpdateRequest;
import com.smartcampus.api.dto.response.ApiResponse;
import com.smartcampus.api.dto.response.TicketResponse;
import com.smartcampus.api.enums.TicketStatus;
import com.smartcampus.api.security.CustomUserDetails;
import com.smartcampus.api.service.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tickets")
@RequiredArgsConstructor
@Tag(name = "Maintenance & Incident Ticketing", description = "Endpoints for managing maintenance tickets")
public class TicketController {

    private final TicketService ticketService;

    @PostMapping
    @Operation(summary = "Create a new ticket")
    public ResponseEntity<ApiResponse<TicketResponse>> createTicket(
            @Valid @RequestBody TicketRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        TicketResponse response = ticketService.createTicket(userDetails.getUser().getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Ticket created successfully", response));
    }

    @GetMapping("/my-tickets")
    @Operation(summary = "Get tickets created by the authenticated user")
    public ResponseEntity<ApiResponse<List<TicketResponse>>> getMyTickets(
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        List<TicketResponse> responses = ticketService.getUserTickets(userDetails.getUser().getId());
        return ResponseEntity.ok(ApiResponse.success("Tickets fetched successfully", responses));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get a specific ticket by ID")
    public ResponseEntity<ApiResponse<TicketResponse>> getTicket(@PathVariable String id) {
        TicketResponse response = ticketService.getTicketById(id);
        return ResponseEntity.ok(ApiResponse.success("Ticket fetched successfully", response));
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    @Operation(summary = "Get all tickets (Admin/Technician only)")
    public ResponseEntity<ApiResponse<List<TicketResponse>>> getAllTickets(
            @RequestParam(required = false) TicketStatus status) {
        List<TicketResponse> responses = ticketService.getAllTickets(status);
        return ResponseEntity.ok(ApiResponse.success("All tickets fetched successfully", responses));
    }

    @PatchMapping("/{id}/status")
    @PreAuthorize("hasAnyRole('ADMIN', 'TECHNICIAN')")
    @Operation(summary = "Update ticket status (Admin/Technician only)")
    public ResponseEntity<ApiResponse<TicketResponse>> updateTicketStatus(
            @PathVariable String id,
            @Valid @RequestBody TicketStatusUpdateRequest request) {
        TicketResponse response = ticketService.updateTicketStatus(id, request);
        return ResponseEntity.ok(ApiResponse.success("Ticket status updated", response));
    }
}
