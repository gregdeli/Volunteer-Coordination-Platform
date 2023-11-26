create database volunteer_coordination;

use volunteer_coordination;

CREATE TABLE `users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE,
  `password` varchar(255),
  `role` ENUM ('ADMIN', 'RESCUER', 'CIVILIAN'),
  `full_name` varchar(255),
  `phone` integer
);

CREATE TABLE `announcements` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `admin_id` integer,
  `date_announced` datetime,
  FOREIGN KEY (`admin_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `specified_items` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `item` varchar(255),
  `category` varchar(255),
  `details` text,
  `quantity_per_person` float(2, 2)
);

CREATE TABLE `announcement_items` (
  `announcement_id` integer,
  `specified_item_id` integer,
  FOREIGN KEY (`announcement_id`) REFERENCES `announcements` (`id`),
  FOREIGN KEY (`specified_item_id`) REFERENCES `specified_items` (`id`)
);

CREATE TABLE `vehicles` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(255) UNIQUE,
  `password` varchar(255),
  `driver_id` integer,
  `latitude` decimal(10, 6),
  `longitude` decimal(10, 6),
  `max_load` integer,
  `max_tasks` integer,
  FOREIGN KEY (`driver_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `vehicle_items` (
  `vehicle_id` integer,
  `category` varchar(255),
  `item` varchar(255),
  `quantity` integer,
  FOREIGN KEY (`vehicle_id`) REFERENCES `vehicles` (`id`)
);

CREATE TABLE `requests` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `civ_id` integer,
  `date_submitted` datetime,
  `category` varchar(255),
  `item` varchar(255),
  `num_people` integer,
  `undertaken` bool,
  `completed` bool,
  `latitude` decimal(10, 6),
  `longitude` decimal(10, 6),
  FOREIGN KEY (`civ_id`) REFERENCES `users` (`id`)
);

CREATE TABLE `offers` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `civ_id` integer,
  `date_submitted` datetime,
  `announcement_id` integer,
  `quantity_offered` integer,
  `undertaken` bool,
  `completed` bool,
  `latitude` decimal(10, 6),
  `longitude` decimal(10, 6),
  FOREIGN KEY (`civ_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`announcement_id`) REFERENCES `announcements` (`id`)
);

CREATE TABLE `vehicle_tasks` (
  `request_id` integer,
  `offer_id` integer,
  `date_undertaken` datetime,
  FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`),
  FOREIGN KEY (`offer_id`) REFERENCES `offers` (`id`)
);

CREATE TABLE `request_history` (
  `user_id` integer,
  `request_id` integer,
  `date_completed` datetime,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`request_id`) REFERENCES `requests` (`id`)
);

CREATE TABLE `offer_history` (
  `user_id` integer,
  `request_id` integer,
  `date_completed` datetime,
  FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  FOREIGN KEY (`request_id`) REFERENCES `offers` (`id`)
);

CREATE TABLE `base` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `latitude` decimal(10, 6),
  `longitude` decimal(10, 6)
);

CREATE TABLE `available_items` (
  `item_id` integer,
  `quantity` integer,
  `base_id` integer,
  FOREIGN KEY (`item_id`) REFERENCES `specified_items` (`id`),
  FOREIGN KEY (`base_id`) REFERENCES `base` (`id`)
);
