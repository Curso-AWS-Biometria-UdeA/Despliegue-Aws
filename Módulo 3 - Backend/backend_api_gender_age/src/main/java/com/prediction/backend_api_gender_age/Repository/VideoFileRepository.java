package com.prediction.backend_api_gender_age.Repository;

import com.prediction.backend_api_gender_age.Models.VideoFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

public interface VideoFileRepository extends CrudRepository<VideoFile, Integer> {

}