CREATE TYPE tracking_status AS ENUM (
  'created',
  'package_received',
  'in_transit',
  'out_for_delivery',
  'delivered',
  'returned_to_sender',
  'exception'
);


CREATE TABLE account (
  "id" SERIAL,
  "name" varchar(255),
  "address" varchar(255),
  "phone" varchar(255),
  "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modify_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE location (
  "id" SERIAL,
  "title" varchar(255),
  "city" varchar(255),
  "address" varchar(255),
  "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modify_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);


CREATE TABLE logistics (
  "id" SERIAL,
  "sno" int NOT NULL,
  "tracking_status" tracking_status NOT NULL,
  "estimated_delivery" varchar(255),
  "recipient_id" int NOT NULL,
  "current_location_id" int NOT NULL,
  "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modify_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_account
    FOREIGN KEY(recipient_id)
      REFERENCES account(id),
  CONSTRAINT fk_location
    FOREIGN KEY(current_location_id)
      REFERENCES location(id)
);


CREATE TABLE detail (
  "id" SERIAL,
  "logistics_id" int,
  "date" varchar(255),
  "time" varchar(255),
  "status" tracking_status NOT NULL,
  "location_id" varchar(255),
  "create_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  "modify_time" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);


INSERT INTO location (id, title, city, address)

VALUES
    (7, '台北物流中心', '台北市', '台北市中正區忠孝東路100號'),
    (13, '新竹物流中心', '新竹市', '新竹市東區光復路一段101號'),
    (24, '台中物流中心', '台中市', '台中市⻄區⺠生路200號'),
    (3, '桃園物流中心', '桃園市', '桃園市中壢區中央⻄路三段150號'),
    (18, '高雄物流中心', '高雄市', '高雄市前金區成功一路82號'),
    (9, '彰化物流中心', '彰化市', '彰化市中山路二段250號'),
    (15, '嘉義物流中心', '嘉義市', '嘉義市東區⺠族路380號'),
    (6, '宜蘭物流中心', '宜蘭市', '宜蘭市中山路二段58號'),
    (21, '屏東物流中心', '屏東市', '屏東市⺠生路300號'),
    (1, '花蓮物流中心', '花蓮市', '花蓮市國聯一路100號'),
    (4, '台南物流中心', '台南市', '台南市安平區建平路18號'),
    (11, '南投物流中心', '南投市', '南投市自由路67號'),
    (23, '雲林物流中心', '雲林市', '雲林市中正路五段120號'),
    (14, '基隆物流中心', '基隆市', '基隆市信一路50號'),
    (8, '澎湖物流中心', '澎湖縣', '澎湖縣馬公市中正路200號'),
    (19, '金門物流中心', '金門縣', '金門縣金城鎮⺠生路90號');

INSERT INTO account (id, name, address, phone)
VALUES
    (1234, '賴小賴', '台北市中正區仁愛路二段99號', '091234567'),
    (1235, '陳大明', '新北市板橋區文化路一段100號', '092345678'),
    (1236, '林小芳', '台中市⻄區⺠生路200號', '093456789'),
    (1237, '張美玲', '高雄市前金區成功一路82號', '094567890'),
    (1238, '王小明', '台南市安平區建平路18號', '095678901'),
    (1239, '劉大華', '新竹市東區光復路一段101號', '096789012'),
    (1240, '黃小琳', '彰化市中山路二段250號', '097890123'),
    (1241, '吳美美', '花蓮市國聯一路100號', '098901234'),
    (1242, '蔡小虎', '屏東市⺠生路300號', '099012345'),
    (1243, '鄭大勇', '基隆市信一路50號', '091123456'),
    (1244, '謝小珍', '嘉義市東區⺠族路380號', '092234567'),
    (1245, '潘大為', '宜蘭市中山路二段58號', '093345678'),
    (1246, '趙小梅', '南投市自由路67號', '094456789'),
    (1247, '周小龍', '雲林市中正路五段120號', '095567890'),
    (1248, '李大同', '澎湖縣馬公市中正路200號', '096678901'),
    (1249, '陳小凡', '金門縣金城鎮⺠生路90號', '097789012'),
    (1250, '楊大明', '台北市信義區松仁路50號', '098890123'),
    (1251, '吳小雯', '新北市中和區景平路100號', '099901234');
