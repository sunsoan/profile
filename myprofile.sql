/*
Navicat MySQL Data Transfer

Source Server         : profile
Source Server Version : 50715
Source Host           : localhost:3306
Source Database       : myprofile

Target Server Type    : MYSQL
Target Server Version : 50715
File Encoding         : 65001

Date: 2016-10-06 20:38:54
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for status
-- ----------------------------
DROP TABLE IF EXISTS `status`;
CREATE TABLE `status` (
  `item_name` varchar(255) DEFAULT NULL,
  `click_times` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of status
-- ----------------------------
INSERT INTO `status` VALUES ('education', '8');
INSERT INTO `status` VALUES ('selfEval', '4');
INSERT INTO `status` VALUES ('experience', '14');
INSERT INTO `status` VALUES ('ability', '11');
