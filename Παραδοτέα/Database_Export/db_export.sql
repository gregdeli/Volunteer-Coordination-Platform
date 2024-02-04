-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 04, 2024 at 03:59 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `volunteer_coordination`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `id` int(11) NOT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `date_announced` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`id`, `admin_id`, `date_announced`) VALUES
(1, 1, '2024-01-28 07:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `announcement_item`
--

CREATE TABLE `announcement_item` (
  `announcement_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement_item`
--

INSERT INTO `announcement_item` (`announcement_id`, `item_id`) VALUES
(1, 1),
(1, 3),
(1, 4),
(1, 6),
(1, 8);

-- --------------------------------------------------------

--
-- Table structure for table `base`
--

CREATE TABLE `base` (
  `latitude` decimal(10,6) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `base`
--

INSERT INTO `base` (`latitude`, `longitude`) VALUES
(38.279359, 21.752501);

-- --------------------------------------------------------

--
-- Table structure for table `cargo`
--

CREATE TABLE `cargo` (
  `rescuer_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(3, 'Blankets'),
(2, 'Bread'),
(1, 'Water');

-- --------------------------------------------------------

--
-- Table structure for table `description`
--

CREATE TABLE `description` (
  `item_id` int(11) NOT NULL,
  `detail_name` varchar(255) NOT NULL,
  `detail_value` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `category_id` int(11) NOT NULL,
  `quantity` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`id`, `name`, `category_id`, `quantity`) VALUES
(1, 'Water Bottle 500ml', 1, 0),
(2, 'Water Bottle 1L', 1, 0),
(3, 'Water Bottle 1.5L', 1, 0),
(4, 'Water Bottle 2L', 1, 0),
(5, 'White Bread', 2, 0),
(6, 'Whole Wheat Bread', 2, 0),
(7, 'Beer Bread', 2, 0),
(8, 'Long Blanket', 3, 0),
(9, 'Medium Blanket', 3, 0),
(10, 'Short Blanket', 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `offer`
--

CREATE TABLE `offer` (
  `id` int(11) NOT NULL,
  `civ_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `quantity_offered` int(11) DEFAULT NULL,
  `date_submitted` datetime DEFAULT NULL,
  `date_undertaken` datetime DEFAULT NULL,
  `date_completed` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `offer`
--

INSERT INTO `offer` (`id`, `civ_id`, `item_id`, `quantity_offered`, `date_submitted`, `date_undertaken`, `date_completed`) VALUES
(1, 8, 1, 6, '2024-01-28 12:23:00', NULL, NULL),
(2, 8, 6, 2, '2024-01-29 13:23:00', NULL, NULL),
(3, 9, 8, 5, '2024-01-30 14:23:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `request`
--

CREATE TABLE `request` (
  `id` int(11) NOT NULL,
  `civ_id` int(11) DEFAULT NULL,
  `item_id` int(11) DEFAULT NULL,
  `num_people` int(11) DEFAULT NULL,
  `date_submitted` datetime DEFAULT NULL,
  `date_undertaken` datetime DEFAULT NULL,
  `date_completed` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `request`
--

INSERT INTO `request` (`id`, `civ_id`, `item_id`, `num_people`, `date_submitted`, `date_undertaken`, `date_completed`) VALUES
(1, 5, 1, 1, '2024-01-25 12:54:00', NULL, NULL),
(2, 5, 6, 2, '2024-01-26 13:54:00', NULL, NULL),
(3, 6, 8, 3, '2024-01-27 14:54:00', NULL, NULL),
(4, 7, 1, 4, '2024-01-28 15:54:00', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rescuer_task`
--

CREATE TABLE `rescuer_task` (
  `rescuer_id` int(11) NOT NULL,
  `request_id` int(11) DEFAULT NULL,
  `offer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `role` enum('ADMIN','RESCUER','CIVILIAN') DEFAULT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `phone` bigint(10) DEFAULT NULL,
  `latitude` decimal(10,6) DEFAULT NULL,
  `longitude` decimal(10,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `password`, `role`, `full_name`, `phone`, `latitude`, `longitude`) VALUES
(1, 'admin', '7c6a180b36896a0a8c02787eeafb0e4c', 'ADMIN', 'John Admin', 6900000001, NULL, NULL),
(2, 'resc1', '6cb75f652a9b52798eb6cf2201057c73', 'RESCUER', 'Tim Radcliff', 6900000002, 38.285946, 21.809167),
(3, 'resc2', '819b0643d6b89dc9b579fdfc9094f28e', 'RESCUER', 'Toula Roberts', 6900000003, 38.237624, 21.731185),
(4, 'resc3', '34cc93ece0ba9e3f6f235d4af979b16c', 'RESCUER', 'Takis Reynolds', 6900000004, 38.264684, 21.806641),
(5, 'civ1', 'db0edd04aaac4506f7edab03ac855d56', 'CIVILIAN', 'Tina Cooper', 6900000005, 38.278856, 21.809778),
(6, 'civ2', '218dd27aebeccecae69ad8408d9a36bf', 'CIVILIAN', 'Grigorios Carter', 6900000006, 38.296733, 21.805340),
(7, 'civ3', '00cdb7bb942cf6b290ceb97d6aca64a3', 'CIVILIAN', 'Bob Clark', 6900000007, 38.236510, 21.769867),
(8, 'civ4', 'b25ef06be3b6948c0bc431da46c2c738', 'CIVILIAN', 'Spyros Clayton', 6900000008, 38.234203, 21.752501),
(9, 'civ5', '5d69dd95ac183c9643780ed7027d128a', 'CIVILIAN', 'Kallinikos Connor', 6900000009, 38.257114, 21.802274);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Indexes for table `announcement_item`
--
ALTER TABLE `announcement_item`
  ADD KEY `announcement_id` (`announcement_id`),
  ADD KEY `specified_item_id` (`item_id`);

--
-- Indexes for table `cargo`
--
ALTER TABLE `cargo`
  ADD KEY `inv_ibfk_1` (`item_id`),
  ADD KEY `inv_ibfk_2` (`rescuer_id`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `description`
--
ALTER TABLE `description`
  ADD KEY `description_ibfk_1` (`item_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD KEY `item_ibfk_1` (`category_id`);

--
-- Indexes for table `offer`
--
ALTER TABLE `offer`
  ADD PRIMARY KEY (`id`),
  ADD KEY `civ_id` (`civ_id`),
  ADD KEY `offer_ibfk_2` (`item_id`);

--
-- Indexes for table `request`
--
ALTER TABLE `request`
  ADD PRIMARY KEY (`id`),
  ADD KEY `civ_id` (`civ_id`),
  ADD KEY `request_ibfk_2` (`item_id`);

--
-- Indexes for table `rescuer_task`
--
ALTER TABLE `rescuer_task`
  ADD KEY `rtask_ibfk_1` (`rescuer_id`),
  ADD KEY `rtask_ibfk_2` (`request_id`),
  ADD KEY `rtask_ibfk_3` (`offer_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `offer`
--
ALTER TABLE `offer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `request`
--
ALTER TABLE `request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `announcement`
--
ALTER TABLE `announcement`
  ADD CONSTRAINT `announcement_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `announcement_item`
--
ALTER TABLE `announcement_item`
  ADD CONSTRAINT `announcement_item_ibfk_1` FOREIGN KEY (`announcement_id`) REFERENCES `announcement` (`id`),
  ADD CONSTRAINT `announcement_item_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`);

--
-- Constraints for table `cargo`
--
ALTER TABLE `cargo`
  ADD CONSTRAINT `inv_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`),
  ADD CONSTRAINT `inv_ibfk_2` FOREIGN KEY (`rescuer_id`) REFERENCES `user` (`id`);

--
-- Constraints for table `description`
--
ALTER TABLE `description`
  ADD CONSTRAINT `description_ibfk_1` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `offer`
--
ALTER TABLE `offer`
  ADD CONSTRAINT `offer_ibfk_1` FOREIGN KEY (`civ_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `offer_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`);

--
-- Constraints for table `request`
--
ALTER TABLE `request`
  ADD CONSTRAINT `request_ibfk_1` FOREIGN KEY (`civ_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `request_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`);

--
-- Constraints for table `rescuer_task`
--
ALTER TABLE `rescuer_task`
  ADD CONSTRAINT `rtask_ibfk_1` FOREIGN KEY (`rescuer_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `rtask_ibfk_2` FOREIGN KEY (`request_id`) REFERENCES `request` (`id`),
  ADD CONSTRAINT `rtask_ibfk_3` FOREIGN KEY (`offer_id`) REFERENCES `offer` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
