package com.ddip.server.user.repository;

import com.ddip.server.user.domain.Users;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<Users, Long> {
    Optional<Users> findByEmail(String email);

    Optional<Users> findByNickname(String nickname);
}
