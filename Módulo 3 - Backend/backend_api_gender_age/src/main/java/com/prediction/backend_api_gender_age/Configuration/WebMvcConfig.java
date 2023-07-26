package com.prediction.backend_api_gender_age.Configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;


/**
 * Clase que permite configurar el acceso a los servlets. En este caso se usa para
 * leer del paquete principal, configurar los CORS locales y gestionar el archivo
 * de configuración por defecto (application.properties).
 *
 * @author Edward Nicolas Montoya Arcila
 * @version 0.0.1
 * @since JDK 1.8
 */
@Configuration
@ComponentScan(basePackages = "com.prediction")
@PropertySource("classpath:application.properties")
@EnableWebMvc
public class WebMvcConfig implements WebMvcConfigurer {
    /**
     * Define los servidores desde los cuales es posible generar peticiones
     * Esta configuración solo estará activa en el ambiente de desarrollo
     *
     * @param   registry
     *          Registro para gestionar los CORS
     */


	@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedHeaders("*")
        .allowedOrigins("http://localhost:3000",
                        "http://s3-curso-aws-prueba.s3-website-us-east-1.amazonaws.com",
                        "http://bucket-curso-age-gender.s3-website-us-east-1.amazonaws.com"
        //                "http://keystroke-bucket.s3-website-us-east-1.amazonaws.com"
        )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS");
	    }

}