package com.prediction.backend_api_gender_age.Services;

import com.prediction.backend_api_gender_age.Models.VideoFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BiometricService {
    @Autowired
    RequestMethodsService requestMethodsService;
    public VideoFile GenderAgePrediction(VideoFile videoFile) throws Exception {

        String encodedPath = Base64.getEncoder().encodeToString(videoFile.getPathVideo().getBytes());

        String response = "";
        try{
            //response = requestMethodsService.peticionHttpGet("http://44.210.78.42/path=L2Vmcy90ZXN0LndlYm0=");
            response = requestMethodsService.peticionHttpGet("http://44.210.78.42/path="+encodedPath);
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

        videoFile.setGenderPrediction(gender);
        videoFile.setAgePrediction((int) Float.parseFloat(age));




        return videoFile;

    }

}
