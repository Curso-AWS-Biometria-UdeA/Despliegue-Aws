package com.prediction.backend_api_gender_age.Services;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
public class FileProcessingService {

    public String SaveFile(String directory, MultipartFile file, String id_video)
            throws IOException {
        File directorios = new File(directory);
        if (!directorios.exists()) {
            if (directorios.mkdirs()) {
                System.out.println("Directory had been created");
            }
            else {
                System.out.println("Error creating directory");
            }
        }
        String fileName = file.getOriginalFilename();
        String extention = FilenameUtils.getExtension(fileName);
        String file_name = "test_video_"+id_video +"."+ extention;

        directory = directory+File.separator+file_name;
        System.out.println("Directory had been created "+ directory);


        byte[] fileBytes = file.getBytes();
        Path path = Paths.get(directory);
        Files.write(path, fileBytes);

        return directory;
    }
}
