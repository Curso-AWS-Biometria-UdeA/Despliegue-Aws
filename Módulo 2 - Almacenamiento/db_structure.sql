-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema db_gender_age
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema db_gender_age
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `db_gender_age` ;
USE `db_gender_age` ;

-- -----------------------------------------------------
-- Table `db_gender_age`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_gender_age`.`User` (
  `id_number` VARCHAR(12) NOT NULL,
  `type_id` VARCHAR(2) NOT NULL DEFAULT 'CC',
  `name` VARCHAR(128) NOT NULL,
  `last_name` VARCHAR(128) NOT NULL,
  `password` VARCHAR(6) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id_number`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `db_gender_age`.`video_file`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `db_gender_age`.`video_file` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `id_number` VARCHAR(12) NOT NULL,
  `path_video` VARCHAR(512) NOT NULL,
  `gender_prediction` VARCHAR(1) NOT NULL DEFAULT '-',
  `age_prediction` INT NOT NULL DEFAULT 0,
  `two_faces` TINYINT(1) NOT NULL,
  `face_detected` TINYINT(1) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_video_file_User_idx` (`id_number` ASC) VISIBLE,
  CONSTRAINT `fk_video_file_User`
    FOREIGN KEY (`id_number`)
    REFERENCES `db_gender_age`.`User` (`id_number`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
