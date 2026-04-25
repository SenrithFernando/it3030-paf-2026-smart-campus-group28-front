package com.smartcampus.api.controller;

import com.smartcampus.api.dto.request.CommentRequest;
import com.smartcampus.api.dto.response.ApiResponse;
import com.smartcampus.api.dto.response.CommentResponse;
import com.smartcampus.api.security.CustomUserDetails;
import com.smartcampus.api.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@RequiredArgsConstructor
@Tag(name = "Ticket Comments", description = "Endpoints for managing comments on tickets")
public class CommentController {

    private final CommentService commentService;

    @PostMapping("/ticket/{ticketId}")
    @Operation(summary = "Add a comment to a ticket")
    public ResponseEntity<ApiResponse<CommentResponse>> createComment(
            @PathVariable String ticketId,
            @Valid @RequestBody CommentRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {
        CommentResponse response = commentService.createComment(ticketId, userDetails.getUser().getId(), request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Comment added successfully", response));
    }

    @GetMapping("/ticket/{ticketId}")
    @Operation(summary = "Get all comments for a ticket")
    public ResponseEntity<ApiResponse<List<CommentResponse>>> getCommentsByTicketId(
            @PathVariable String ticketId) {
        List<CommentResponse> responses = commentService.getCommentsByTicketId(ticketId);
        return ResponseEntity.ok(ApiResponse.success("Comments fetched successfully", responses));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update a comment (Owner or Admin only)")
    public ResponseEntity<ApiResponse<CommentResponse>> updateComment(
            @PathVariable String id,
            @Valid @RequestBody CommentRequest request,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        CommentResponse response = commentService.updateComment(id, userDetails.getUser().getId(), isAdmin, request);
        return ResponseEntity.ok(ApiResponse.success("Comment updated successfully", response));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete a comment (Owner or Admin only)")
    public ResponseEntity<ApiResponse<Void>> deleteComment(
            @PathVariable String id,
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        boolean isAdmin = userDetails.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN"));

        commentService.deleteComment(id, userDetails.getUser().getId(), isAdmin);
        return ResponseEntity.ok(ApiResponse.success("Comment deleted successfully", null));
    }
}
