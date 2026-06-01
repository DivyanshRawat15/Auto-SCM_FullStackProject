-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 04, 2026 at 04:58 AM
-- Server version: 8.0.45-0ubuntu0.22.04.1
-- PHP Version: 8.3.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `automobiledb`
--

-- --------------------------------------------------------

--
-- Table structure for table `bookings`
--

CREATE TABLE `bookings` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `variant_id` int DEFAULT NULL,
  `booking_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('PENDING','CONFIRMED','CANCELLED') DEFAULT 'PENDING'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `brands`
--

CREATE TABLE `brands` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `vehicle_type_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `brands`
--

INSERT INTO `brands` (`id`, `name`, `image_url`, `vehicle_type_id`) VALUES
(1, 'Tata', 'https://logowik.com/content/uploads/images/t_tata-motors2088.jpg', 1),
(2, 'Mahindra', 'https://logowik.com/content/uploads/images/mahindra-suv1293.jpg', 1),
(3, 'Hyundai', 'https://www.svgrepo.com/show/446878/hyundai.svg', 1),
(4, 'Maruti Suzuki', 'https://www.svgrepo.com/show/446927/suzuki.svg', 1),
(5, 'Kia', 'https://www.svgrepo.com/show/446883/kia.svg', 1),
(6, 'Toyota', 'https://www.svgrepo.com/show/446931/toyota.svg', 1),
(7, 'Honda Car', 'https://www.svgrepo.com/show/446876/honda.svg', 1),
(8, 'MG', 'https://logowik.com/content/uploads/images/t_mg2583.jpg', 1),
(9, 'Skoda', 'https://www.svgrepo.com/show/446925/skoda.svg', 1),
(10, 'Volkswagen', 'https://www.svgrepo.com/show/446932/volkswagen.svg', 1),
(11, 'Renault', 'https://www.svgrepo.com/show/446915/renault.svg', 1),
(12, 'Nissan', 'https://www.svgrepo.com/show/446904/nissan.svg', 1),
(13, 'Royal Enfield', 'https://logowik.com/content/uploads/images/t_royal-enfield6316.jpg', 2),
(14, 'Yamaha', 'https://logowik.com/content/uploads/images/t_yamaha7954.logowik.com.webp', 2),
(15, 'KTM', 'https://logowik.com/content/uploads/images/t_ktm-sportmotorcycles1666.jpg', 2),
(16, 'Hero MotoCorp', 'https://logowik.com/content/uploads/images/t_hero-motocorp-horizontal9418.logowik.com.webp', 2),
(17, 'Honda Two Wheelers', 'https://logowik.com/content/uploads/images/t_honda-motorcycles2103.logowik.com.webp', 2),
(18, 'TVS', 'https://logowik.com/content/uploads/images/t_tvs-motor-company1333.jpg', 2),
(19, 'Bajaj Auto', 'https://images.unsplash.com/photo-1614165936126-2ed18e471b1b?auto=format&fit=crop&q=80&w=400', 2),
(20, 'Suzuki Motorcycle', 'https://logowik.com/content/uploads/images/t_197_suzuki.jpg', 2),
(21, 'Ather Energy', 'https://images.unsplash.com/photo-1620054700085-fe6a25bdfa46?auto=format&fit=crop&q=80&w=400', 2),
(22, 'Ola Electric', 'https://images.unsplash.com/photo-1620610931500-1c0edc897f26?auto=format&fit=crop&q=80&w=400', 2),
(23, 'Jawa', 'https://images.unsplash.com/photo-1553702434-d2e74284b3ca?auto=format&fit=crop&q=80&w=400', 2),
(24, 'Yezdi', 'https://images.unsplash.com/photo-1569300329976-5d4ad011e405?auto=format&fit=crop&q=80&w=400', 2),
(25, 'Ashok Leyland', 'https://logowik.com/content/uploads/images/t_ashok-leyland8477.jpg', 3),
(26, 'BharatBenz', 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=400', 3),
(27, 'Tata Motors Commercial', 'https://logowik.com/content/uploads/images/t_tata9442.logowik.com.webp', 3),
(28, 'Eicher Motors', 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=400', 3),
(29, 'Mahindra Commercial', 'https://images.unsplash.com/photo-1473212854964-ea2f7dce0a80?auto=format&fit=crop&q=80&w=400', 3),
(30, 'Volvo Trucks', 'https://www.svgrepo.com/show/446933/volvo.svg', 3),
(31, 'Scania', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 3),
(32, 'Force Motors', 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=400', 3),
(33, 'SML Isuzu', 'https://www.svgrepo.com/show/446879/isuzu.svg', 3),
(34, 'MAN Trucks', 'https://images.unsplash.com/photo-1473212854964-ea2f7dce0a80?auto=format&fit=crop&q=80&w=400', 3),
(35, 'AMW Motors', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 3),
(36, 'Kamaz Motors', 'https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?auto=format&fit=crop&q=80&w=400', 3);

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `brand_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `models`
--

INSERT INTO `models` (`id`, `name`, `image_url`, `brand_id`) VALUES
(1, 'Nexon', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 1),
(2, 'Safari', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 1),
(3, 'Harrier', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 1),
(4, 'Tiago', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 1),
(5, 'Altroz', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 1),
(6, 'Punch', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 1),
(7, 'Tigor', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 1),
(8, 'Hexa', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 1),
(9, 'Bolt', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 1),
(10, 'Aria', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 1),
(11, 'XUV700', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 2),
(12, 'Thar', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 2),
(13, 'Scorpio-N', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 2),
(14, 'Bolero', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 2),
(15, 'XUV300', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 2),
(16, 'Marazzo', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 2),
(17, 'Alturas G4', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 2),
(18, 'KUV100', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 2),
(19, 'TUV300', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 2),
(20, 'Verito', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 2),
(21, 'Creta', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 3),
(22, 'Verna', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 3),
(23, 'Venue', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 3),
(24, 'i20', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 3),
(25, 'Tucson', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 3),
(26, 'Alcazar', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 3),
(27, 'Aura', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 3),
(28, 'Santro', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 3),
(29, 'Grand i10', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 3),
(30, 'Kona', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 3),
(31, 'Swift', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 4),
(32, 'Brezza', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 4),
(33, 'Baleno', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 4),
(34, 'Ertiga', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 4),
(35, 'Dzire', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 4),
(36, 'Wagon R', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 4),
(37, 'Alto', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 4),
(38, 'Celerio', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 4),
(39, 'Ignis', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 4),
(40, 'XL6', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 4),
(41, 'Seltos', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 5),
(42, 'Sonet', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 5),
(43, 'Carens', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 5),
(44, 'Carnival', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 5),
(45, 'EV6', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 5),
(46, 'Rio', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 5),
(47, 'Sportage', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 5),
(48, 'Niro', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 5),
(49, 'Soul', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 5),
(50, 'Stinger', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 5),
(51, 'Innova', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 6),
(52, 'Fortuner', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 6),
(53, 'Glanza', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 6),
(54, 'Urban Cruiser', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 6),
(55, 'Camry', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 6),
(56, 'Vellfire', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 6),
(57, 'Yaris', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 6),
(58, 'Etios', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 6),
(59, 'Corolla', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 6),
(60, 'Hilux', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 6),
(61, 'City', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 7),
(62, 'Amaze', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 7),
(63, 'Elevate', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 7),
(64, 'WR-V', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 7),
(65, 'Jazz', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 7),
(66, 'CR-V', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 7),
(67, 'BR-V', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 7),
(68, 'Accord', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 7),
(69, 'Civic', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 7),
(70, 'Brio', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 7),
(71, 'Hector', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 8),
(72, 'Astor', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 8),
(73, 'Gloster', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 8),
(74, 'Comet EV', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 8),
(75, 'ZS EV', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 8),
(76, 'Hector Plus', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 8),
(77, 'Baojun 530', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 8),
(78, 'MG3', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 8),
(79, 'MG5', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 8),
(80, 'MG6', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 8),
(81, 'Kushaq', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 9),
(82, 'Slavia', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 9),
(83, 'Kodiaq', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 9),
(84, 'Octavia', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 9),
(85, 'Superb', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 9),
(86, 'Rapid', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 9),
(87, 'Fabia', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 9),
(88, 'Yeti', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 9),
(89, 'Kamiq', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 9),
(90, 'Scala', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 9),
(91, 'Taigun', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 10),
(92, 'Virtus', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 10),
(93, 'Tiguan', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 10),
(94, 'Polo', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 10),
(95, 'Vento', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 10),
(96, 'Ameo', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 10),
(97, 'Jetta', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 10),
(98, 'Passat', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 10),
(99, 'T-Roc', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 10),
(100, 'Touareg', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 10),
(101, 'Kiger', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 11),
(102, 'Kwid', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 11),
(103, 'Triber', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 11),
(104, 'Duster', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 11),
(105, 'Captur', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 11),
(106, 'Fluence', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 11),
(107, 'Koleos', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 11),
(108, 'Pulse', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 11),
(109, 'Scala', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 11),
(110, 'Lodgy', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 11),
(111, 'Magnite', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 12),
(112, 'Kicks', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 12),
(113, 'Sunny', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 12),
(114, 'Micra', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 12),
(115, 'Terrano', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 12),
(116, 'Evalia', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 12),
(117, 'X-Trail', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 12),
(118, 'Teana', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 12),
(119, 'Leaf', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 12),
(120, 'Patrol', 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4?auto=format&fit=crop&q=80&w=400', 12),
(121, 'Classic 350', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 13),
(122, 'Himalayan', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 13),
(123, 'Meteor', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 13),
(124, 'Interceptor', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 13),
(125, 'Continental GT', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 13),
(126, 'Hunter 350', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 13),
(127, 'Bullet 350', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 13),
(128, 'Scram 411', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 13),
(129, 'MT-15', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 14),
(130, 'R15', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 14),
(131, 'FZ', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 14),
(132, 'Fascino', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 14),
(133, 'RayZR', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 14),
(134, 'Aerox', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 14),
(135, 'FZ-X', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 14),
(136, 'R3', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 14),
(137, 'Duke 390', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 15),
(138, 'RC 200', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 15),
(139, 'Adventure 390', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 15),
(140, 'Duke 200', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 15),
(141, 'RC 390', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 15),
(142, 'Duke 250', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 15),
(143, 'Adventure 250', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 15),
(144, 'RC 125', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 15),
(145, 'Splendor', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 16),
(146, 'Xpulse', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 16),
(147, 'Passion', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 16),
(148, 'Glamour', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 16),
(149, 'Destini', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 16),
(150, 'Maestro', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 16),
(151, 'Pleasure', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 16),
(152, 'Super Splendor', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 16),
(153, 'Activa', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 17),
(154, 'Shine', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 17),
(155, 'Dio', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 17),
(156, 'Unicorn', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 17),
(157, 'Hornet', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 17),
(158, 'Grazia', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 17),
(159, 'Livo', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 17),
(160, 'X-Blade', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 17),
(161, 'Apache RTR', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 18),
(162, 'Jupiter', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 18),
(163, 'Ntorq', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 18),
(164, 'Raider', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 18),
(165, 'Radeon', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 18),
(166, 'Sport', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 18),
(167, 'Star City+', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 18),
(168, 'iQube', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 18),
(169, 'Pulsar', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 19),
(170, 'Dominar', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 19),
(171, 'Platina', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 19),
(172, 'CT 100', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 19),
(173, 'Avenger', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 19),
(174, 'Chetak', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 19),
(175, 'Discover', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 19),
(176, 'V15', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 19),
(177, 'Access', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 20),
(178, 'Gixxer', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 20),
(179, 'Burgman', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 20),
(180, 'Avenis', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 20),
(181, 'V-Strom', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 20),
(182, 'Intruder', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 20),
(183, 'Hayabusa', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 20),
(184, 'Katana', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 20),
(185, '450X', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 21),
(186, '450 Plus', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 21),
(187, '450S', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 21),
(188, 'Rizta', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 21),
(189, 'Ather One', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 21),
(190, 'Ather Two', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 21),
(191, 'Ather Energy 1', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 21),
(192, 'Ather Gen 3', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 21),
(193, 'S1 Pro', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 22),
(194, 'S1 Air', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 22),
(195, 'S1 X', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 22),
(196, 'S1 Plus', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 22),
(197, 'S1 Lite', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 22),
(198, 'S1 Gen2', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 22),
(199, 'S1 Max', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 22),
(200, 'S1 Prime', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 22),
(201, 'Jawa 42', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 23),
(202, 'Jawa Perak', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 23),
(203, 'Jawa Standard', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 23),
(204, 'Jawa 42 Bobber', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 23),
(205, 'Jawa 300', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 23),
(206, 'Jawa Classic', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 23),
(207, 'Jawa Scrambler', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 23),
(208, 'Jawa Cafe', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 23),
(209, 'Scrambler', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 24),
(210, 'Adventure', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 24),
(211, 'Roadster', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 24),
(212, 'Yezdi 250', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 24),
(213, 'Yezdi 350', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 24),
(214, 'Yezdi Classic', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 24),
(215, 'Yezdi Monarch', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 24),
(216, 'Yezdi Roadking', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=400', 24),
(217, 'Dost', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 25),
(218, 'Ecomet', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 25),
(219, 'Boss', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 25),
(220, 'Captain', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 25),
(221, 'U-Truck', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 25),
(222, '1923C', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 26),
(223, '2823R', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 26),
(224, '1217C', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 26),
(225, '3528C', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 26),
(226, '4228R', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 26),
(227, 'Signa', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 27),
(228, 'Prima', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 27),
(229, 'LPT', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 27),
(230, 'Ace', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 27),
(231, 'Winger', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 27),
(232, 'Pro 2000', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 28),
(233, 'Pro 3000', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 28),
(234, 'Pro 6000', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 28),
(235, 'Pro 8000', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 28),
(236, 'Skyline', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 28),
(237, 'Bolero Pik-Up', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 29),
(238, 'Furio', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 29),
(239, 'Blazo', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 29),
(240, 'Supro', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 29),
(241, 'Jeeto', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 29),
(242, 'FMX', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 30),
(243, 'FH', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 30),
(244, 'FM', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 30),
(245, 'FL', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 30),
(246, 'FE', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 30),
(247, 'R-Series', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 31),
(248, 'G-Series', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 31),
(249, 'P-Series', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 31),
(250, 'S-Series', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 31),
(251, 'L-Series', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 31),
(252, 'Traveller', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 32),
(253, 'Urbania', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 32),
(254, 'Trax', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 32),
(255, 'Gurkha', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 32),
(256, 'Balwan', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 32),
(257, 'Samrat', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 33),
(258, 'Sartaj', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 33),
(259, 'Super', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 33),
(260, 'Executive', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 33),
(261, 'Prestige', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 33),
(262, 'CLA', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 34),
(263, 'TGS', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 34),
(264, 'TGX', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 34),
(265, 'TGM', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 34),
(266, 'TGL', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 34),
(267, '2518', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 35),
(268, '3118', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 35),
(269, '2523', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 35),
(270, '4923', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 35),
(271, '2528', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 35),
(272, '6540', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 36),
(273, '6520', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 36),
(274, '65115', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 36),
(275, '5490', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 36),
(276, '54115', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=400', 36);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('ADMIN','USER') DEFAULT 'USER',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `created_at`) VALUES
(1, 'System Admin', 'admin@autoscm.com', '$2b$10$uFpvxF3ybZpfNrxFASq1ceuOE7NoZoyZB44KPDe3Cyah5iTR7rFIe', 'ADMIN', '2026-04-07 12:53:02');

-- --------------------------------------------------------

--
-- Table structure for table `user_activity`
--

CREATE TABLE `user_activity` (
  `id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  `action` enum('VIEW_VEHICLE','COMPARE_VEHICLES','BOOK_TEST_DRIVE') NOT NULL,
  `entity_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_activity`
--

INSERT INTO `user_activity` (`id`, `user_id`, `action`, `entity_id`, `created_at`) VALUES
(1, NULL, 'VIEW_VEHICLE', 18, '2026-04-07 12:57:27'),
(2, NULL, 'VIEW_VEHICLE', 18, '2026-04-07 12:57:27'),
(3, NULL, 'VIEW_VEHICLE', 18, '2026-04-07 12:57:30'),
(4, NULL, 'VIEW_VEHICLE', 18, '2026-04-07 12:57:30'),
(5, NULL, 'VIEW_VEHICLE', 18, '2026-04-09 10:40:01'),
(6, NULL, 'VIEW_VEHICLE', 18, '2026-04-09 10:40:01'),
(7, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 10:40:04'),
(8, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 10:40:06'),
(9, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 10:40:06'),
(10, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 10:40:09'),
(11, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 10:40:09'),
(12, NULL, 'COMPARE_VEHICLES', 16, '2026-04-09 10:40:09'),
(13, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 10:40:11'),
(14, NULL, 'COMPARE_VEHICLES', 16, '2026-04-09 10:40:11'),
(15, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 10:40:11'),
(16, NULL, 'COMPARE_VEHICLES', 16, '2026-04-09 10:40:11'),
(17, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 10:40:11'),
(18, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 10:40:11'),
(19, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 10:40:17'),
(20, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 10:40:17'),
(21, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 10:40:17'),
(22, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 10:40:17'),
(23, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 10:40:18'),
(24, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 10:40:18'),
(25, NULL, 'VIEW_VEHICLE', 18, '2026-04-09 10:48:26'),
(26, NULL, 'VIEW_VEHICLE', 18, '2026-04-09 10:48:26'),
(27, NULL, 'VIEW_VEHICLE', 2, '2026-04-09 10:48:33'),
(28, NULL, 'VIEW_VEHICLE', 2, '2026-04-09 10:48:33'),
(29, NULL, 'VIEW_VEHICLE', 3, '2026-04-09 10:48:36'),
(30, NULL, 'VIEW_VEHICLE', 3, '2026-04-09 10:48:36'),
(31, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:23:00'),
(32, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:23:00'),
(34, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:23:09'),
(35, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:23:09'),
(37, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:23:21'),
(39, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:23:21'),
(40, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:23:21'),
(42, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:23:21'),
(43, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:23:31'),
(45, NULL, 'COMPARE_VEHICLES', 12, '2026-04-09 11:23:31'),
(46, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:23:31'),
(47, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:23:31'),
(49, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:23:31'),
(50, NULL, 'COMPARE_VEHICLES', 12, '2026-04-09 11:23:31'),
(51, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:43:18'),
(52, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:43:18'),
(54, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:43:18'),
(55, NULL, 'COMPARE_VEHICLES', 12, '2026-04-09 11:43:18'),
(56, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:43:18'),
(58, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:43:18'),
(59, NULL, 'COMPARE_VEHICLES', 12, '2026-04-09 11:43:18'),
(60, NULL, 'COMPARE_VEHICLES', 12, '2026-04-09 11:43:18'),
(61, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:43:18'),
(62, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:43:18'),
(64, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:43:18'),
(66, NULL, 'COMPARE_VEHICLES', 12, '2026-04-09 11:43:18'),
(67, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:43:24'),
(69, NULL, 'COMPARE_VEHICLES', 12, '2026-04-09 11:43:24'),
(70, NULL, 'COMPARE_VEHICLES', 12, '2026-04-09 11:43:24'),
(72, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:43:24'),
(74, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:43:25'),
(76, NULL, 'COMPARE_VEHICLES', 15, '2026-04-09 11:43:25'),
(82, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:43:51'),
(84, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:43:53'),
(85, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 11:43:53'),
(86, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:43:54'),
(88, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 11:43:54'),
(90, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:43:54'),
(91, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 11:43:54'),
(93, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 11:44:02'),
(95, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 11:44:02'),
(97, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 11:44:14'),
(98, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:44:14'),
(100, NULL, 'COMPARE_VEHICLES', 17, '2026-04-09 11:44:14'),
(101, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:44:14'),
(102, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:44:29'),
(105, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:44:29'),
(143, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:45:05'),
(144, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:45:05'),
(149, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:51:46'),
(150, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:51:47'),
(152, NULL, 'COMPARE_VEHICLES', 13, '2026-04-09 11:51:47'),
(154, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:51:48'),
(155, NULL, 'COMPARE_VEHICLES', 13, '2026-04-09 11:51:48'),
(156, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:51:48'),
(158, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:51:55'),
(159, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:51:55'),
(160, NULL, 'COMPARE_VEHICLES', 13, '2026-04-09 11:51:55'),
(162, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:51:55'),
(163, NULL, 'COMPARE_VEHICLES', 13, '2026-04-09 11:51:55'),
(164, NULL, 'COMPARE_VEHICLES', 11, '2026-04-09 11:51:55'),
(166, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:51:57'),
(167, NULL, 'COMPARE_VEHICLES', 13, '2026-04-09 11:51:57'),
(169, NULL, 'COMPARE_VEHICLES', 18, '2026-04-09 11:51:57'),
(170, NULL, 'COMPARE_VEHICLES', 13, '2026-04-09 11:51:57'),
(172, NULL, 'COMPARE_VEHICLES', 13, '2026-04-09 11:51:58'),
(173, NULL, 'COMPARE_VEHICLES', 13, '2026-04-09 11:51:58');

-- --------------------------------------------------------

--
-- Table structure for table `user_preferences`
--

CREATE TABLE `user_preferences` (
  `user_id` int NOT NULL,
  `preferred_fuel` varchar(50) DEFAULT NULL,
  `budget_limit` decimal(15,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `variants`
--

CREATE TABLE `variants` (
  `id` int NOT NULL,
  `model_id` int DEFAULT NULL,
  `fuel_type` varchar(50) DEFAULT NULL,
  `price` decimal(15,2) DEFAULT NULL,
  `engine` varchar(100) DEFAULT NULL,
  `mileage` varchar(50) DEFAULT NULL,
  `transmission` varchar(50) DEFAULT NULL,
  `seating_capacity` int DEFAULT NULL,
  `description` text,
  `image_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `variants`
--

INSERT INTO `variants` (`id`, `model_id`, `fuel_type`, `price`, `engine`, `mileage`, `transmission`, `seating_capacity`, `description`, `image_url`) VALUES
(1, 1, 'Petrol', 815000.00, '1.2L Turbo', '17.4 km/l', 'Manual', 5, 'Compact SUV with 5-star safety.', NULL),
(2, 1, 'Diesel', 1100000.00, '1.5L Turbo', '23.2 km/l', 'Automatic', 5, 'Powerful diesel variant for long drives.', NULL),
(3, 3, 'Petrol', 1450000.00, '2.0L mStallion', '13.5 km/l', 'Automatic', 7, 'Premium SUV with ADAS features.', NULL),
(4, 7, 'Petrol', 599000.00, '1.2L DualJet', '22.38 km/l', 'Manual', 5, 'India\'s favorite family hatchback.', NULL),
(5, 9, 'Diesel', 1150000.00, '1.5L CRDi', '21.0 km/l', 'Automatic', 5, 'Feature-rich and stylish SUV.', NULL),
(6, 12, 'Diesel', 3500000.00, '2.8L GD', '10.0 km/l', 'Automatic', 7, 'Rugged full-size SUV for power and comfort.', NULL),
(7, 24, 'Petrol', 193000.00, '349cc Air-Oil Cooled', '36.2 km/l', '5-Speed Manual', 2, 'Timeless icon with modern refinement.', NULL),
(8, 25, 'Petrol', 215000.00, '411cc Single Cylinder', '30.0 km/l', '5-Speed Manual', 2, 'Adventure tourer designed for rugged terrain.', NULL),
(9, 28, 'Petrol', 310000.00, '373cc Liquid-Cooled', '26.0 km/l', '6-Speed Manual', 2, 'High-performance naked sports bike.', NULL),
(10, 30, 'Petrol', 75000.00, '97.2cc Air-Cooled', '65.0 km/l', '4-Speed Manual', 2, 'The ultimate commuting champion.', NULL),
(11, 32, 'Petrol', 80000.00, '109.5cc Fan-Cooled', '50.0 km/l', 'Automatic', 2, 'The most reliable scooter.', NULL),
(12, 41, 'Electric', 125000.00, 'Lithium-ion Battery', '135 km/charge', 'Automatic', 2, 'Smart performance electric scooter.', NULL),
(13, 44, 'Diesel', 750000.00, '1.5L TDCR', '19.6 km/l', 'Manual', 3, 'India\'s most loved LCV for business.', NULL),
(14, 46, 'Diesel', 2500000.00, 'OM926', '6.0 km/l', 'Manual', 3, 'Reliable heavy-duty tipper truck.', NULL),
(15, 48, 'Diesel', 3500000.00, 'Cummins ISBe 6.7L', '4.5 km/l', 'Manual', 2, 'Top-tier multi-axle heavy truck.', NULL),
(16, 52, 'Diesel', 950000.00, 'm2DiCR', '14.0 km/l', 'Manual', 2, 'Tough and durable commercial pickup.', NULL),
(17, 54, 'Diesel', 9000000.00, 'Volvo D13A', '2.5 km/l', 'Automatic', 2, 'Extreme capability for mining apps.', NULL),
(18, 58, 'Diesel', 1600000.00, 'FM 2.6 CR ED', '11.0 km/l', 'Manual', 13, 'Popular commercial passenger carrier.', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `vehicle_types`
--

CREATE TABLE `vehicle_types` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vehicle_types`
--

INSERT INTO `vehicle_types` (`id`, `name`) VALUES
(1, 'Car'),
(2, 'Bike'),
(3, 'HeavyDuty');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `variant_id` (`variant_id`);

--
-- Indexes for table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vehicle_type_id` (`vehicle_type_id`);

--
-- Indexes for table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `entity_id` (`entity_id`);

--
-- Indexes for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `variants`
--
ALTER TABLE `variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `model_id` (`model_id`);

--
-- Indexes for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=277;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `user_activity`
--
ALTER TABLE `user_activity`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT for table `variants`
--
ALTER TABLE `variants`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `vehicle_types`
--
ALTER TABLE `vehicle_types`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `bookings_ibfk_2` FOREIGN KEY (`variant_id`) REFERENCES `variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `brands`
--
ALTER TABLE `brands`
  ADD CONSTRAINT `brands_ibfk_1` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `models`
--
ALTER TABLE `models`
  ADD CONSTRAINT `models_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_activity`
--
ALTER TABLE `user_activity`
  ADD CONSTRAINT `user_activity_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `user_activity_ibfk_2` FOREIGN KEY (`entity_id`) REFERENCES `variants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `user_preferences`
--
ALTER TABLE `user_preferences`
  ADD CONSTRAINT `user_preferences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `variants`
--
ALTER TABLE `variants`
  ADD CONSTRAINT `variants_ibfk_1` FOREIGN KEY (`model_id`) REFERENCES `models` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
