-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 09, 2023 at 10:03 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dtc_data`
--

-- --------------------------------------------------------

--
-- Table structure for table `footer`
--

CREATE TABLE `footer` (
  `id_footer` int(1) NOT NULL,
  `jalan_kantor` varchar(99) DEFAULT NULL,
  `email` varchar(99) DEFAULT NULL,
  `no_telp` varchar(99) DEFAULT NULL,
  `whatsapp` varchar(99) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `footer`
--

INSERT INTO `footer` (`id_footer`, `jalan_kantor`, `email`, `no_telp`, `whatsapp`) VALUES
(1, 'Jalan Raung, No 15, Gajahmungkur, Kota Semarang', 'contact@dafamtrading.co', '(024) 3559111', '081229456202');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(99) NOT NULL,
  `gambar_kategori` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`, `gambar_kategori`) VALUES
(56, 'komputer', 'resize/uploads/dtcimage-komputer-1675925150216.png'),
(59, 'aksesoris', 'resize/uploads/dtcimage-aksesoris-1675925350513.png'),
(60, 'susu stunting', 'resize/uploads/dtcimage-susustunting-1675925360044.png'),
(61, 'mebel', 'resize/uploads/dtcimage-mebel-1675925376016.png'),
(74, 'kamar mandi', 'uploads/dtcimage-kamarmandi-1675925406909.png'),
(75, 'laptop', 'resize/uploads/dtcimage-laptop-1675925535859.png');

-- --------------------------------------------------------

--
-- Table structure for table `logo`
--

CREATE TABLE `logo` (
  `id_logo` int(3) NOT NULL,
  `gambar_logo` varchar(9999) DEFAULT NULL,
  `nama_logo` varchar(99) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `logo`
--

INSERT INTO `logo` (`id_logo`, `gambar_logo`, `nama_logo`) VALUES
(1, 'resize/uploads/dtcimage-Logo-1675849758481.png', 'Logo'),
(2, 'resize/uploads/dtcimage-LogoFooter-1675850526895.png', 'Logo Footer');

-- --------------------------------------------------------

--
-- Table structure for table `mitra`
--

CREATE TABLE `mitra` (
  `ID_MITRA` int(11) NOT NULL,
  `nama_mitra` varchar(99) DEFAULT NULL,
  `gambar_mitra` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `mitra`
--

INSERT INTO `mitra` (`ID_MITRA`, `nama_mitra`, `gambar_mitra`) VALUES
(14, 'mitra', 'resize/uploads/dtcimage-mitra-1675850275266.png'),
(18, 'mitra 2', 'resize/uploads/dtcimage-mitra2-1675850885751.png'),
(21, 'mitra 3', 'resize/uploads/dtcimage-mitra3-1675850972085.png'),
(22, 'mitraa', 'resize/uploads/dtcimage-mitraa-1675851013085.png'),
(23, 'mitraaa', 'resize/uploads/dtcimage-mitraaa-1675850339315.png'),
(24, 'asus', 'resize/uploads/dtcimage-asus-1675851051533.png'),
(26, 'mit', 'resize/uploads/dtcimage-mit-1675851093008.png'),
(27, 'lele', 'resize/uploads/dtcimage-lele-1675850365791.png');

-- --------------------------------------------------------

--
-- Table structure for table `office`
--

CREATE TABLE `office` (
  `ID_OFFICE` int(11) NOT NULL,
  `kota` varchar(99) DEFAULT NULL,
  `jalan` varchar(999) DEFAULT NULL,
  `latitude` varchar(99) DEFAULT NULL,
  `longitude` varchar(99) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `office`
--

INSERT INTO `office` (`ID_OFFICE`, `kota`, `jalan`, `latitude`, `longitude`) VALUES
(12, 'Semarang', 'Jl. Imam Bonjol No.188, Sekayu, Kec. Semarang Tengah, Kota Semarang', '-6.9793233', '110.4094675'),
(16, 'Cilacap', 'Jl. Dr. Wahidin Sudiro Husodo No.5-15, Dafam Cilacap, Sidakaya, Kec. Cilacap Sel., Kabupaten Cilacap', '-7.7323979', '109.0131443'),
(17, 'Pekalongan', 'Jl. Urip Sumoharjo No.53 Medono, Podosugih, Kec. Pekalongan Bar., Kota Pekalongan', '-6.9014462', '109.6620677'),
(18, 'Pekanbaru Riau', 'Jl. Sultan Syarif Qasim Kav. 150 Kota Tinggi Lima Puluh, Kota Tinggi, Kec. Pekanbaru Kota, Kota  Pekanbaru', '0.5305126', '101.4513132'),
(26, 'Jakarta', 'Jl. Urip Sumoharjo No.53 Medono, Podosugih, Kec. Pekalongan Bar., Kota Pekalongan', '100.212', '0.2'),
(27, 'Kotabaru', '2V29+XV6, Limbungan, Hampang, Kotabaru Regency, South Kalimantan 72162', '-3.02602092', '115.8469457'),
(28, 'Bandung', 'Jl. Tamansari No.17, Lb. Siliwangi, Kecamatan Coblong, Kota Bandung, Jawa Barat 40132', '-6.903363', '107.6081381');

-- --------------------------------------------------------

--
-- Table structure for table `partner`
--

CREATE TABLE `partner` (
  `ID_PARTNER` int(11) NOT NULL,
  `nama_partner` varchar(99) DEFAULT NULL,
  `gambar_partner` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `partner`
--

INSERT INTO `partner` (`ID_PARTNER`, `nama_partner`, `gambar_partner`) VALUES
(14, 'hp', 'uploads/dtcimage-hp-1675924698054.png'),
(16, 'dhm', 'resize/uploads/dtcimage-dhm-1675924238462.png'),
(17, 'Louis', 'uploads/dtcimage-Louis-1675924708103.png'),
(19, 'renault', 'uploads/dtcimage-renault-1675924703123.png'),
(20, 'amad', 'resize/uploads/dtcimage-amad-1675924421474.png'),
(21, 'dipo', 'uploads/dtcimage-dipo-1675924685542.png'),
(22, 'converse', 'resize/uploads/dtcimage-converse-1675924434385.png'),
(23, 'op', 'resize/uploads/dtcimage-op-1675924447446.png'),
(24, 'unilever', 'resize/uploads/dtcimage-unilever-1675924459814.png'),
(26, 'amali', 'resize/uploads/dtcimage-amali-1675924473192.png'),
(27, 'asaba', 'resize/uploads/dtcimage-asaba-1675924486141.png'),
(28, 'shopee', 'resize/uploads/dtcimage-shopee-1675924506914.png'),
(29, 'himaskom', 'uploads/dtcimage-himaskom-1675924675906.png'),
(30, 'ace', 'uploads/dtcimage-ace-1675924671946.png'),
(48, 'r', 'resize/uploads/dtcimage-r-1675924535828.png'),
(54, 'allianz', 'uploads/dtcimage-allianz-1675924621402.png'),
(55, 'burger king', 'resize/uploads/dtcimage-burgerking-1675924645734.png'),
(56, 'DQ', 'resize/uploads/dtcimage-DQ-1675924665292.png');

-- --------------------------------------------------------

--
-- Table structure for table `profil`
--

CREATE TABLE `profil` (
  `id` int(1) DEFAULT NULL,
  `profildesc` varchar(9999) DEFAULT NULL,
  `gambar_profil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `profil`
--

INSERT INTO `profil` (`id`, `profildesc`, `gambar_profil`) VALUES
(1, '<p>Dafam Trading Company merupakan bagian dari Dafam Group yang bergerak di bidang pengadaan barang, berpotensi menjadi partner pemerintah dan swasta. Dafam Group telah berkecimpung di bisnis properti dan perhotelan sejak tahun 2010. Dafam Trading Company menjadi mitra pemerintah yang terpercaya dan memegang prinsip transparasi, objektifitas selaras dengan peraturan pembelanjaan yang ditetapkan. Selalu menjaga hubungan baik dengan seluruh stake holder dan membuka kesempatan untuk para supplier, distributor, selling agent, reseller, produsen, pengusaha UMKM untuk bersama-sama berusaha mengembangkan pencapaian usaha yang lebih baik.</p>', NULL),
(2, '<p>Menjadi trading company yang menyediakan kebutuhan pemerintahan &amp; non pemerintahan meliputi bidang kesehatan, TIK, dan mebeler, melalui system e-purchasing yang disesuaikan dengan kebijakan pemerintah. blabablablaba Menjadi trading company yang menyediakan kebutuhan pemerintahan &amp; non pemerintahan meliputi bidang kesehatan, TIK, dan mebeler, melalui system e-purchasing yang disesuaikan dengan kebijakan pemerintah.</p>', 'uploads/dtcimage-visi-1675932401310.png'),
(3, '<p>Mensupply sarana prasarana, kebutuhan pemerintahan dan non pemerintahan baik manual maupun dengan system (e-purchasing). Menghimpun produsen (sarana prasarana dalam pendidikan, kesehatan, security system dan fasilitas umum) dalam skala besar dan kecil untuk berkontribusi secara positif di pasar nasional.</p>', 'uploads/dtcimage-misi-1675926337336.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `uid` int(7) NOT NULL,
  `name` varchar(99) NOT NULL,
  `username` varchar(99) NOT NULL,
  `password` varchar(99) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`uid`, `name`, `username`, `password`) VALUES
(1234567, 'dtc', 'dtcadmin', 'admindtc');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `logo`
--
ALTER TABLE `logo`
  ADD PRIMARY KEY (`id_logo`);

--
-- Indexes for table `mitra`
--
ALTER TABLE `mitra`
  ADD PRIMARY KEY (`ID_MITRA`);

--
-- Indexes for table `office`
--
ALTER TABLE `office`
  ADD PRIMARY KEY (`ID_OFFICE`);

--
-- Indexes for table `partner`
--
ALTER TABLE `partner`
  ADD PRIMARY KEY (`ID_PARTNER`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT for table `logo`
--
ALTER TABLE `logo`
  MODIFY `id_logo` int(3) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mitra`
--
ALTER TABLE `mitra`
  MODIFY `ID_MITRA` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `office`
--
ALTER TABLE `office`
  MODIFY `ID_OFFICE` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `partner`
--
ALTER TABLE `partner`
  MODIFY `ID_PARTNER` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
