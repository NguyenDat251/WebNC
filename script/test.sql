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
  `dob` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES (1,'dat','123','datt','dat@gmail.com','0333333333333','1','',NULL),(2,'admin','$2a$08$SJlc0p.hXTKYEAi3ted4EOD7yxeEazRqF38KjHpXDmwHUTFBxzePm','Nguyen Dat','nguyenquocdat2511998@gmail.com','0343244644','1','',NULL),(5,'admin123','$2a$08$x2L1M3GqxvsfnoCL0dJld.ezK85KNayNDg6B65J565APuAHBIBfJO','Nguyen Dat','nguyenquocdat2511998123@gmail.com','0343244644','1','',NULL),(6,'adminn','$2a$08$XPLZsyex9mnOJn2YGW.UBO7BCQBHBYspIjkVrKllzaA7V6rmrNTdq','Nguyen Dat','nguyenquocdat@gmail.com','0343244644','1','',NULL),(8,'baoit128','$2a$08$IJ6Yt/UFkbFqrt.36BDzEOJEoKKt.fD1.ilTX3Ep4pRAxWvAnMr02','Quoc Bao','baoit128@gmail.com','0909909999','3','025935889','1998-06-12'),(12,'phanhaibinh','$2a$08$K.1w7Dnnwseu4ZkXQo1nG./kVYppK7pANHjByIqX6I6eLdoQ8AemC','Phan Hải Bình','phanhaibinh@gmail.com','0909909999','1','025845999','2020-06-10'),(13,'phanhaibinh2','$2a$08$QQ.kz/bVsomLULKS6/e.KOCS2dqsrL1skJacFwyF6FAyqIWFZoPf6','Nguyễn Hoàng Chương','phanhaibinh2@gmail.com','0909909999','1','025845999','2020-06-24'),(14,'phanhaibinh3','$2a$08$Z0o2cvcfHyy6uxofjkVsWuIJeHbkR.QomMP3z/.hi3WsBhDN/ct3m','Nguyễn Đức Bảo Sơn','phanhai2inh@gmail.com','0909909999','1','025845999','2020-06-16'),(15,'phanhaibinh4','$2a$08$xzmvn8Ypw1IoeCp6Uj4AzeP0TMkpe3WKYAHUKSqw3fJMOVExYMSfa','Nguyễn Hoàng Sang','phanha33ibinh@gmail.com','0909909999','1','025845999','2020-06-16'),(16,'phanhaibinh5','$2a$08$aoCK9d.w5I8lRCjo9BAbgun.yVRLut/2OMTLPezwA367uVBIhJCIW','Phùng Trí Cường','phanhaib2inh@gmail.com','0909909999','1','025845999','2020-06-16'),(17,'phanhaibinh6','$2a$08$U1zbwlKMPLYnEBp0UPHtPeFBp.A1w04wUnCXwvRRw8XEEJAmDD1YO','Phạm Đình Sỹ','phanhaibinh123@gmail.com','0909909999','1','025845999','2020-06-17'),(18,'phanhaibinh1234','$2a$08$EteLy871mCxYi1iE6G2Lie1ANOadEAVXPj9TiV4B4FoLmuace92NO','Nguyễn Thị Ngân Khánh','phanhaibinh1234@gmail.com','0909909999','1','025845999','2020-06-11'),(19,'phanhaibinh1235','$2a$08$6L5IJub4YRZdsGwR7i017evdszbPdhvLhLIq50Ue/Ny3iQPPfZ8x2','Nguyễn Ngọc Hiển','phanhaibinh1235@gmail.com','0909909999','1','025845999','2020-06-11'),(20,'phanhaibinh1236','$2a$08$KCR1h8QAIJgYxVyprJL/5u.YjfhybkZEyql5QYXywqLhs05vSRtXO','Nguyễn Thị Hồng Mơ','phanhaibinh1236@gmail.com','0909909999','1','025845999','2020-06-11');
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
  `id_owner` int NOT NULL,
  `money_debt` int NOT NULL,
  `status` int NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `dateCreate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_debt`),
  KEY `FK_DEBT_USER_idx` (`id_debtor`),
  KEY `FK_OWER_USER_idx` (`id_owner`),
  CONSTRAINT `FK_DEBTOR_USER` FOREIGN KEY (`id_debtor`) REFERENCES `account` (`id`),
  CONSTRAINT `FK_OWER_USER` FOREIGN KEY (`id_owner`) REFERENCES `account` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debt_reminder`
--

LOCK TABLES `debt_reminder` WRITE;
/*!40000 ALTER TABLE `debt_reminder` DISABLE KEYS */;
INSERT INTO `debt_reminder` VALUES (1,12,13,30000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:43:12'),(2,12,14,10000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:44:39'),(3,12,15,20000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:44:43'),(4,12,16,30000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:44:52'),(5,12,17,40000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:44:58'),(6,12,18,50000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:45:03'),(7,12,19,60000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:45:18'),(8,12,20,70000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:45:27'),(10,13,14,2000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:01'),(11,13,15,2000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:46:05'),(12,13,16,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:10'),(13,13,17,5000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:46:15'),(14,13,18,6000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:20'),(15,13,19,7000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:46:25'),(16,13,20,8000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:32'),(17,14,12,8000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:46:41'),(18,14,13,7000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:46'),(19,14,15,6000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:46:52'),(20,14,16,5000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:58'),(21,14,17,4000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:47:04'),(22,14,18,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:47:09'),(23,14,19,2000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:47:13'),(24,14,20,1000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:47:21'),(25,15,20,1000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:47:34'),(26,15,19,2000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:47:39'),(27,15,18,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:47:43'),(28,15,17,4000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:47:48'),(29,15,16,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:47:53'),(30,15,14,2000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:47:58'),(31,15,13,1000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:48:02'),(34,16,13,2000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:48:15'),(35,16,14,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:48:20'),(36,16,15,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:48:24'),(37,16,17,4000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:48:31'),(38,16,18,5000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:48:36'),(39,16,19,6000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:48:44'),(40,16,20,8000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:48:50'),(41,17,20,9000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:48:58'),(42,17,19,8000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:49:04'),(43,17,18,7000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:49:09'),(44,17,16,6000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:49:16'),(45,17,15,5000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:49:20'),(46,17,14,4000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:49:24'),(47,17,13,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:49:28'),(50,18,13,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:50:08'),(51,18,14,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:50:11'),(52,18,15,4000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:50:16'),(53,18,16,5000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:50:22'),(54,18,17,6000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:50:39'),(55,18,19,7000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:50:45'),(56,18,20,8000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:50:50'),(57,19,20,8000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:50:55'),(58,19,18,1000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:51:08'),(59,19,17,2000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:51:15'),(60,19,16,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:51:20'),(61,19,15,4000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:51:44'),(62,19,14,5000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:51:49'),(63,19,13,6000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:51:53'),(66,20,13,6000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:52:28'),(67,20,14,6000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:52:31'),(68,20,15,5000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:52:36'),(69,20,16,4000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:52:45'),(70,20,17,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:52:50'),(71,20,18,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:52:53'),(75,15,12,13231333,0,'12321312','2020-06-07 20:26:21'),(76,17,12,312312321,0,'312312312','2020-06-07 20:32:40'),(80,13,12,312312,0,'312312312','2020-06-07 21:12:16'),(81,18,12,312321,0,'312312321','2020-06-07 21:15:11'),(82,20,12,1233333,0,'333333','2020-06-07 22:23:26');
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
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id_link_bank`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `linkbanks`
--

LOCK TABLES `linkbanks` WRITE;
/*!40000 ALTER TABLE `linkbanks` DISABLE KEYS */;
INSERT INTO `linkbanks` VALUES (1,'Vietnam Prosperity Bank'),(2,'Military Commercial Joint Stock Bank'),(3,'JSC Bank for Foreign Trade of Vietnam'),(4,'Asia Commercial Joint Stock Bank'),(5,'Ho Chi Minh City Development Bank'),(6,'Vietnam International and Commercial Joint Stock Bank	');
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
  `username` varchar(255) NOT NULL,
  PRIMARY KEY (`Number`),
  KEY `FK_MA_ACCOUNT_idx` (`username`),
  CONSTRAINT `FK_MA_ACCOUNT` FOREIGN KEY (`username`) REFERENCES `account` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moneyaccount`
--

LOCK TABLES `moneyaccount` WRITE;
/*!40000 ALTER TABLE `moneyaccount` DISABLE KEYS */;
INSERT INTO `moneyaccount` VALUES (1,'50000','adminn'),(2,'77598233','admin123'),(3,'42000000','baoit128'),(4,'18000000','phanhaibinh'),(5,'37000000','phanhaibinh2'),(6,'60000000','phanhaibinh3'),(7,'39530000','phanhaibinh4'),(8,'92000000','phanhaibinh5'),(9,'26000000','phanhaibinh6'),(10,'78300000','phanhaibinh1234'),(11,'4260000','phanhaibinh1235'),(12,'66000000','phanhaibinh1236');
/*!40000 ALTER TABLE `moneyaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otp`
--

DROP TABLE IF EXISTS `otp`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otp` (
  `otp` varchar(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `time` int NOT NULL,
  PRIMARY KEY (`otp`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otp`
--

LOCK TABLES `otp` WRITE;
/*!40000 ALTER TABLE `otp` DISABLE KEYS */;
/*!40000 ALTER TABLE `otp` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipients`
--

DROP TABLE IF EXISTS `recipients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recipients` (
  `username_recipient` varchar(255) DEFAULT NULL,
  `username` varchar(255) NOT NULL,
  `bank_LinkId` int DEFAULT NULL,
  `name_recipient` varchar(45) NOT NULL,
  `isLocal` bit(1) DEFAULT b'1',
  `walletId` int DEFAULT NULL,
  KEY `FK_RECIPIENTS_ACCOUNT_idx` (`username`),
  KEY `FK_RECIPIENTS_LINKBANK_idx` (`bank_LinkId`),
  KEY `FK_RECIPIENTS_RECIPIENT_idx` (`username_recipient`),
  CONSTRAINT `FK_RECIPIENTS_LINKBANK` FOREIGN KEY (`bank_LinkId`) REFERENCES `linkbanks` (`id_link_bank`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipients`
--

LOCK TABLES `recipients` WRITE;
/*!40000 ALTER TABLE `recipients` DISABLE KEYS */;
INSERT INTO `recipients` VALUES ('phanhaibinh2','phanhaibinh',NULL,'Nguyễn Hoàng Chương',_binary '',5),('phanhaibinh3','phanhaibinh',NULL,'Nguyễn Đức Bảo Sơn',_binary '',6),('phanhaibinh4','phanhaibinh',NULL,'Nguyễn Hoàng Sang',_binary '',7),('phanhaibinh5','phanhaibinh',NULL,'Phùng Trí Cường',_binary '',8),('phanhaibinh6','phanhaibinh',NULL,'Phạm Đình Sỹ',_binary '',9),('phanhaibinh1234','phanhaibinh',NULL,'Nguyễn Thị Ngân Khánh',_binary '',10),('phanhaibinh1235','phanhaibinh',NULL,'Nguyễn Ngọc Hiển',_binary '',11),('phanhaibinh1236','phanhaibinh',NULL,'Nguyễn Thị Hồng Mơ',_binary '',12),('phanhaibinh','phanhaibinh2',NULL,'Phan Hải Bình',_binary '',4),('phanhaibinh3','phanhaibinh2',NULL,'Nguyễn Đức Bảo Sơn',_binary '',6),('phanhaibinh4','phanhaibinh2',NULL,'Nguyễn Hoàng Sang',_binary '',7),('phanhaibinh5','phanhaibinh2',NULL,'Phùng Trí Cường',_binary '',8),('phanhaibinh6','phanhaibinh2',NULL,'Phạm Đình Sỹ',_binary '',9),('phanhaibinh1234','phanhaibinh2',NULL,'Nguyễn Thị Ngân Khánh',_binary '',10),('phanhaibinh1235','phanhaibinh2',NULL,'Nguyễn Ngọc Hiển',_binary '',11),('phanhaibinh1236','phanhaibinh2',NULL,'Nguyễn Thị Hồng Mơ',_binary '',12),('phanhaibinh','phanhaibinh3',NULL,'Phan Hải Bình',_binary '',4),('phanhaibinh2','phanhaibinh3',NULL,'Nguyễn Hoàng Chương',_binary '',5),('phanhaibinh4','phanhaibinh3',NULL,'Nguyễn Hoàng Sang',_binary '',7),('phanhaibinh5','phanhaibinh2',NULL,'Phùng Trí Cường',_binary '',8),('phanhaibinh6','phanhaibinh2',NULL,'Phạm Đình Sỹ',_binary '',9),('phanhaibinh1234','phanhaibinh3',NULL,'Nguyễn Thị Ngân Khánh',_binary '',10),('phanhaibinh1235','phanhaibinh3',NULL,'Nguyễn Ngọc Hiển',_binary '',11),('phanhaibinh1236','phanhaibinh3',NULL,'Nguyễn Thị Hồng Mơ',_binary '',12),(NULL,'phanhaibinh',1,'Nguyễn Hoàng Chương',_binary '\0',5),(NULL,'phanhaibinh',2,'Nguyễn Đức Bảo Sơn',_binary '\0',6),(NULL,'phanhaibinh',2,'Nguyễn Hoàng Sang',_binary '\0',7),(NULL,'phanhaibinh',1,'Phùng Trí Cường',_binary '\0',8),(NULL,'phanhaibinh',2,'Phạm Đình Sỹ',_binary '\0',9),(NULL,'phanhaibinh',1,'Nguyễn Thị Ngân Khánh',_binary '\0',10),(NULL,'phanhaibinh',2,'Nguyễn Ngọc Hiển',_binary '\0',11),(NULL,'phanhaibinh',1,'Nguyễn Thị Hồng Mơ',_binary '\0',12),(NULL,'phanhaibinh2',1,'Phan Hải Bình',_binary '\0',4),(NULL,'phanhaibinh2',2,'Nguyễn Đức Bảo Sơn',_binary '\0',6),(NULL,'phanhaibinh2',1,'Nguyễn Hoàng Sang',_binary '\0',7),(NULL,'phanhaibinh2',2,'Phùng Trí Cường',_binary '\0',8),(NULL,'phanhaibinh2',1,'Phạm Đình Sỹ',_binary '\0',9),(NULL,'phanhaibinh2',2,'Nguyễn Thị Ngân Khánh',_binary '\0',10),(NULL,'phanhaibinh2',1,'Nguyễn Ngọc Hiển',_binary '\0',11),(NULL,'phanhaibinh2',1,'Nguyễn Thị Hồng Mơ',_binary '\0',12);
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
  `username` varchar(45) NOT NULL,
  `name_saving` varchar(45) NOT NULL,
  `target_date` date NOT NULL,
  PRIMARY KEY (`id_saving`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `savinglist`
--

LOCK TABLES `savinglist` WRITE;
/*!40000 ALTER TABLE `savinglist` DISABLE KEYS */;
INSERT INTO `savinglist` VALUES (1,3000000,'phanhaibinh','Tiết kiệm 1','2020-09-06'),(2,4000000,'phanhaibinh','Tiết kiệm 2','2020-09-06'),(3,5000000,'phanhaibinh','Tiết kiệm 3','2020-09-06'),(4,6000000,'phanhaibinh','Tiết kiệm 4','2020-09-06'),(5,7000000,'phanhaibinh','Tiết kiệm 5','2020-09-06'),(6,8000000,'phanhaibinh2','Tiết kiệm 1','2020-09-06'),(7,9000000,'phanhaibinh2','Tiết kiệm 2','2020-09-06'),(8,3000000,'phanhaibinh2','Tiết kiệm 3','2020-09-06'),(9,3000000,'phanhaibinh3','Tiết kiệm 1','2020-09-06'),(10,3000000,'phanhaibinh3','Tiết kiệm 2','2020-09-06'),(11,3000000,'phanhaibinh3','Tiết kiệm 3','2020-09-06'),(12,3000000,'phanhaibinh3','Tiết kiệm 4','2020-09-06'),(13,3000000,'phanhaibinh4','Tiết kiệm 1','2020-09-06');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userrefreshtokenext`
--

LOCK TABLES `userrefreshtokenext` WRITE;
/*!40000 ALTER TABLE `userrefreshtokenext` DISABLE KEYS */;
INSERT INTO `userrefreshtokenext` VALUES (2,'Z8VYfY9VtT9xv0odioRkvyC80nugyB726TrQujzz4u7GYJfFOKwAArzmPR8fuxZUm1sPuveqeanUeCyd'),(8,'KlqlPRE7K8iW63JNA1ZLLx06OJuqNty5RpPNDDaAC0FodoKveWGSmvm0gjuhLu7XlJ8LQsgWxEPQTnoM'),(12,'MSGQg3LD7t2fpbDirFi26yWr50zQN7WOzI2WR0u65Al0YmcdQj8Di9g8xGiren6C6RejCqB4Wrh02fVM'),(13,'y1TtwJp9aQGgKKg3DPMgXlLimikQmY2HJoeCCjqDwODQCoR2HhDgwwrvfdbQ1wtltM9VWfp8aMekcthI');
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

-- Dump completed on 2020-06-10  0:37:47

DROP TABLE IF EXISTS `OtherBankTransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OtherBankTransaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `BankCode` varchar(255) NOT NULL,
  `Time` int NOT NULL,
  `Money` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `OtherBank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OtherBank` (
  `BankCode` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`BankCode`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;


