package com.RestApi.TeachAid.controller;

import com.RestApi.TeachAid.Repos.RoleRepo;
import com.RestApi.TeachAid.Repos.UserRepo;
import com.RestApi.TeachAid.model.ERole;
import com.RestApi.TeachAid.model.Role;
import com.RestApi.TeachAid.model.User;
import com.RestApi.TeachAid.payload.request.LoginRequest;
import com.RestApi.TeachAid.payload.request.RegisterRequest;
import com.RestApi.TeachAid.payload.response.JwtResponse;
import com.RestApi.TeachAid.payload.response.MessageResponse;
import com.RestApi.TeachAid.security.jwt.Utils.JwtUtils;
import com.RestApi.TeachAid.security.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthController {
  @Autowired AuthenticationManager authenticationManager;
  @Autowired UserRepo userRepository;
  @Autowired RoleRepo roleRepository;
  @Autowired PasswordEncoder encoder;
  @Autowired JwtUtils jwtUtils;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
    Authentication authentication =
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                loginRequest.getUsername(), loginRequest.getPassword()));
    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = jwtUtils.generateJwtToken(authentication);
    UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
    List<String> roles =
        userDetails.getAuthorities().stream()
            .map(item -> item.getAuthority())
            .collect(Collectors.toList());
    return ResponseEntity.ok(
        new JwtResponse(
            jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getEmail(), roles));
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
    if (userRepository.existsByUsername(registerRequest.getUsername())) {
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error: Username is already taken!"));
    }
    if (userRepository.existsByEmail(registerRequest.getEmail())) {
      return ResponseEntity.badRequest()
          .body(new MessageResponse("Error: Email is already in use!"));
    }
    User user =
        new User(
            registerRequest.getUsername(),
            registerRequest.getEmail(),
            encoder.encode(registerRequest.getPassword()));
    Set<String> strRoles = registerRequest.getRole();
    Set<Role> roles = new HashSet<>();
    if (strRoles == null) {
      Role userRole =
          roleRepository
              .findByName(ERole.ROLE_USER)
              .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
      roles.add(userRole);
    } else {
      strRoles.forEach(
          role -> {
            switch (role) {
              case "admin":
                Role adminRole =
                    roleRepository
                        .findByName(ERole.ROLE_ADMIN)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(adminRole);
                break;
              default:
                Role userRole =
                    roleRepository
                        .findByName(ERole.ROLE_USER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            }
          });
    }
    user.setRoles(roles);
    userRepository.save(user);
    return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
  }
}
