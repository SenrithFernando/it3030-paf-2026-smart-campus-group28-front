package com.smartcampus.api.service;

import com.smartcampus.api.dto.request.TicketRequest;
import com.smartcampus.api.dto.request.TicketStatusUpdateRequest;
import com.smartcampus.api.dto.response.TicketResponse;
import com.smartcampus.api.enums.TicketStatus;

import java.util.List;

public interface TicketService {
    TicketResponse createTicket(String userId, TicketRequest request);
    TicketResponse getTicketById(String id);
    List<TicketResponse> getUserTickets(String userId);
    List<TicketResponse> getAllTickets(TicketStatus status);
    TicketResponse updateTicketStatus(String id, TicketStatusUpdateRequest request);
}
