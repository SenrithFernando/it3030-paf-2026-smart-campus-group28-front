package com.example.server.service;

import com.example.server.dto.BookingDTO;
import com.example.server.dto.CreateBookingRequest;
import com.example.server.model.Booking;
import com.example.server.model.BookingStatus;
import java.util.List;
import java.util.Optional;

public interface BookingService {
    
    Booking createBooking(CreateBookingRequest request);
    
    Optional<Booking> getBookingById(Long id);
    
    List<Booking> getAllBookings();
    
    List<Booking> getBookingsByUser(String bookedBy);
    
    List<Booking> getBookingsByStatus(BookingStatus status);
    
    List<Booking> getBookingsByResource(String resourceName);
    
    List<Booking> getBookingsByLocation(String location);
    
    Booking updateBooking(Long id, CreateBookingRequest request);
    
    Booking updateBookingStatus(Long id, BookingStatus status);
    
    void cancelBooking(Long id);
    
    void deleteBooking(Long id);
    
    boolean isTimeSlotAvailable(String resourceName, String location, 
                                java.time.LocalDateTime startTime, java.time.LocalDateTime endTime);
}
