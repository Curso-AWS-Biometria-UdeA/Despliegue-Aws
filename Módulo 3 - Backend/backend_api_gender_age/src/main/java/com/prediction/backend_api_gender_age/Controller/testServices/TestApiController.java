package com.prediction.backend_api_gender_age.Controller.testServices;

import com.prediction.backend_api_gender_age.Models.UserVideo;
import com.prediction.backend_api_gender_age.Models.VideoFile;
import com.prediction.backend_api_gender_age.Repository.UserRepository;
import com.prediction.backend_api_gender_age.Repository.VideoFileRepository;
import com.prediction.backend_api_gender_age.Services.RequestMethodsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

@RestController
public class TestApiController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private VideoFileRepository videoFileRepository;
    @Autowired
    RequestMethodsService requestMethodsService;

    @PostMapping(path = "/test_register")
    public String TestRegisterUser(@RequestParam String idNumber){
        UserVideo userVideo = new UserVideo();

        userVideo.setName("Daniel");
        userVideo.setEmail("dangrisales@gmail.com");
        userVideo.setIdNumber(idNumber);
        userVideo.setPassword("123456");
        userVideo.setLastName("Escobar");
        userRepository.save(userVideo);

        return "Usuario creado";
    }

    @GetMapping(path = "/test_upload_video")
    public String TestUploadVideo(){
        VideoFile videoFile = new VideoFile();
        UserVideo userVideo = userRepository.findById("1022396989").get();

        videoFile.setPathVideo("/efs/1022396989/");
        videoFile.setUserVideo(userVideo);
        videoFileRepository.save(videoFile);
        return "Video almacenado";

    }

    @GetMapping(path = "/check_service_docker")
    public String CheckServiceDocker() throws Exception {

        VideoFile videoFile = this.videoFileRepository.findById(5).get();

        String response = "";
        try{
            response = requestMethodsService.peticionHttpGet("http://44.210.78.42/path=L2Vmcy90ZXN0LndlYm0=");
        }
        catch (Exception e){
            e.printStackTrace();
        }

        HashMap<String, String> map = (HashMap<String, String>) Arrays.asList(response.split(",")).stream().map(s -> s.split(":")).collect(Collectors.toMap(e -> e[0], e -> e[1]));

        List<String> response_list = new ArrayList<>(map.values());

        String comillas = String.valueOf(response_list.get(0).charAt(0));
        String gender = response_list.get(0).split(comillas)[1];
        String status = response_list.get(1).split(comillas)[1];
        String age = response_list.get(2);


        videoFile.setAgePrediction(27);
        videoFile.setGenderPrediction(gender);

        videoFileRepository.save(videoFile);


        return gender;

    }

}
