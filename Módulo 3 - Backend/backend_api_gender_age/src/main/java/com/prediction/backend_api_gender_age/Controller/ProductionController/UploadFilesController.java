package com.prediction.backend_api_gender_age.Controller.ProductionController;

import com.prediction.backend_api_gender_age.Models.GenderAgeObject;
import com.prediction.backend_api_gender_age.Models.UserVideo;
import com.prediction.backend_api_gender_age.Models.VideoFile;
import com.prediction.backend_api_gender_age.Repository.UserRepository;
import com.prediction.backend_api_gender_age.Repository.VideoFileRepository;
import com.prediction.backend_api_gender_age.Services.BiometricService;
import com.prediction.backend_api_gender_age.Services.FileProcessingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;

@RestController
public class UploadFilesController {
    @Autowired
    FileProcessingService fileProcessingService;
    @Autowired
    UserRepository userRepository;
    @Autowired
    VideoFileRepository videoFileRepository;
    @Autowired
    BiometricService biometricService;

    @PostMapping(path= "/upload_video")
    public GenderAgeObject UploadVideoFile(@RequestParam("id_number") String idNumber, @RequestParam("file") MultipartFile video) throws Exception {

        GenderAgeObject genderAgeObject = new GenderAgeObject();
        UserVideo userVideo = this.userRepository.findById(idNumber).get();

        Integer videosNumber = userVideo.getVideoFileList().size();

        if (video == null || video.isEmpty()) {
            return genderAgeObject;
        }

        StringBuilder builder = new StringBuilder();
        builder.append("./data");
        builder.append(File.separator + idNumber);

        String path_dir = fileProcessingService.SaveFile(builder.toString(), video, String.valueOf(videosNumber+1));

        VideoFile videoFile = new VideoFile();
        videoFile.setUserVideo(userVideo);
        videoFile.setPathVideo("/efs/age_gender"+path_dir.substring(1));

        videoFile = biometricService.GenderAgePrediction(videoFile);


        videoFileRepository.save(videoFile);

        genderAgeObject.setAge(videoFile.getAgePrediction());
        genderAgeObject.setGender(videoFile.getGenderPrediction());


        return genderAgeObject;


    }

}
