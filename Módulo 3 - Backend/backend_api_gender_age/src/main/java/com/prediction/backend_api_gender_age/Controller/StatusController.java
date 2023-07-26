package com.prediction.backend_api_gender_age.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class StatusController {
    @GetMapping("/")
    public String check() {
        String status = "hola mundo prueba balanceador";
        return status;
    }


}
