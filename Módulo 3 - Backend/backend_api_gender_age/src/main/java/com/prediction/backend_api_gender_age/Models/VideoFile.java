package com.prediction.backend_api_gender_age.Models;

import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import javax.persistence.*;

@Entity
@Table(name = "video_file", schema = "db_gender_age")
public class VideoFile {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;



    @Column(name = "path_video", nullable = false)
    private String pathVideo;

    @Column(name = "gender_prediction", nullable = false)
    private String genderPrediction = "-";

    @Column(name = "age_prediction", nullable = false)
    private Integer agePrediction = 0;

    @Column(name = "two_faces", nullable = false)
    private Integer twoFaces = 0;

    @Column(name = "face_detected", nullable = false)
    private Integer faceDetected = 0;

    @ManyToOne
    @Fetch(FetchMode.JOIN)
    @JoinColumn(name = "id_number", referencedColumnName = "id_number", nullable = false)
    private UserVideo userVideo;

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }



    public void setPathVideo(String pathVideo) {
        this.pathVideo = pathVideo;
    }

    public String getPathVideo() {
        return pathVideo;
    }

    public void setGenderPrediction(String genderPrediction) {
        this.genderPrediction = genderPrediction;
    }

    public String getGenderPrediction() {
        return genderPrediction;
    }

    public void setAgePrediction(Integer agePrediction) {
        this.agePrediction = agePrediction;
    }

    public Integer getAgePrediction() {
        return agePrediction;
    }

    public void setTwoFaces(Integer twoFaces) {
        this.twoFaces = twoFaces;
    }

    public Integer getTwoFaces() {
        return twoFaces;
    }

    public void setFaceDetected(Integer faceDetected) {
        this.faceDetected = faceDetected;
    }

    public Integer getFaceDetected() {
        return faceDetected;
    }

    public UserVideo getUserVideo() {
        return userVideo;
    }

    public void setUserVideo(UserVideo userVideo) {
        this.userVideo = userVideo;
    }
}
