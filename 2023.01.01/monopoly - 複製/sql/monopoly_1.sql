-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1:3307
-- 產生時間： 2022-12-16 05:23:43
-- 伺服器版本： 10.4.25-MariaDB
-- PHP 版本： 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `monopoly`
--

-- --------------------------------------------------------

--
-- 資料表結構 `charactor`
--

CREATE TABLE `charactor` (
  `charactor_id` int(11) NOT NULL,
  `img` varchar(255) NOT NULL,
  `charactor_name` varchar(255) NOT NULL,
  `charactor_info` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `charactor`
--

INSERT INTO `charactor` (`charactor_id`, `img`, `charactor_name`, `charactor_info`) VALUES
(1, '角色1掛角', '掛角', '<h3>喜愛糖葫蘆的女子</h3><p>熱情又帶點痞痞的個性<br>想引人注目<br>所以染了鮮豔的粉紅辮子<br>手裡總是拿著一串糖葫蘆</p>'),
(2, '角色2莯沐', '莯沐', '<h3>台灣一間茶館的老闆</h3><p>曾在唐人街生活<br>在館內隨時帶著茶壺<br>個性謹慎穩重<br>但臨機應變能力不足</p>'),
(3, '角色3特雷文', '特雷文', '<h3>俄羅斯傭兵</h3><p>喜歡小熊造型的物品<br>用烈酒醃過的肉製品<br>身上總是背著烤串<br><br></p>'),
(4, '角色4陳冠宇', '陳冠宇', '<h3>台灣高中生</h3><p>喜歡路邊攤炸物<br>身上常有胡椒粉味<br>隨身攜帶MP3<br>偶像是饒舌歌手</p>'),
(5, '角色5林夏在', '林夏在', '<h3>喜愛喝手搖飲的男子</h3><p>悶騷 自卑<br>但同時某些方面超自戀<br>有時會說出不符年齡的老態發言<br>沒有邏輯的話</p>'),
(6, '角色6葡萄', '葡萄', '<h3>ㄎㄧㄤㄎㄧㄤ的瞌睡蟲</h3><p>葡萄吃太多<br>所以變成鮮豔的紫色布丁頭<br>常常無所事事<br>總是一不小心就打瞌睡</p>'),
(7, '角色7希椏', '希椏', '<h3>蝦子魔人</h3><p>希椏念快一點就變蝦<br>去蒸鮮都只吃蝦子壽司<br>喜歡拉拉熊<br>總是拉著他的熊熊</p>'),
(8, '角色8不會冷', '不會冷', '<h3>每天都像夏天</h3><p>一年四季都穿短袖短裙<br>上輩子可能是企鵝所以不會冷<br>舌頭很短<br>常常哈哈大笑</p>');

-- --------------------------------------------------------

--
-- 資料表結構 `player`
--

CREATE TABLE `player` (
  `player_id` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `identity` int(11) NOT NULL,
  `player_name` varchar(255) NOT NULL,
  `character_id` int(11) DEFAULT NULL,
  `win` int(11) DEFAULT NULL,
  `lost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `player`
--

INSERT INTO `player` (`player_id`, `password_hash`, `identity`, `player_name`, `character_id`, `win`, `lost`) VALUES
('1', '$2y$10$cSw/5eetBupW02oRLgKu7.pnxnhQs6R0FxGY1rzbBDK0QnE/P.Y4i', 1, '1', 3, 0, 0),
('11111111111', '$2y$10$QgjLvzvqE.gWXox92syW1.veUewpbOBdEK8E/rKz31uZEpVfDAdCa', 1, '1', NULL, 0, 0),
('12', '$2y$10$pwdouPBOCxXhwXodlPDweuzNmmzSGsclVMYcCaO7S0m.PtM.G1iSm', 1, '1', NULL, 0, 0),
('sunny0809', '$2y$10$8qili7WjEfsIkqu5.E/M9.XKDNZ7PDdxClLJogT7aOEBgY0VQUDxC', 1, '林宸希', 8, 0, 0);

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `charactor`
--
ALTER TABLE `charactor`
  ADD PRIMARY KEY (`charactor_id`);

--
-- 資料表索引 `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`player_id`),
  ADD KEY `customer_id` (`character_id`);

--
-- 已傾印資料表的限制式
--

--
-- 資料表的限制式 `player`
--
ALTER TABLE `player`
  ADD CONSTRAINT `player_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `charactor` (`charactor_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
