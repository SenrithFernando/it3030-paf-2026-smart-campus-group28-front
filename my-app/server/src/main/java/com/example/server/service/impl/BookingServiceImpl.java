package com.example.server.service.impl;

import com.example.server.dto.CreateBookingRequest;
import com.example.server.exceptions.BookingException;
import com.example.server.model.Booking;
import com.example.server.model.BookingStatus;
import com.example.server.repository.BookingRepository;
import com.example.server.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {
    
    private final BookingRepository bookingRepository;
    
    @Override
    public Booking createBooking(CreateBookingRequest request) {
        // Validate time slot
        if (!isTimeSlotAvailable(request.getResourceName(), request.getLocation(), 
                                  request.getStartTime(), request.getEndTime())) {
            throw new BookingException("Time slot is not available for this resource at this location");
        }
        
        // Validate end time is after start time
        if (request.getEndTime().isBefore(request.getStartTime())) {
            throw new BookingException("End time must be after start time");
        }
        
        Booking booking = Booking.builder()
            .resourceName(request.getResourceName())
            .location(request.getLocation())
            .startTime(request.getStartTime())
            .endTime(request.getEndTime())
            .bookedBy(request.getBookedBy())
            .purpose(request.getPurpose())
            .notes(request.getNotes())
            .build();
        
        return bookingRepository.save(booking);
    }
    
    @Override
    public Optional<Booking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }
    
    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    
    @Override
    public List<Booking> getBookingsByUser(String bookedBy) {
        return bookingRepository.findByBookedBy(bookedBy);
    }
    
    @Override
    public List<Booking> getBookingsByStatus(BookingStatus status) {
        return bookingRepository.findByStatus(status);
    }
    
    @Override
    public List<Booking> getBookingsByResource(String resourceName) {
        return bookingRepository.findByResourceName(resourceName);
    }
    
    @Override
    public List<Booking> getBookingsByLocation(String location) {
        return bookingRepository.findByLocation(location);
    }
    
    @Override
    public Booking updateBooking(Long id, CreateBookingRequest request) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new BookingException("Booking not found with id: " + id));
        
        if (booking.getStatus() == BookingStatus.CANCELLED) {
            throw new BookingException("Cannot update a cancelled booking");
        }
        
        // Validate new time slot if times are changed
        if (!booking.getStartTime().equals(request.getStartTime()) || 
            !booking.getEndTime().equals(request.getEndTime())) {
            if (!isTimeSlotAvailable(request.getResourceName(), request.getLocation(), 
                                      request.getStartTime(), request.getEndTime())) {
                throw new BookingException("New time slot is not available");
            }
        }
        
        booking.setResourceName(request.getResourceName());
        booking.setLocation(request.getLocation());
        booking.setStartTime(request.getStartTime());
        booking.setEndTime(request.getEndTime());
        booking.setBookedBy(request.getBookedBy());
        booking.setPurpose(request.getPurpose());
        booking.setNotes(request.getNotes());
        
        return bookingRepository.save(booking);
    }
    
    @Override
    public Booking updateBookingStatus(Long id, BookingStatus status) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new BookingException("Booking not found with id: " + id));
        
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
    
    @Override
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new BookingException("Booking not found with id: " + id));
        
        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }
    
    @Override
    public void deleteBooking(Long id) {
        if (!bookingRepository.existsById(id)) {
            throw new BookingException("Booking not found with id: " + id);
        }
        bookingRepository.deleteById(id);
    }
    
    @Override
    public boolean isTimeSlotAvailable(String resourceName, String location, 
                                       LocalDateTime startTime, LocalDateTime endTime) {
        List<Booking> conflictingBookings = bookingRepository.findConflictingBookings(
            resourceName, location, startTime, endTime);
        return conflictingBookings.isEmpty();
    }
}
