DROP TABLE IF EXISTS `account`;
CREATE TABLE `account` (
  `id` int(11) NOT NULL UNIQUE AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`username`,`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `MoneyAccount`;
CREATE TABLE `MoneyAccount` (
  `Number` int(11) NOT NULL AUTO_INCREMENT,
  `money` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `idParent` int(11) NOT NULL,
  PRIMARY KEY (`Number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;

INSERT INTO account (username, password_hash, name, email, phone, role) values('dat', '123', 'datt', 'dat@gmail.com', '0333333333333', '1');

DROP TABLE IF EXISTS `userRefreshTokenExt`;
CREATE TABLE `userRefreshTokenExt` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `refreshToken` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ;