CREATE DATABASE MANAGER;

CREATE TABLE `member` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `birthdate` datetime DEFAULT NULL,
  `projectID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `member` VALUES ('1', 'Dat 1', '0343244644', '2020-01-01', 1);
INSERT INTO `member` VALUES ('2', 'Dat 2', '0343244644', '2020-01-01', 2);
INSERT INTO `member` VALUES ('3', 'Dat 3', '0343244644', '2020-01-01', 3);

INSERT INTO `member` VALUES ('4', 'Dat 1', '0343244644', '2020-01-01', 4);
INSERT INTO `member` VALUES ('5', 'Dat 2', '0343244644', '2020-01-01', 5);
INSERT INTO `member` VALUES ('6', 'Dat 3', '0343244644', '2020-01-01', 6);

INSERT INTO `member` VALUES ('7', 'Dat 1', '0343244644', '2020-01-01', 7);
INSERT INTO `member` VALUES ('8', 'Dat 2', '0343244644', '2020-01-01', 8);
INSERT INTO `member` VALUES ('9', 'Dat 3', '0343244644', '2020-01-01', 9);

INSERT INTO `member` VALUES ('10', 'Dat 1', '0343244644', '2020-01-01', 10);
INSERT INTO `member` VALUES ('11', 'Dat 2', '0343244644', '2020-01-01', 11);
INSERT INTO `member` VALUES ('12', 'Dat 3', '0343244644', '2020-01-01', 12);

CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) ,
  `description` varchar(255) ,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

INSERT INTO `project` VALUES ('1', 'project 1', 'abcaaaaaaaaaaaaaa');
INSERT INTO `project` VALUES ('2', 'project 2', 'abcaaaaaaaaaaaaaa');
INSERT INTO `project` VALUES ('3', 'project 3', 'abcaaaaaaaaaaaaaa');
