package net.evrem.webapp.repository;

import net.evrem.webapp.domain.User;

import java.util.List;

/**
 * Created by T945051 on 31.5.2015.
 */
public interface UserRepository extends BaseRepository<User, Long> {
    User findByEmail(String email);
    List<User> findAll();
}
