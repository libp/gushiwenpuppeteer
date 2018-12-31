/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 80011
Source Host           : 127.0.0.1:3306
Source Database       : nichuiniu

Target Server Type    : MYSQL
Target Server Version : 80011
File Encoding         : 65001

Date: 2018-12-31 15:38:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for tbl_nichuiniu_gushiwen
-- ----------------------------
DROP TABLE IF EXISTS `tbl_nichuiniu_gushiwen`;
CREATE TABLE `tbl_nichuiniu_gushiwen` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Num` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '古诗文网站中编号',
  `Title` varchar(255) DEFAULT NULL COMMENT '文章标题',
  `Author` varchar(255) DEFAULT NULL COMMENT '作者',
  `Content` longtext COMMENT '文章内容',
  `Dynasty` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '朝代',
  `AudioUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL COMMENT '音频地址',
  `Scores` int(11) DEFAULT NULL COMMENT '评分',
  `Tag` varchar(255) DEFAULT NULL COMMENT '文章标签',
  `CreateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `UpdateTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `Deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Num` (`Num`) USING BTREE,
  KEY `Title` (`Title`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=853 DEFAULT CHARSET=utf8;
