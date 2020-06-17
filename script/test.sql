-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: internetbanking2
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
INSERT INTO `account` VALUES (1,'dat','123','datt','dat@gmail.com','0333333333333','1','',NULL),(2,'admin','$2a$08$SJlc0p.hXTKYEAi3ted4EOD7yxeEazRqF38KjHpXDmwHUTFBxzePm','Nguyen Dat','nguyenquocdat2511998@gmail.com','0343244644','1','',NULL),(5,'admin123','$2a$08$x2L1M3GqxvsfnoCL0dJld.ezK85KNayNDg6B65J565APuAHBIBfJO','Nguyen Dat','nguyenquocdat2511998123@gmail.com','0343244644','1','',NULL),(6,'adminn','$2a$08$XPLZsyex9mnOJn2YGW.UBO7BCQBHBYspIjkVrKllzaA7V6rmrNTdq','Nguyen Dat','nguyenquocdat@gmail.com','0343244644','1','',NULL),(8,'baoit128','$2a$08$IJ6Yt/UFkbFqrt.36BDzEOJEoKKt.fD1.ilTX3Ep4pRAxWvAnMr02','Quoc Bao','baoit129@gmail.com','0909909999','3','025935889','1998-06-12'),(12,'phanhaibinh','$2a$08$K.1w7Dnnwseu4ZkXQo1nG./kVYppK7pANHjByIqX6I6eLdoQ8AemC','Phan Hải Bình','baoit128@gmail.com','0909909999','1','025845999','2020-06-10'),(13,'phanhaibinh2','$2a$08$QQ.kz/bVsomLULKS6/e.KOCS2dqsrL1skJacFwyF6FAyqIWFZoPf6','Nguyễn Hoàng Chương','harrykill.007@gmail.com','0909909999','1','025845999','2020-06-24'),(14,'phanhaibinh3','$2a$08$Z0o2cvcfHyy6uxofjkVsWuIJeHbkR.QomMP3z/.hi3WsBhDN/ct3m','Nguyễn Đức Bảo Sơn','phanhai2inh@gmail.com','0909909999','1','025845999','2020-06-16'),(15,'phanhaibinh4','$2a$08$xzmvn8Ypw1IoeCp6Uj4AzeP0TMkpe3WKYAHUKSqw3fJMOVExYMSfa','Nguyễn Hoàng Sang','phanha33ibinh@gmail.com','0909909999','1','025845999','2020-06-16'),(16,'phanhaibinh5','$2a$08$aoCK9d.w5I8lRCjo9BAbgun.yVRLut/2OMTLPezwA367uVBIhJCIW','Phùng Trí Cường','phanhaib2inh@gmail.com','0909909999','1','025845999','2020-06-16'),(17,'phanhaibinh6','$2a$08$U1zbwlKMPLYnEBp0UPHtPeFBp.A1w04wUnCXwvRRw8XEEJAmDD1YO','Phạm Đình Sỹ','phanhaibinh123@gmail.com','0909909999','1','025845999','2020-06-17'),(18,'phanhaibinh1234','$2a$08$EteLy871mCxYi1iE6G2Lie1ANOadEAVXPj9TiV4B4FoLmuace92NO','Nguyễn Thị Ngân Khánh','phanhaibinh1234@gmail.com','0909909999','1','025845999','2020-06-11'),(19,'phanhaibinh1235','$2a$08$6L5IJub4YRZdsGwR7i017evdszbPdhvLhLIq50Ue/Ny3iQPPfZ8x2','Nguyễn Ngọc Hiển','phanhaibinh1235@gmail.com','0909909999','1','025845999','2020-06-11'),(20,'phanhaibinh1236','$2a$08$KCR1h8QAIJgYxVyprJL/5u.YjfhybkZEyql5QYXywqLhs05vSRtXO','Nguyễn Thị Hồng Mơ','phanhaibinh1236@gmail.com','0909909999','1','025845999','2020-06-11');
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
  `description` text,
  `dateCreate` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_debt`),
  KEY `FK_DEBT_USER_idx` (`id_debtor`),
  KEY `FK_OWER_USER_idx` (`id_owner`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debt_reminder`
--

LOCK TABLES `debt_reminder` WRITE;
/*!40000 ALTER TABLE `debt_reminder` DISABLE KEYS */;
INSERT INTO `debt_reminder` VALUES (1,12,13,30000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:43:12'),(2,12,14,10000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:44:39'),(3,12,15,20000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:44:43'),(4,12,16,30000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:44:52'),(5,12,17,40000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:44:58'),(6,12,18,50000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:45:03'),(7,12,19,60000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:45:18'),(8,12,20,70000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:45:27'),(10,13,14,2000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:01'),(11,13,15,2000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:46:05'),(12,13,16,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:10'),(13,13,17,5000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:46:15'),(14,13,18,6000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:20'),(15,13,19,7000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:46:25'),(16,13,20,8000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:32'),(17,14,12,8000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:46:41'),(18,14,13,7000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:46'),(19,14,15,6000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:46:52'),(20,14,16,5000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:46:58'),(21,14,17,4000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:47:04'),(22,14,18,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:47:09'),(23,14,19,2000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:47:13'),(24,14,20,1000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:47:21'),(25,15,20,1000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:47:34'),(26,15,19,2000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:47:39'),(27,15,18,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:47:43'),(28,15,17,4000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:47:48'),(29,15,16,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:47:53'),(30,15,14,2000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:47:58'),(31,15,13,1000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:48:02'),(34,16,13,2000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:48:15'),(35,16,14,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:48:20'),(36,16,15,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:48:24'),(37,16,17,4000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:48:31'),(38,16,18,5000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:48:36'),(39,16,19,6000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:48:44'),(40,16,20,8000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:48:50'),(41,17,20,9000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:48:58'),(42,17,19,8000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:49:04'),(43,17,18,7000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:49:09'),(44,17,16,6000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:49:16'),(45,17,15,5000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:49:20'),(46,17,14,4000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:49:24'),(47,17,13,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:49:28'),(50,18,13,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:50:08'),(51,18,14,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:50:11'),(52,18,15,4000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:50:16'),(53,18,16,5000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:50:22'),(54,18,17,6000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:50:39'),(55,18,19,7000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:50:45'),(56,18,20,8000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:50:50'),(57,19,20,8000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:50:55'),(58,19,18,1000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:51:08'),(59,19,17,2000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:51:15'),(60,19,16,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:51:20'),(61,19,15,4000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:51:44'),(62,19,14,5000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:51:49'),(63,19,13,6000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:51:53'),(66,20,13,6000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:52:28'),(67,20,14,6000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:52:31'),(68,20,15,5000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:52:36'),(69,20,16,4000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:52:45'),(70,20,17,3000000,0,'Người hay chủ động thanh toán tiền, không phải do ngu ngốc lắm tiền, mà là người ta coi bạn bè quan trọng hơn tiền bạc.','2020-06-07 10:52:50'),(71,20,18,3000000,0,'Không cho bạn mượn tiền thì có thể mất đi một người bạn, nhưng khi bạn cho họ mượn tiền thì bạn có thể sẽ mất đi cả hai','2020-06-07 10:52:53'),(75,15,12,13231333,0,'12321312','2020-06-07 20:26:21'),(80,13,12,312312,0,'312312312','2020-06-07 21:12:16'),(81,18,12,312321,0,'312312321','2020-06-07 21:15:11'),(82,20,12,1233333,0,'333333','2020-06-07 22:23:26'),(83,14,12,133123,0,'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non fermentum diam, sit amet hendrerit elit. In hac habitasse platea dictumst. Nulla neque arcu, scelerisque sed urna at, accumsan tristique nisi. Fusce sed efficitur leo. Suspendisse dapibus sem eget tortor viverra, eget auctor sapien viverra. In ef','2020-06-12 08:58:07'),(84,15,12,54444545,0,'\"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...\"\n','2020-06-12 08:58:43');
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
  `user` int NOT NULL,
  `partner` int NOT NULL,
  `money_transfer` int NOT NULL,
  `time` int NOT NULL,
  `description` text,
  `type` int DEFAULT NULL,
  `isSaving` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id_history`),
  KEY `FK_HISTORY_RECIPIENT_idx` (`user`),
  KEY `FK_HISTORY_USER_idx` (`partner`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `history`
--

LOCK TABLES `history` WRITE;
/*!40000 ALTER TABLE `history` DISABLE KEYS */;
INSERT INTO `history` VALUES (29,7,2,147000,1592047823,'12345566',1,_binary ''),(30,2,7,-150000,1592047823,'12345566',2,_binary ''),(31,6,4,377000,1592047850,'12345566',1,_binary '\0'),(32,4,6,-380000,1592047850,'12345566',2,_binary '\0'),(33,4,5,350000,1592056482,'Chuyen tien',1,_binary '\0'),(34,5,4,-353000,1592056482,'Chuyen tien',2,_binary '\0'),(35,4,5,350000,1592056599,'Chuyen tien',1,_binary '\0'),(36,5,4,-353000,1592056599,'Chuyen tien',2,_binary '\0'),(37,4,6,1000000,1592056645,'Chuyển tiền 1 củ',1,_binary ''),(38,6,4,-1003000,1592056645,'Chuyển tiền 1 củ',2,_binary ''),(39,4,5,10000000,1592072867,'chuyển 10 củ',1,_binary '\0'),(40,5,4,-10003000,1592072867,'chuyển 10 củ',2,_binary '\0'),(41,6,4,550000,1592125295,'Chuyen tien 550k',1,_binary '\0'),(42,4,6,-553000,1592125295,'Chuyen tien 550k',2,_binary '\0'),(43,5,4,100000,1592134874,'firebase test transfer',1,_binary '\0'),(44,4,5,-103000,1592134874,'firebase test transfer',2,_binary '\0'),(45,5,4,100000,1592135059,'Transfer money',1,_binary '\0'),(46,4,5,-103000,1592135059,'Transfer money',2,_binary '\0'),(47,5,4,300000,1592135195,'31231231',1,_binary '\0'),(48,4,5,-303000,1592135195,'31231231',2,_binary '\0'),(49,8,4,900000,1592135703,'test firebase transfer',1,_binary '\0'),(50,4,8,-903000,1592135703,'test firebase transfer',2,_binary '\0'),(51,5,4,100000,1592135893,'transfer local',1,_binary '\0'),(52,4,5,-103000,1592135893,'transfer local',2,_binary '\0'),(53,5,4,97000,1592136019,'test transfer local',1,_binary '\0'),(54,4,5,-100000,1592136019,'test transfer local',2,_binary '\0'),(55,5,4,100000,1592136137,'312312',1,_binary '\0'),(56,4,5,-103000,1592136137,'312312',2,_binary '\0'),(57,5,4,100000,1592136180,'312',1,_binary '\0'),(58,4,5,-103000,1592136180,'312',2,_binary '\0'),(59,5,4,100000,1592136530,'12321312',1,_binary '\0'),(60,4,5,-103000,1592136531,'12321312',2,_binary '\0'),(61,6,4,123312,1592136549,'312312',1,_binary '\0'),(62,4,6,-126312,1592136549,'312312',2,_binary '\0'),(63,5,4,100000,1592136790,'1312312',1,_binary '\0'),(64,4,5,-103000,1592136790,'1312312',2,_binary '\0'),(65,5,4,100000,1592139582,'1234567',1,_binary '\0'),(66,4,5,-103000,1592139582,'1234567',2,_binary '\0'),(67,5,4,100000,1592139654,'1234567',1,_binary '\0'),(68,4,5,-103000,1592139654,'1234567',2,_binary '\0'),(69,5,4,100000,1592139743,'1234567',1,_binary '\0'),(70,4,5,-103000,1592139743,'1234567',2,_binary '\0'),(71,5,4,100000,1592140141,'213214',1,_binary '\0'),(72,4,5,-103000,1592140141,'213214',2,_binary '\0'),(73,5,4,312312,1592141173,'312312',1,_binary '\0'),(74,4,5,-315312,1592141173,'312312',2,_binary '\0'),(75,5,4,100000,1592210162,'31231241',1,_binary '\0'),(76,4,5,-103000,1592210162,'31231241',2,_binary '\0'),(77,5,4,100000,1592210790,'12dasdas',1,_binary '\0'),(78,4,5,-103000,1592210791,'12dasdas',2,_binary '\0'),(79,5,4,100000,1592210821,'dasas',1,_binary '\0'),(80,4,5,-103000,1592210821,'dasas',2,_binary '\0'),(81,5,4,150000,1592210919,'312312',1,_binary '\0'),(82,4,5,-153000,1592210919,'312312',2,_binary '\0'),(83,5,4,250000,1592211002,'1321',1,_binary '\0'),(84,4,5,-253000,1592211002,'1321',2,_binary '\0'),(85,5,4,100000,1592211066,'12312',1,_binary '\0'),(86,4,5,-103000,1592211066,'12312',2,_binary '\0'),(87,5,4,250000,1592211127,'312312',1,_binary '\0'),(88,4,5,-253000,1592211127,'312312',2,_binary '\0'),(89,5,4,128000,1592211386,'1236',1,_binary '\0'),(90,4,5,-131000,1592211386,'1236',2,_binary '\0'),(91,5,4,238000,1592211476,'238 description',1,_binary '\0'),(92,4,5,-241000,1592211476,'238 description',2,_binary '\0');
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
  `id` varchar(255) NOT NULL,
  PRIMARY KEY (`Number`),
  KEY `FK_MA_ACCOUNT_idx` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moneyaccount`
--

LOCK TABLES `moneyaccount` WRITE;
/*!40000 ALTER TABLE `moneyaccount` DISABLE KEYS */;
INSERT INTO `moneyaccount` VALUES (1,'50000','6'),(2,'77598233','5'),(3,'42000000','8'),(4,'10043376','12'),(5,'47244312','13'),(6,'61050312','14'),(7,'39971000','15'),(8,'92900000','16'),(9,'26000000','17'),(10,'78300000','18'),(11,'4260000','19'),(12,'66000000','20');
/*!40000 ALTER TABLE `moneyaccount` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otherbank`
--

DROP TABLE IF EXISTS `otherbank`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otherbank` (
  `BankCode` varchar(255) NOT NULL,
  `Name` varchar(255) NOT NULL,
  PRIMARY KEY (`BankCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otherbank`
--

LOCK TABLES `otherbank` WRITE;
/*!40000 ALTER TABLE `otherbank` DISABLE KEYS */;
INSERT INTO `otherbank` VALUES ('kianto','Lam Bank Viet Nam'),('thisisatokenfroma','Nguyen Bank Viet Nam');
/*!40000 ALTER TABLE `otherbank` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `otherbanktransaction`
--

DROP TABLE IF EXISTS `otherbanktransaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `otherbanktransaction` (
  `id` int NOT NULL AUTO_INCREMENT,
  `BankCode` varchar(255) NOT NULL,
  `Time` int NOT NULL,
  `Money` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BankCode` (`BankCode`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `otherbanktransaction`
--

LOCK TABLES `otherbanktransaction` WRITE;
/*!40000 ALTER TABLE `otherbanktransaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `otherbanktransaction` ENABLE KEYS */;
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
  `id_recipient` varchar(255) DEFAULT NULL,
  `id` varchar(255) NOT NULL,
  `bankCode` varchar(255) DEFAULT NULL,
  `name_recipient` varchar(45) NOT NULL,
  `isLocal` bit(1) DEFAULT b'1',
  `walletId` int DEFAULT NULL,
  KEY `FK_RECIPIENTS_ACCOUNT_idx` (`id`),
  KEY `FK_RECIPIENTS_LINKBANK_idx` (`bankCode`),
  KEY `FK_RECIPIENTS_RECIPIENT_idx` (`id_recipient`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipients`
--

LOCK TABLES `recipients` WRITE;
/*!40000 ALTER TABLE `recipients` DISABLE KEYS */;
INSERT INTO `recipients` VALUES ('13','12',NULL,'Nguyễn Hoàng Chương',_binary '',5),('14','12',NULL,'Nguyễn Đức Bảo Sơn',_binary '',6),('15','12',NULL,'Nguyễn Hoàng Sang',_binary '',7),('16','12',NULL,'Phùng Trí Cường',_binary '',8),('20','12',NULL,'Nguyễn Thị Hồng Mơ',_binary '',12),('12','13',NULL,'Phan Hải Bình',_binary '',4),('14','13',NULL,'Nguyễn Đức Bảo Sơn',_binary '',6),('15','13',NULL,'Nguyễn Hoàng Sang',_binary '',7),('16','13',NULL,'Phùng Trí Cường',_binary '',8),('17','13',NULL,'Phạm Đình Sỹ',_binary '',9),('18','13',NULL,'Nguyễn Thị Ngân Khánh',_binary '',10),('19','13',NULL,'Nguyễn Ngọc Hiển',_binary '',11),('20','13',NULL,'Nguyễn Thị Hồng Mơ',_binary '',12),('12','14',NULL,'Phan Hải Bình',_binary '',4),('13','14',NULL,'Nguyễn Hoàng Chương',_binary '',5),('15','14',NULL,'Nguyễn Hoàng Sang',_binary '',7),('16','13',NULL,'Phùng Trí Cường',_binary '',8),('17','13',NULL,'Phạm Đình Sỹ',_binary '',9),('18','14',NULL,'Nguyễn Thị Ngân Khánh',_binary '',10),('19','14',NULL,'Nguyễn Ngọc Hiển',_binary '',11),('20','14',NULL,'Nguyễn Thị Hồng Mơ',_binary '',12),(NULL,'12','thisisatokenfroma','Nguyễn Đức Bảo Sơn',_binary '\0',6),(NULL,'12','thisisatokenfroma','Nguyễn Hoàng Sang',_binary '\0',7),(NULL,'12','kianto','Phùng Trí Cường',_binary '\0',8),(NULL,'12','thisisatokenfroma','Phạm Đình Sỹ',_binary '\0',9),(NULL,'12','kianto','Nguyễn Thị Ngân Khánh',_binary '\0',10),(NULL,'12','thisisatokenfroma','Nguyễn Ngọc Hiển',_binary '\0',11),(NULL,'12','kianto','Nguyễn Thị Hồng Mơ',_binary '\0',12),(NULL,'13','kianto','Phan Hải Bình',_binary '\0',4),(NULL,'13','thisisatokenfroma','Nguyễn Đức Bảo Sơn',_binary '\0',6),(NULL,'13','kianto','Nguyễn Hoàng Sang',_binary '\0',7),(NULL,'13','thisisatokenfroma','Phùng Trí Cường',_binary '\0',8),(NULL,'13','kianto','Phạm Đình Sỹ',_binary '\0',9),(NULL,'13','thisisatokenfroma','Nguyễn Thị Ngân Khánh',_binary '\0',10),(NULL,'13','kianto','Nguyễn Ngọc Hiển',_binary '\0',11),(NULL,'13','kianto','Nguyễn Thị Hồng Mơ',_binary '\0',12);
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
  `id` varchar(45) NOT NULL,
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
INSERT INTO `savinglist` VALUES (1,0,'12','Tiết kiệm 1','2020-09-06'),(2,3150000,'12','Tiết kiệm 2','2020-09-06'),(3,5000000,'12','Tiết kiệm 3','2020-09-06'),(5,7000000,'12','Tiết kiệm 5','2020-09-06'),(6,6997000,'13','Tiết kiệm 1','2020-09-06'),(7,9000000,'13','Tiết kiệm 2','2020-09-06'),(8,3000000,'13','Tiết kiệm 3','2020-09-06'),(9,3000000,'14','Tiết kiệm 1','2020-09-06'),(10,3000000,'14','Tiết kiệm 2','2020-09-06'),(11,3000000,'14','Tiết kiệm 3','2020-09-06'),(12,3000000,'14','Tiết kiệm 4','2020-09-06'),(13,3000000,'15','Tiết kiệm 1','2020-09-06');
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
INSERT INTO `userrefreshtokenext` VALUES (8,'1WzNvHWYSSw0MKyGX5jZx7PSPjjMjzgKk4w9DT6f9COx3vA6ffSPy2OyOc575iYrozLKRYgQ9SY0klN9'),(12,'MQJU3t0CjeNMhzN8uyHmPgsNl3U0FC1Cdy96LNj6B0LHC9NnYT47sbL0sDflhjAglSHN5N5RUsB1rLbd'),(13,'3BHhqN6vMgBnylnsLnY1ymcYK5RfLn4H9GC745wlnr8ClPcPoXGXvsB0gl97MqlrUTGG3z0aQRz1Ymws');
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

-- Dump completed on 2020-06-17 19:15:24
