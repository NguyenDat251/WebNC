
DROP TABLE IF EXISTS `account`;
DROP TABLE IF EXISTS `RealAccount`;

DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- INSERT INTO `account` VALUES ('1', 'Dat1', '123456', 'Nguyen Dat', 'dat@gmail.com', '0343244644');
-- INSERT INTO `account` VALUES ('2', 'Dat2', '123456', 'Nguyen Dat 2', 'dat2@gmail.com', '0343244644');
-- INSERT INTO `account` VALUES ('3', 'Dat3', '123456', 'Nguyen Dat 3', 'dat3@gmail.com', '0343244644');

DROP TABLE IF EXISTS `MoneyAccount`;
CREATE TABLE `MoneyAccount` (
  `Number` int(11) NOT NULL AUTO_INCREMENT,
  `Money` varchar(255) NOT NULL,
  `Type` varchar(255) NOT NULL,
  `IdParent` int(11) NOT NULL,
  PRIMARY KEY (`Number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

-- INSERT INTO `MoneyAccount` VALUES ('1', '10000000', 1, '1');
-- INSERT INTO `MoneyAccount` VALUES ('2', '5000000', 1, '2');
-- INSERT INTO `MoneyAccount` VALUES ('3', '5000000', 1, '3');
-- INSERT INTO `MoneyAccount` VALUES ('4', '500000', 2, '1');
-- INSERT INTO `MoneyAccount` VALUES ('5', '200000', 2, '1');

INSERT INTO account (username, password_hash, name, email, phone, role) values('dat', '123', 'datt', 'dat@gmail.com', '0333333333333', '1')

DROP TABLE IF EXISTS `userRefreshTokenExt`;
CREATE TABLE `userRefreshTokenExt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `refreshToken` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;