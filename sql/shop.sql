/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50539
Source Host           : localhost:3306
Source Database       : shop

Target Server Type    : MYSQL
Target Server Version : 50539
File Encoding         : 65001

Date: 2016-07-03 23:47:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `adminuser`
-- ----------------------------
DROP TABLE IF EXISTS `adminuser`;
CREATE TABLE `adminuser` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(64) DEFAULT '' COMMENT '用户名',
  `user_pass` varchar(256) DEFAULT '' COMMENT '密码',
  `errortime` int(11) DEFAULT '0' COMMENT '登录验证错误时间',
  `errorcount` int(11) DEFAULT '0' COMMENT '登录验证错误次数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of adminuser
-- ----------------------------
INSERT INTO `adminuser` VALUES ('1', 'admin', 'eyJpdiI6IlppSmV1MDJoZHhvZkFoZWhzbW1BWkE9PSIsInZhbHVlIjoicGVpUmh0MHhSd3VqT1wvNjl1QnhBclE9PSIsIm1hYyI6Ijg4NDE3MWMwYmExMzFmNDM0MzEzM2E0M2FiYTQ1YjIyZTM1ODVhOTM5NzQ3ZTQwNTg1OThhMmRmNjk4N2Q3NmUifQ==', '0', '0');
INSERT INTO `adminuser` VALUES ('2', 'lqf', 'eyJpdiI6IlppSmV1MDJoZHhvZkFoZWhzbW1BWkE9PSIsInZhbHVlIjoicGVpUmh0MHhSd3VqT1wvNjl1QnhBclE9PSIsIm1hYyI6Ijg4NDE3MWMwYmExMzFmNDM0MzEzM2E0M2FiYTQ1YjIyZTM1ODVhOTM5NzQ3ZTQwNTg1OThhMmRmNjk4N2Q3NmUifQ==', '0', '0');

-- ----------------------------
-- Table structure for `category`
-- ----------------------------
DROP TABLE IF EXISTS `category`;
CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `title` varchar(50) DEFAULT '' COMMENT '//名称',
  `img` varchar(255) DEFAULT '' COMMENT '图标',
  `sort` tinyint(4) DEFAULT '0' COMMENT '排序规则',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of category
-- ----------------------------
INSERT INTO `category` VALUES ('1', '分类1', '20160627220439.png', '1');
INSERT INTO `category` VALUES ('2', '分类2', '20160627220439.png', '2');
INSERT INTO `category` VALUES ('3', '分类3', '20160627220439.png', '3');
INSERT INTO `category` VALUES ('4', '分类4', '20160627220439.png', '4');
INSERT INTO `category` VALUES ('5', '分类5', '20160627220439.png', '5');

-- ----------------------------
-- Table structure for `config`
-- ----------------------------
DROP TABLE IF EXISTS `config`;
CREATE TABLE `config` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of config
-- ----------------------------
INSERT INTO `config` VALUES ('1', 'myApp');

-- ----------------------------
-- Table structure for `shopitem`
-- ----------------------------
DROP TABLE IF EXISTS `shopitem`;
CREATE TABLE `shopitem` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '' COMMENT '名称',
  `category` int(11) DEFAULT '0' COMMENT '类别ID',
  `content` text COMMENT '商品图集',
  `describe` varchar(255) DEFAULT NULL COMMENT '描述',
  `prime_price` float(11,0) DEFAULT '0' COMMENT '原价',
  `cur_price` float(11,0) DEFAULT '0' COMMENT '现价',
  `stock` int(11) DEFAULT '-1' COMMENT '库存 -1 无限制',
  `buynum` int(11) DEFAULT NULL COMMENT '购买人数',
  `indeximg` varchar(255) DEFAULT '' COMMENT '主图片',
  `showimg` text COMMENT '展示图片',
  `spec` text COMMENT '规格',
  `activity` tinyint(4) DEFAULT '0' COMMENT '活动',
  `showindex` tinyint(4) DEFAULT '0' COMMENT '是否在主页显示',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of shopitem
-- ----------------------------
INSERT INTO `shopitem` VALUES ('5', '台湾 正品bitplay iPhone6 4.7 照相机手机壳 1', '4', '56f35f78a4534.jpg', '台湾 正品bitplay iPhone6 4.7 照相机手机壳 ', '122', '33', '-1', '11', '56974c014e6c8.jpg', '56a1f2d2219f6.jpg;56a1f55e6a6a2.jpg;56974c014e6c8.jpg', '{\"颜色\":[\"红\",\"黄\",\"蓝\"],\"尺寸\":[\"X\",\"XL\"]}', '0', '1');
INSERT INTO `shopitem` VALUES ('6', '云中歌2', '1', '56f35f79e74cf.jpg', '云中歌2', '11', '112', '-1', '33', '56a1f2d2219f6.jpg', '56974f536b240.jpg;homeSlide-01.jpg;produce-01.jpg', '{\"颜色\":[\"红\",\"黄\",\"蓝\"],\"尺寸\":[\"X\",\"XL\"]}', '0', '1');
INSERT INTO `shopitem` VALUES ('7', '北鼎养生壶 K106 2L333', '1', '56f35f793a7e0.jpg', '北鼎养生壶 K106 2L111', '12', '23', '-1', '1', '56a1f2d2219f6.jpg', '56974f536b240.jpg;homeSlide-01.jpg;produce-01.jpg', '{\"颜色\":[\"红\",\"黄\",\"蓝\"],\"尺寸\":[\"X\",\"XL\"]}', '0', '1');
