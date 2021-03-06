CREATE TABLE `pl_creditconsult` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `product_id` int(11) DEFAULT NULL COMMENT '产品ID',
  `name` varchar(100) DEFAULT NULL COMMENT '姓名',
  `mobile` varchar(20) DEFAULT NULL COMMENT '移动电话',
  `idcard` varchar(20) DEFAULT NULL COMMENT '身份证号码',
  `creator` int(11) DEFAULT NULL COMMENT '咨询录入者ID',
  `curuserid` int(11) DEFAULT NULL COMMENT '当前操作者ID',
  `customer_manager` int(11) DEFAULT NULL COMMENT '报单人',
  `create_time` datetime DEFAULT NULL COMMENT '创建日期',
  `process_instance_id` varchar(16) DEFAULT NULL COMMENT '流程ID',
  `status` varchar(64) DEFAULT NULL COMMENT '咨询状态',
  `modifier` int(11) DEFAULT NULL COMMENT '修改者',
  `modify_time` datetime DEFAULT NULL COMMENT '修改时间',
  `project_id` int(11) DEFAULT NULL COMMENT '项目编号',
  `remark` varchar(255) DEFAULT NULL COMMENT '备注',
  `extension_time` int(11) unsigned zerofill DEFAULT '00000000000' COMMENT '成功展期次数',
  `business_origin` varchar(64) DEFAULT NULL COMMENT '业务来源',
  `customerUuid` varchar(64) DEFAULT NULL COMMENT '关联客户表的UUID',
  PRIMARY KEY (`id`),
  KEY `process_ins_index` (`process_instance_id`) USING BTREE,
  KEY `customer_manager` (`customer_manager`) USING BTREE,
  KEY `project_id_index` (`project_id`) USING BTREE,
  KEY `mobile` (`mobile`) USING BTREE,
  KEY `name` (`name`) USING BTREE,
  KEY `product_id` (`product_id`) USING BTREE,
  KEY `status` (`status`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8 COMMENT='咨询表';