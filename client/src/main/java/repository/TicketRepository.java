package com.smartcampus.api.repository;

import com.smartcampus.api.enums.TicketStatus;
import com.smartcampus.api.model.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {
    List<Ticket> findByCreatedBy(String createdBy);
    List<Ticket> findByStatus(TicketStatus status);
    List<Ticket> findByAssignedTechnicianId(String assignedTechnicianId);
}
