ALTER USER 'mysql' IDENTIFIED WITH mysql_native_password BY 'Root1234';

CREATE DATABASE  IF NOT EXISTS `Pro3600` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `Pro3600`;
-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: Pro3600
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `depots`
--

DROP TABLE IF EXISTS `depots`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `depots` (
  `iddepots` int NOT NULL AUTO_INCREMENT,
  `projetid` int NOT NULL,
  `courriel` varchar(100) NOT NULL,
  `filename` varchar(150) DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `note` int DEFAULT NULL,
  `tentative` int NOT NULL,
  PRIMARY KEY (`iddepots`,`projetid`,`courriel`),
  KEY `idprojets_idx` (`projetid`),
  KEY `courriel_idx` (`courriel`),
  CONSTRAINT `idprojet` FOREIGN KEY (`projetid`) REFERENCES `projets` (`idprojets`),
  CONSTRAINT `usercourriel` FOREIGN KEY (`courriel`) REFERENCES `user` (`courriel`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `depots`
--

LOCK TABLES `depots` WRITE;
/*!40000 ALTER TABLE `depots` DISABLE KEYS */;
INSERT INTO `depots` VALUES (1,1,'2020@2020.com','test','2020-04-20 19:52:11',6,1),(2,1,'2020@2020.com','sad','2020-04-20 19:52:11',13,1),(3,1,'2020@2020.com','sad','2020-04-20 19:52:11',15,1),(4,1,'2020@2020.com','dsd','2020-04-20 19:52:11',56,1),(5,1,'2020@2020.com','sd','2020-04-20 19:52:11',45,1),(6,1,'2020@2020.com','asd','2020-04-20 19:52:11',12,1),(7,1,'2020@2020.com','sd','2020-04-20 19:52:11',87,1),(8,1,'2020@2020.com','sd','2020-04-20 19:52:11',90,1),(9,1,'2020@2020.com','ds','2020-04-20 19:52:11',67,1),(10,1,'2020@2020.com','ss','2020-04-20 19:52:11',99,1),(11,1,'2020@2020.com','s','2020-04-20 19:52:11',100,1),(12,1,'2020@2020.com','s','2020-04-20 19:52:11',0,1),(13,1,'2020@2020.com','s','2020-04-20 19:52:11',15,1),(14,1,'2020@2020.com','sd','2020-04-20 19:52:11',0,1),(15,1,'2020@2020.com','sd','2020-04-20 19:52:11',30,2),(16,1,'2020@2020.com','sd','2020-04-20 19:52:11',45,2),(17,1,'2020@2020.com','sd','2020-04-20 19:52:11',56,2),(18,1,'2020@2020.com','sd','2020-04-20 19:52:11',58,2),(19,1,'2020@2020.com','sd','2020-04-20 19:52:11',60,2),(20,1,'2020@2020.com','sdsad','2020-04-20 19:52:11',67,2),(21,1,'2020@2020.com','sdad','2020-04-20 19:52:11',68,2),(22,1,'2020@2020.com','sd','2020-04-20 19:52:11',66,2),(23,1,'2020@2020.com','sd','2020-04-20 19:52:11',66,2),(24,1,'2020@2020.com','asd','2020-04-20 19:52:11',78,2),(25,1,'2020@2020.com','asdasd','2020-04-20 19:52:11',78,2),(26,1,'2020@2020.com','asdasd','2020-04-20 19:52:11',90,2),(27,1,'2020@2020.com','asdasdsad','2020-04-20 19:52:11',100,2),(28,1,'2020@2020.com','sdsd','2020-04-20 19:52:11',100,2),(29,1,'2020@2020.com','sdd','2020-04-20 19:52:11',100,2),(30,1,'2020@2020.com','dd','2020-04-20 19:52:11',20,2),(31,2,'2020@2020.com','ds','2020-04-20 19:52:11',0,1),(32,2,'2020@2020.com','sdsd','2020-04-20 19:52:11',100,1),(33,3,'2020@2020.com','asd','2020-04-20 19:52:11',0,1),(34,3,'2020@2020.com','d','2020-04-20 19:52:11',11,1),(35,3,'2020@2020.com','d','2020-04-20 19:52:11',21,1),(36,3,'2020@2020.com','d','2020-04-20 19:52:11',31,1),(37,3,'2020@2020.com','d','2020-04-20 19:52:11',41,1),(38,3,'2020@2020.com','d','2020-04-20 19:52:11',51,1),(39,3,'2020@2020.com','d','2020-04-20 19:52:11',61,1),(40,3,'2020@2020.com','d','2020-04-20 19:52:11',71,1),(41,3,'2020@2020.com','d','2020-04-20 19:52:11',81,1),(42,3,'2020@2020.com','d','2020-04-20 19:52:11',91,1);
/*!40000 ALTER TABLE `depots` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `encadrant`
--

DROP TABLE IF EXISTS `encadrant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `encadrant` (
  `idencadrant` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  PRIMARY KEY (`idencadrant`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `encadrant`
--

LOCK TABLES `encadrant` WRITE;
/*!40000 ALTER TABLE `encadrant` DISABLE KEYS */;
INSERT INTO `encadrant` VALUES (1,'Francois TRAHAY'),(2,'Daniel ranc');
/*!40000 ALTER TABLE `encadrant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `module`
--

DROP TABLE IF EXISTS `module`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `module` (
  `idmodule` int unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(45) NOT NULL,
  `cursus` varchar(45) NOT NULL,
  PRIMARY KEY (`idmodule`,`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `module`
--

LOCK TABLES `module` WRITE;
/*!40000 ALTER TABLE `module` DISABLE KEYS */;
INSERT INTO `module` VALUES (1,'java','1A'),(2,'shell','1A'),(3,'Mysql','1A'),(4,'php','1A'),(5,'Python','1A');
/*!40000 ALTER TABLE `module` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `notetriee`
--

DROP TABLE IF EXISTS `notetriee`;
/*!50001 DROP VIEW IF EXISTS `notetriee`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `notetriee` AS SELECT 
 1 AS `note`,
 1 AS `tentative`,
 1 AS `projetid`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `projets`
--

DROP TABLE IF EXISTS `projets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `projets` (
  `idprojets` int NOT NULL AUTO_INCREMENT,
  `encadrantId` int unsigned NOT NULL,
  `moduleId` int unsigned NOT NULL,
  `nom` varchar(100) DEFAULT NULL,
  `Infos` varchar(500) DEFAULT NULL,
  `details` varchar(1000) DEFAULT NULL,
  `projetscol` varchar(45) DEFAULT NULL,
  `tag1` varchar(1000) DEFAULT NULL,
  `tag2` varchar(1000) DEFAULT NULL,
  `tag3` varchar(1000) DEFAULT NULL,
  `tag4` varchar(1000) DEFAULT NULL,
  `fileNameCorrection` varchar(100) DEFAULT NULL,
  `fileNameOutput` varchar(100) DEFAULT NULL,
  `idprojetparent` int DEFAULT NULL,
  `lvlrequis` int DEFAULT NULL,
  `ptsprojet` int DEFAULT NULL,
  `exprequis` int unsigned NOT NULL,
  PRIMARY KEY (`idprojets`,`encadrantId`,`moduleId`),
  KEY `idmodule_idx` (`moduleId`),
  KEY `idencandrant_idx` (`encadrantId`),
  CONSTRAINT `idencadrant` FOREIGN KEY (`encadrantId`) REFERENCES `encadrant` (`idencadrant`),
  CONSTRAINT `moduleid` FOREIGN KEY (`moduleId`) REFERENCES `module` (`idmodule`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projets`
--

LOCK TABLES `projets` WRITE;
/*!40000 ALTER TABLE `projets` DISABLE KEYS */;
INSERT INTO `projets` VALUES (1,1,2,'Shell et Script shell','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','',NULL,'shell','basique','essentiel','','test_bash_1.sh','test_bash_1.output',NULL,NULL,NULL,0),(2,1,2,'Système de Fichiers','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'shell','basique','essentiel',NULL,'test_bash_2.sh','test_bash_2.output',NULL,NULL,NULL,0),(3,1,2,'Les flux','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'shell','basique','essentiel',NULL,'test_bash_3.sh','test_bash_3.output',NULL,NULL,NULL,20),(4,1,2,'Outils indispensables','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'shell','intermediaire',NULL,NULL,'test_bash_4.sh','test_bash_4.output',NULL,NULL,NULL,20),(5,1,2,'Processus et concurrence','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'shell','intermediaireintermediaire',NULL,NULL,'test_bash_5.sh','test_bash_5.output',NULL,NULL,NULL,40),(6,1,2,'Communication inter-processus (1/3)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'shell','intermediaire',NULL,NULL,'test_bash_6.sh','test_bash_6.output',NULL,NULL,NULL,40),(7,1,2,'Communication inter-processus (2/3)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'shell','dur',NULL,NULL,'test_bash_7.sh','test_bash_7.output',NULL,NULL,NULL,60),(8,1,2,'Communication inter-processus (3/3)','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'shell','dur',NULL,NULL,'test_bash_8.sh','test_bash_8.output',NULL,NULL,NULL,60),(9,2,1,'Premiers pas et tableaux','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'java','basique',NULL,NULL,'test_java_1.sh',NULL,NULL,NULL,NULL,0),(10,2,1,'Les méthodes de classe','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'java','basique',NULL,NULL,'test_java_2.sh',NULL,NULL,NULL,NULL,0),(11,2,1,'Les structures de données','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'java','basique',NULL,NULL,'test_java_3.sh',NULL,NULL,NULL,NULL,0),(12,2,1,'Les méthodes d\'instance','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'java','intermediaire',NULL,NULL,'test_java_4.sh',NULL,NULL,NULL,NULL,20),(13,2,1,' Programmation orientée objet','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'java','intermediaire',NULL,NULL,'test_java_5.sh',NULL,NULL,NULL,NULL,20),(14,2,1,'L\'héritage','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'java','intermediaire',NULL,NULL,'test_java_6.sh',NULL,NULL,NULL,NULL,20),(15,2,1,'Les classes génériques','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'java','dur',NULL,NULL,'test_java_7.sh',NULL,NULL,NULL,NULL,40),(16,2,1,'Les exceptions','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'java','dur',NULL,NULL,'test_java_8.sh',NULL,NULL,NULL,NULL,40),(17,2,1,'Les classes anonymes','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam mollis lacus eu ante dictum, eget dictum est imperdiet. Praesent feugiat arcu ac purus rhoncus tristique.','Cras pulvinar eleifend orci, at convallis nibh suscipit at. Integer sit amet lacinia nunc, ut egestas ipsum. Integer volutpat felis et dui ornare viverra. Sed vitae ex et ex cursus dictum. Donec tincidunt lacus ut lectus ullamcorper scelerisque. Nulla facilisi. Nam dolor ex, pulvinar nec imperdiet vitae, varius ut purus. Vestibulum eget pharetra nunc, in auctor nulla. Ut metus arcu, vehicula quis tellus sollicitudin, elementum bibendum est. Donec lobortis euismod nisl. Nam tristique, elit vitae pellentesque ullamcorper, ligula quam venenatis justo, eget elementum lacus felis vitae risus. Morbi ut dignissim augue. Praesent iaculis justo in ex auctor rhoncus. Suspendisse mollis ante nec tempor venenatis. Maecenas id sollicitudin urna, id interdum felis.',NULL,'java','dur',NULL,NULL,'test_java_9.sh',NULL,NULL,NULL,NULL,60);
/*!40000 ALTER TABLE `projets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registereduser`
--

DROP TABLE IF EXISTS `registereduser`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registereduser` (
  `userCourriel` varchar(100) NOT NULL,
  `projetId` int NOT NULL,
  `note` int DEFAULT NULL,
  `date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `moduleId` int unsigned NOT NULL,
  PRIMARY KEY (`userCourriel`,`projetId`,`moduleId`),
  KEY `courriel_idx` (`userCourriel`),
  KEY `idprojets_idx` (`projetId`),
  KEY `idmodule_idx` (`moduleId`),
  CONSTRAINT `courriel` FOREIGN KEY (`userCourriel`) REFERENCES `user` (`courriel`),
  CONSTRAINT `idmodule` FOREIGN KEY (`moduleId`) REFERENCES `module` (`idmodule`),
  CONSTRAINT `idprojets` FOREIGN KEY (`projetId`) REFERENCES `projets` (`idprojets`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registereduser`
--

LOCK TABLES `registereduser` WRITE;
/*!40000 ALTER TABLE `registereduser` DISABLE KEYS */;
INSERT INTO `registereduser` VALUES ('2020@2020.com',1,50,'2020-04-20 19:52:11',2),('2020@2020.com',2,50,'2020-04-20 19:52:11',2),('2020@2020.com',3,50,'2020-04-20 19:52:11',2),('2020@2020.com',4,50,'2020-04-20 19:52:11',2),('2020@2020.com',5,100,'2020-04-20 19:52:11',2),('2020@2020.com',6,100,'2020-04-20 19:52:11',2),('2020@2020.com',7,100,'2020-04-20 19:52:11',2),('2020@2020.com',8,100,'2020-04-20 19:52:11',2);
/*!40000 ALTER TABLE `registereduser` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `courriel` varchar(100) NOT NULL,
  `exp` int DEFAULT '0',
  `urlimg` varchar(45) DEFAULT NULL,
  `date_registered` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`courriel`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('202','$2b$10$E3ySY.aRP/aimhhdYdW7XeJ0ukyiUBHeuza26ZcQb9AxGJ1e7i0Qm','2020@2020.com',0,'202_1587412427721.PNG','2020-04-20 19:52:11'),('demo','$2b$10$g1Epp07G3LDdqmZtdcJMYe9LIzXzPpFlQmlOoIn9KHHEeOWGgv18a','demo@prototype.com',0,NULL,'2020-03-16 23:29:31'),('test','$2b$10$tKiNpk8Gmg4katW5zU4qkOV/AQM.R9pvClpX5.SvvvKVIVAFrhFMO','test@tst.com',0,NULL,'2020-03-19 17:17:23'),('tst','$2b$10$IN6HDLxJM/ozWH2uAvsMAuj0B6tfH.Sb/Wfvis7.RJsb7kMoOwZ3.','tst@gmail.com',0,'tst_1586866448370.jpg','2020-04-14 12:12:35');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `notetriee`
--

/*!50001 DROP VIEW IF EXISTS `notetriee`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `notetriee` AS select `depots`.`note` AS `note`,`depots`.`tentative` AS `tentative`,`depots`.`projetid` AS `projetid` from `depots` where (`depots`.`tentative` >= 1) order by `depots`.`note` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-05-18 16:42:38
