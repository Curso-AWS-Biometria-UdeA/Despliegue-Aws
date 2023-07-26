package com.prediction.backend_api_gender_age.Repository;

import com.prediction.backend_api_gender_age.Models.UserVideo;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends CrudRepository<UserVideo, String>{

    public Boolean existsByIdNumberAndPassword(String id_number, String password);

    @Query("select user from UserVideo user where user.idNumber = :idNumber  and user.password = :password")
    public UserVideo userByIdNumberAndPassword(@Param("idNumber") String idNumber, @Param("password")  String password);


}