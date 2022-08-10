package com.RestApi.TeachAid.repo;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.RestApi.TeachAid.model.DAOUser;

@Repository
public interface UserDao extends CrudRepository<DAOUser, Integer> {

  DAOUser findByUsername(String username);

}
