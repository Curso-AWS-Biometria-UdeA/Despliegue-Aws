package com.prediction.backend_api_gender_age.Controller.ProductionController;

import com.prediction.backend_api_gender_age.Models.RegisterMetadata;
import com.prediction.backend_api_gender_age.Models.UserVideo;
import com.prediction.backend_api_gender_age.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/register_login")
public class RegisterController {
    @Autowired
    UserRepository userRepository;

    @PostMapping(path = "/register")
    public String RegisterNewUser(@RequestParam String id_number, @RequestParam String type_id,
                                  @RequestParam String name, @RequestParam String last_name,
                                  @RequestParam String password, @RequestParam String email){
        String response = "";
        Boolean existUser = this.userRepository.existsById(id_number);

        if (existUser){
            response = "Usuario ya existente";
        }
        else{
            UserVideo userVideo = new UserVideo();
            userVideo.setIdNumber(id_number);
            userVideo.setName(name);
            userVideo.setLastName(last_name);
            userVideo.setTypeId(type_id);
            userVideo.setPassword(password);
            userVideo.setEmail(email);
            userRepository.save(userVideo);

            response = "Usuario guardado exitosamente";
        }

        return response;

    }

    @PostMapping(path = "/register_json")
    public String RegisterNewUserJSON(@RequestBody RegisterMetadata registerMetadata){
        String response = "";
        Boolean existUser = this.userRepository.existsById(registerMetadata.getIdNumber());

        if (existUser){
            response = "Usuario ya existente";
        }
        else{
            UserVideo userVideo = new UserVideo();
            userVideo.setIdNumber(registerMetadata.getIdNumber());
            userVideo.setName(registerMetadata.getName());
            userVideo.setLastName(registerMetadata.getLastName());
            userVideo.setTypeId(registerMetadata.getTypeId());
            userVideo.setPassword(registerMetadata.getPassword());
            userVideo.setEmail(registerMetadata.getEmail());
            userRepository.save(userVideo);

            response = "Usuario guardado exitosamente";
        }

        return response;

    }


    @PostMapping(path = "/login")
    public String LoginUser(@RequestParam String id_number, @RequestParam String password){
        String response = "";
        Boolean userValid = this.userRepository.existsByIdNumberAndPassword(id_number, password);

        if (userValid){
            response = "Ingreso exitoso";
        }
        else{
            response = "Ingreso no exitosa";
        }

        return response;

    }

}
