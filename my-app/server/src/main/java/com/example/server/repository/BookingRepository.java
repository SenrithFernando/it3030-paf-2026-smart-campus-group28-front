package com.example.server.repository;

import com.example.server.model.Booking;
import com.example.server.model.BookingStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    
    List<Booking> findByBookedBy(String bookedBy);
    
    List<Booking> findByStatus(BookingStatus status);
    
    List<Booking> findByResourceName(String resourceName);
    
    List<Booking> findByLocation(String location);
    
    @Query("SELECT b FROM Booking b WHERE b.resourceName = :resourceName AND b.location = :location " +
           "AND NOT (b.endTime <= :startTime OR b.startTime >= :endTime) AND b.status != 'CANCELLED'")
    List<Booking> findConflictingBookings(
        @Param("resourceName") String resourceName,
        @Param("location") String location,
        @Param("startTime") LocalDateTime startTime,
        @Param("endTime") LocalDateTime endTime
    );
    
    List<Booking> findByStartTimeGreaterThanAndStatusNot(LocalDateTime startTime, BookingStatus status);
}
