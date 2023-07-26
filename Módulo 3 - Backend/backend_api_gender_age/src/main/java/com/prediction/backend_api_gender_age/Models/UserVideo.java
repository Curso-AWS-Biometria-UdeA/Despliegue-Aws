package com.prediction.backend_api_gender_age.Models;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "user", schema = "db_gender_age")
public class UserVideo {

    @Id
    @Column(name = "id_number", nullable = false)
    private String idNumber;

    @Column(name = "type_id", nullable = false)
    private String typeId = "CC";

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "email", nullable = false)
    private String email;

    @OneToMany(mappedBy = "userVideo", fetch = FetchType.LAZY)
    private List<VideoFile> videoFileList;

    public void setIdNumber(String idNumber) {
        this.idNumber = idNumber;
    }

    public String getIdNumber() {
        return idNumber;
    }

    public void setTypeId(String typeId) {
        this.typeId = typeId;
    }

    public String getTypeId() {
        return typeId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public List<VideoFile> getVideoFileList() {
        return videoFileList;
    }

    public void setVideoFileList(List<VideoFile> videoFileList) {
        this.videoFileList = videoFileList;
    }
}
