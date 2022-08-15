package com.RestApi.TeachAid.Repos;

import com.RestApi.TeachAid.model.ERole;
import com.RestApi.TeachAid.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepo extends JpaRepository<Role, Long> {
    Optional<Role> findByName(ERole name);
}
