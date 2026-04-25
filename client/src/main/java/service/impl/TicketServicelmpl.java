package com.smartcampus.api.service.impl;

import com.smartcampus.api.dto.request.TicketRequest;
import com.smartcampus.api.dto.request.TicketStatusUpdateRequest;
import com.smartcampus.api.dto.response.TicketResponse;
import com.smartcampus.api.enums.NotificationType;
import com.smartcampus.api.enums.TicketStatus;
import com.smartcampus.api.exception.BadRequestException;
import com.smartcampus.api.exception.ResourceNotFoundException;
import com.smartcampus.api.model.Ticket;
import com.smartcampus.api.repository.TicketRepository;
import com.smartcampus.api.service.NotificationService;
import com.smartcampus.api.service.TicketService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements TicketService {

    private final TicketRepository ticketRepository;
    private final NotificationService notificationService;

    @Override
    public TicketResponse createTicket(String userId, TicketRequest request) {
        if (request.getResourceId() == null && request.getLocation() == null) {
            throw new BadRequestException("Either resourceId or location must be provided.");
        }

        Ticket ticket = Ticket.builder()
                .resourceId(request.getResourceId())
                .location(request.getLocation())
                .category(request.getCategory())
                .description(request.getDescription())
                .priority(request.getPriority())
                .preferredContact(request.getPreferredContact())
                .imageUrls(request.getImageUrls())
                .status(TicketStatus.OPEN)
                .createdBy(userId)
                .build();

        Ticket saved = ticketRepository.save(ticket);
        return mapToResponse(saved);
    }

    @Override
    public TicketResponse getTicketById(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found."));
        return mapToResponse(ticket);
    }

    @Override
    public List<TicketResponse> getUserTickets(String userId) {
        return ticketRepository.findByCreatedBy(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<TicketResponse> getAllTickets(TicketStatus status) {
        List<Ticket> tickets = (status != null) 
            ? ticketRepository.findByStatus(status) 
            : ticketRepository.findAll();
            
        return tickets.stream().map(this::mapToResponse).collect(Collectors.toList());
    }

    @Override
    public TicketResponse updateTicketStatus(String id, TicketStatusUpdateRequest request) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Ticket not found."));

        TicketStatus oldStatus = ticket.getStatus();
        
        ticket.setStatus(request.getStatus());
        if (request.getAssignedTechnicianId() != null) {
            ticket.setAssignedTechnicianId(request.getAssignedTechnicianId());
        }
        if (request.getResolutionNotes() != null) {
            ticket.setResolutionNotes(request.getResolutionNotes());
        }
        ticket.setUpdatedAt(LocalDateTime.now());

        Ticket updated = ticketRepository.save(ticket);

        // Notify user if status changed
        if (oldStatus != updated.getStatus()) {
            String title = "Ticket Status Updated";
            String message = "Your ticket (" + ticket.getId() + ") status has been updated to " + updated.getStatus().name();
            notificationService.createNotification(ticket.getCreatedBy(), NotificationType.TICKET_UPDATE, title, message);
        }

        return mapToResponse(updated);
    }

    private TicketResponse mapToResponse(Ticket ticket) {
        return TicketResponse.builder()
                .id(ticket.getId())
                .resourceId(ticket.getResourceId())
                .location(ticket.getLocation())
                .category(ticket.getCategory())
                .description(ticket.getDescription())
                .priority(ticket.getPriority())
                .preferredContact(ticket.getPreferredContact())
                .imageUrls(ticket.getImageUrls())
                .status(ticket.getStatus())
                .assignedTechnicianId(ticket.getAssignedTechnicianId())
                .resolutionNotes(ticket.getResolutionNotes())
                .createdBy(ticket.getCreatedBy())
                .createdAt(ticket.getCreatedAt())
                .updatedAt(ticket.getUpdatedAt())
                .build();
    }
}
