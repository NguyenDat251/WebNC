
CREATE TABLE `RealAccount` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `RealAccount` VALUES ('1', 'Dat1', '123456', 'Nguyen Dat', 'dat@gmail.com', '0343244644');
INSERT INTO `RealAccount` VALUES ('2', 'Dat2', '123456', 'Nguyen Dat 2', 'dat2@gmail.com', '0343244644');
INSERT INTO `RealAccount` VALUES ('3', 'Dat3', '123456', 'Nguyen Dat 3', 'dat3@gmail.com', '0343244644');

CREATE TABLE `account` (
  `Number` int(11) NOT NULL AUTO_INCREMENT,
  `Money` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `IdParent` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

INSERT INTO `account` VALUES ('1', '10000000', 1, '1');
INSERT INTO `account` VALUES ('2', '5000000', 1, '2');
INSERT INTO `account` VALUES ('3', '5000000', 1, '3');
INSERT INTO `account` VALUES ('4', '500000', 2, '1');
INSERT INTO `account` VALUES ('5', '200000', 2, '1');