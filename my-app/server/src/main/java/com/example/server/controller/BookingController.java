package com.example.server.controller;

import com.example.server.dto.BookingDTO;
import com.example.server.dto.CreateBookingRequest;
import com.example.server.model.Booking;
import com.example.server.model.BookingStatus;
import com.example.server.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
@Tag(name = "Bookings", description = "APIs for managing bookings")
public class BookingController {
    
    private final BookingService bookingService;
    
    @GetMapping
    @Operation(summary = "Get all bookings", description = "Retrieve all bookings from the system")
    @ApiResponse(responseCode = "200", description = "Successfully retrieved all bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        List<Booking> bookings = bookingService.getAllBookings();
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get booking by ID", description = "Retrieve a specific booking by its ID")
    @ApiResponse(responseCode = "200", description = "Booking found")
    @ApiResponse(responseCode = "404", description = "Booking not found")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long id) {
        return bookingService.getBookingById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    @Operation(summary = "Create a new booking", description = "Create a new booking for a resource")
    @ApiResponse(responseCode = "201", description = "Booking created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid request data")
    public ResponseEntity<Booking> createBooking(@Valid @RequestBody CreateBookingRequest request) {
        Booking booking = bookingService.createBooking(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(booking);
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update a booking", description = "Update an existing booking")
    @ApiResponse(responseCode = "200", description = "Booking updated successfully")
    @ApiResponse(responseCode = "404", description = "Booking not found")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long id, 
                                                  @Valid @RequestBody CreateBookingRequest request) {
        Booking updatedBooking = bookingService.updateBooking(id, request);
        return ResponseEntity.ok(updatedBooking);
    }
    
    @PatchMapping("/{id}/status")
    @Operation(summary = "Update booking status", description = "Update the status of an existing booking")
    @ApiResponse(responseCode = "200", description = "Status updated successfully")
    public ResponseEntity<Booking> updateBookingStatus(@PathVariable Long id,
                                                        @RequestParam BookingStatus status) {
        Booking updatedBooking = bookingService.updateBookingStatus(id, status);
        return ResponseEntity.ok(updatedBooking);
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a booking", description = "Delete a booking by its ID")
    @ApiResponse(responseCode = "204", description = "Booking deleted successfully")
    public ResponseEntity<Void> deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
        return ResponseEntity.noContent().build();
    }
    
    @PostMapping("/{id}/cancel")
    @Operation(summary = "Cancel a booking", description = "Cancel an existing booking")
    @ApiResponse(responseCode = "200", description = "Booking cancelled successfully")
    public ResponseEntity<Booking> cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return bookingService.getBookingById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/user/{bookedBy}")
    @Operation(summary = "Get bookings by user", description = "Retrieve all bookings made by a specific user")
    public ResponseEntity<List<Booking>> getBookingsByUser(@PathVariable String bookedBy) {
        List<Booking> bookings = bookingService.getBookingsByUser(bookedBy);
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/status/{status}")
    @Operation(summary = "Get bookings by status", description = "Retrieve all bookings with a specific status")
    public ResponseEntity<List<Booking>> getBookingsByStatus(@PathVariable BookingStatus status) {
        List<Booking> bookings = bookingService.getBookingsByStatus(status);
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/resource/{resourceName}")
    @Operation(summary = "Get bookings by resource", description = "Retrieve all bookings for a specific resource")
    public ResponseEntity<List<Booking>> getBookingsByResource(@PathVariable String resourceName) {
        List<Booking> bookings = bookingService.getBookingsByResource(resourceName);
        return ResponseEntity.ok(bookings);
    }
    
    @GetMapping("/location/{location}")
    @Operation(summary = "Get bookings by location", description = "Retrieve all bookings at a specific location")
    public ResponseEntity<List<Booking>> getBookingsByLocation(@PathVariable String location) {
        List<Booking> bookings = bookingService.getBookingsByLocation(location);
        return ResponseEntity.ok(bookings);
    }
}
