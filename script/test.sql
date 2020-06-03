-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jun 03, 2020 at 04:00 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test`
--

-- --------------------------------------------------------

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
CREATE TABLE IF NOT EXISTS `account` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `username` (`username`,`email`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `account`
--

INSERT INTO `account` (`id`, `username`, `password_hash`, `name`, `email`, `phone`, `role`) VALUES
(1, 'dat', '123', 'datt', 'dat@gmail.com', '0333333333333', '1'),
(2, 'admin', '$2a$08$SJlc0p.hXTKYEAi3ted4EOD7yxeEazRqF38KjHpXDmwHUTFBxzePm', 'Nguyen Dat', 'nguyenquocdat2511998@gmail.com', '0343244644', '1'),
(5, 'admin123', '$2a$08$x2L1M3GqxvsfnoCL0dJld.ezK85KNayNDg6B65J565APuAHBIBfJO', 'Nguyen Dat', 'nguyenquocdat2511998123@gmail.com', '0343244644', '1'),
(6, 'adminn', '$2a$08$XPLZsyex9mnOJn2YGW.UBO7BCQBHBYspIjkVrKllzaA7V6rmrNTdq', 'Nguyen Dat', 'nguyenquocdat@gmail.com', '0343244644', '1');

-- --------------------------------------------------------

--
-- Table structure for table `moneyaccount`
--

DROP TABLE IF EXISTS `moneyaccount`;
CREATE TABLE IF NOT EXISTS `moneyaccount` (
  `Number` int(11) NOT NULL AUTO_INCREMENT,
  `Money` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `IdParent` int(11) NOT NULL,
  PRIMARY KEY (`Number`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `moneyaccount`
--

INSERT INTO `moneyaccount` (`Number`, `Money`, `Type`, `IdParent`) VALUES
(1, '50000', '1', 6);

-- --------------------------------------------------------

--
-- Table structure for table `userrefreshtokenext`
--

DROP TABLE IF EXISTS `userrefreshtokenext`;
CREATE TABLE IF NOT EXISTS `userrefreshtokenext` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `refreshToken` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

--
-- Dumping data for table `userrefreshtokenext`
--

INSERT INTO `userrefreshtokenext` (`id`, `refreshToken`) VALUES
(2, 'Z8VYfY9VtT9xv0odioRkvyC80nugyB726TrQujzz4u7GYJfFOKwAArzmPR8fuxZUm1sPuveqeanUeCyd');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
