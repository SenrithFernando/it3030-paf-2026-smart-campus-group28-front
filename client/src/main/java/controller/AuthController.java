package com.smartcampus.api.controller;

import com.smartcampus.api.dto.request.AuthRequest;
import com.smartcampus.api.dto.request.RegisterRequest;
import com.smartcampus.api.dto.response.ApiResponse;
import com.smartcampus.api.dto.response.AuthResponse;
import com.smartcampus.api.enums.Role;
import com.smartcampus.api.exception.BadRequestException;
import com.smartcampus.api.model.User;
import com.smartcampus.api.repository.UserRepository;
import com.smartcampus.api.security.CustomUserDetails;
import com.smartcampus.api.security.JwtUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for registering and authenticating users")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ResponseEntity<ApiResponse<AuthResponse>> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            throw new BadRequestException("Error: Email is already in use!");
        }

        // Create new user's account
        User user = User.builder()
                .name(signUpRequest.getName())
                .email(signUpRequest.getEmail())
                .password(passwordEncoder.encode(signUpRequest.getPassword()))
                .role(signUpRequest.getRole() != null ? signUpRequest.getRole() : Role.USER)
                .build();

        userRepository.save(user);

        // Authenticate immediately after registration
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(signUpRequest.getEmail(), signUpRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        AuthResponse authResponse = AuthResponse.builder()
                .token(jwt)
                .id(userDetails.getUser().getId())
                .name(userDetails.getUser().getName())
                .email(userDetails.getUsername())
                .role(userDetails.getUser().getRole())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("User registered successfully", authResponse));
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate a user and get a JWT")
    public ResponseEntity<ApiResponse<AuthResponse>> authenticateUser(@Valid @RequestBody AuthRequest loginRequest) {

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();

        AuthResponse authResponse = AuthResponse.builder()
                .token(jwt)
                .id(userDetails.getUser().getId())
                .name(userDetails.getUser().getName())
                .email(userDetails.getUsername())
                .role(userDetails.getUser().getRole())
                .build();

        return ResponseEntity.ok(ApiResponse.success("User authenticated successfully", authResponse));
    }
}
