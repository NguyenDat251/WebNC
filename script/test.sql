-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: internetbanking
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
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  `indentity_number` varchar(45) NOT NULL,
  `currentToken` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'dat','123','datt','dat@gmail.com','0333333333333','1','',NULL),(2,'admin','$2a$08$SJlc0p.hXTKYEAi3ted4EOD7yxeEazRqF38KjHpXDmwHUTFBxzePm','Nguyen Dat','nguyenquocdat2511998@gmail.com','0343244644','1','',NULL),(5,'admin123','$2a$08$x2L1M3GqxvsfnoCL0dJld.ezK85KNayNDg6B65J565APuAHBIBfJO','Nguyen Dat','nguyenquocdat2511998123@gmail.com','0343244644','1','',NULL),(6,'adminn','$2a$08$XPLZsyex9mnOJn2YGW.UBO7BCQBHBYspIjkVrKllzaA7V6rmrNTdq','Nguyen Dat','nguyenquocdat@gmail.com','0343244644','1','',NULL);
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank`
--

DROP TABLE IF EXISTS `bank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bank` (
  `id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `money` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank`
--

LOCK TABLES `bank` WRITE;
/*!40000 ALTER TABLE `bank` DISABLE KEYS */;
INSERT INTO `bank` VALUES (1,'Ngân Hàng Nhà Nước Bảo Bình Đạt',5000000000000);
/*!40000 ALTER TABLE `bank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debt_reminder`
--

DROP TABLE IF EXISTS `debt_reminder`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debt_reminder` (
  `id_debt` int NOT NULL AUTO_INCREMENT,
  `id_debtor` int NOT NULL,
  `id_ower` int NOT NULL,
  `money_debt` int NOT NULL,
  `status` int NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `dateCreate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_debt`),
  KEY `FK_DEBT_USER_idx` (`id_debtor`),
  KEY `FK_OWER_USER_idx` (`id_ower`),
  CONSTRAINT `FK_DEBTOR_USER` FOREIGN KEY (`id_debtor`) REFERENCES `account` (`id`),
  CONSTRAINT `FK_OWER_USER` FOREIGN KEY (`id_ower`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debt_reminder`
--

LOCK TABLES `debt_reminder` WRITE;
/*!40000 ALTER TABLE `debt_reminder` DISABLE KEYS */;
/*!40000 ALTER TABLE `debt_reminder` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `history`
--

DROP TABLE IF EXISTS `history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `history` (
  `id_history` int NOT NULL AUTO_INCREMENT,
  `id_recipient` int NOT NULL,
  `id_user` int NOT NULL,
  `money_tranfer` int NOT NULL,
  `sign` text,
  PRIMARY KEY (`id_history`),
  KEY `FK_HISTORY_RECIPIENT_idx` (`id_recipient`),
  KEY `FK_HISTORY_USER_idx` (`id_user`),
  CONSTRAINT `FK_HISTORY_RECIPIENT` FOREIGN KEY (`id_recipient`) REFERENCES `account` (`id`),
  CONSTRAINT `FK_HISTORY_USER` FOREIGN KEY (`id_user`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
/*!40000 ALTER TABLE `history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `linkbanks`
--

DROP TABLE IF EXISTS `linkbanks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `linkbanks` (
  `id_link_bank` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id_link_bank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linkbanks`
--

LOCK TABLES `linkbanks` WRITE;
/*!40000 ALTER TABLE `linkbanks` DISABLE KEYS */;
/*!40000 ALTER TABLE `linkbanks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moneyaccount`
--

DROP TABLE IF EXISTS `moneyaccount`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moneyaccount` (
  `Number` int NOT NULL AUTO_INCREMENT,
  `Money` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `IdParent` int NOT NULL,
  PRIMARY KEY (`Number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moneyaccount`
--

LOCK TABLES `moneyaccount` WRITE;
/*!40000 ALTER TABLE `moneyaccount` DISABLE KEYS */;
INSERT INTO `moneyaccount` VALUES (1,'50000','1',6);
/*!40000 ALTER TABLE `moneyaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipients`
--

DROP TABLE IF EXISTS `recipients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipients` (
  `id_recipient` int NOT NULL AUTO_INCREMENT,
  `id_user` int NOT NULL,
  `bank_LinkId` int DEFAULT NULL,
  `name_recipient` varchar(45) DEFAULT NULL,
  KEY `FK_RECIPIENTS_ACCOUNT_idx` (`id_user`),
  KEY `FK_RECIPIENTS_LINKBANK_idx` (`bank_LinkId`),
  KEY `FK_RECIPIENTS_RECIPIENT_idx` (`id_recipient`),
  CONSTRAINT `FK_RECIPIENTS_ACCOUNT` FOREIGN KEY (`id_user`) REFERENCES `account` (`id`),
  CONSTRAINT `FK_RECIPIENTS_LINKBANK` FOREIGN KEY (`bank_LinkId`) REFERENCES `linkbanks` (`id_link_bank`),
  CONSTRAINT `FK_RECIPIENTS_RECIPIENT` FOREIGN KEY (`id_recipient`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipients`
--

LOCK TABLES `recipients` WRITE;
/*!40000 ALTER TABLE `recipients` DISABLE KEYS */;
/*!40000 ALTER TABLE `recipients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `savinglist`
--

DROP TABLE IF EXISTS `savinglist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `savinglist` (
  `id_saving` int NOT NULL AUTO_INCREMENT,
  `spending` int NOT NULL,
  `id_user` int NOT NULL,
  `name_saving` varchar(45) NOT NULL,
  `target_date` date NOT NULL,
  PRIMARY KEY (`id_saving`),
  CONSTRAINT `FK_SAVINGLIST_ACCOUNT` FOREIGN KEY (`id_saving`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savinglist`
--

LOCK TABLES `savinglist` WRITE;
/*!40000 ALTER TABLE `savinglist` DISABLE KEYS */;
/*!40000 ALTER TABLE `savinglist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userrefreshtokenext`
--

DROP TABLE IF EXISTS `userrefreshtokenext`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userrefreshtokenext` (
  `id` int NOT NULL AUTO_INCREMENT,
  `refreshToken` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrefreshtokenext`
--

LOCK TABLES `userrefreshtokenext` WRITE;
/*!40000 ALTER TABLE `userrefreshtokenext` DISABLE KEYS */;
INSERT INTO `userrefreshtokenext` VALUES (2,'Z8VYfY9VtT9xv0odioRkvyC80nugyB726TrQujzz4u7GYJfFOKwAArzmPR8fuxZUm1sPuveqeanUeCyd');
/*!40000 ALTER TABLE `userrefreshtokenext` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-06-05 22:53:03
