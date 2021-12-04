-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: csc317db
-- ------------------------------------------------------
-- Server version	8.0.27

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `comment` mediumtext NOT NULL,
  `fk_postId` int NOT NULL,
  `fk_authorId` int NOT NULL,
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `comment_author_idx` (`fk_authorId`),
  KEY `comment_belongsTo_idx` (`fk_postId`),
  CONSTRAINT `comment_author` FOREIGN KEY (`fk_authorId`) REFERENCES `users` (`id`),
  CONSTRAINT `comment_belongsTo` FOREIGN KEY (`fk_postId`) REFERENCES `posts` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (59,'Wow nice meme ;)',23,2,'2021-11-28 10:31:34'),(60,'nice comment below does not cause this post to appear in the search.',23,2,'2021-11-28 10:32:02'),(61,'This is a test comment by another user to showcase comments scrolling!',53,2,'2021-11-28 11:44:08'),(62,'This is a test comment by another user to showcase comments scrolling!',53,2,'2021-11-28 11:44:17'),(63,'This is a test comment by another user to showcase comments scrolling!',53,2,'2021-11-28 11:44:18'),(64,'This is a test comment by another user to showcase comments scrolling!',53,2,'2021-11-28 11:44:19'),(65,'This is a test comment by another user to showcase comments scrolling!',53,2,'2021-11-28 11:44:19'),(66,'This is a test comment by another user to showcase comments scrolling!',53,2,'2021-11-28 11:44:19'),(67,'This is a test comment by another user to showcase comments scrolling!',53,2,'2021-11-28 11:44:19'),(68,'This is a test comment by another user to showcase comments scrolling!',53,2,'2021-11-28 11:44:19'),(69,'This is a test comment by another user to showcase comments scrolling!',53,2,'2021-11-28 11:44:20'),(78,'random text here',55,1,'2021-12-03 11:20:56'),(79,'again',55,1,'2021-12-03 11:21:02'),(80,'could add character counter to view how many characters you typed on frontend',55,1,'2021-12-03 11:21:48'),(84,'test',47,1,'2021-12-03 11:40:38'),(88,'THIS COMMENT WILL ... WHEN IT IS TOO LONG TO DISPLAY ON THIS COMMENT SCREEN JUST WATCH IT\'LL HAPPEN jkfdsghflkdjhgfdjslkghfdskljghfsdljkghfsdjklghsfdlkjghsfdlkjghflsdjkghfdjsklghdfskjlghfsdlkjghfdsjklghfdlsjkghfddsgdfjkbgdfnm,gbdfmn,sgbfn,sdmbgkjfsdhgjfdaklghrelhgjkfdsahoqnwdjkhgbljkfhgjkfdhsglkjsfdhgjlksdfg',53,1,'2021-12-03 11:42:55');
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(128) NOT NULL,
  `description` mediumtext NOT NULL,
  `photopath` varchar(2048) NOT NULL,
  `thumbnail` varchar(2048) NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created` datetime NOT NULL,
  `fk_userId` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `post_author_idx` (`fk_userId`),
  CONSTRAINT `post_author` FOREIGN KEY (`fk_userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (21,'Are You Winning Son?','This meme is how I feel about this year. I am not winning. I am losing my mind and sanity. Words cannot describe my hate for CSS and how bad I am at it. ','public\\uploads\\4a7ee78085102db76b1c1ae5d3182d4ede8ac13ccace.jpeg','public/uploads/thumbnail-4a7ee78085102db76b1c1ae5d3182d4ede8ac13ccace.jpeg',1,'2021-11-28 10:28:04',1),(22,'Linus Kiryu','Meme','public\\uploads\\6ee84ddb2e1e90a129d2fb4c456e3c4c047a0ff3a440.jpeg','public/uploads/thumbnail-6ee84ddb2e1e90a129d2fb4c456e3c4c047a0ff3a440.jpeg',1,'2021-11-28 10:28:51',1),(23,'Dante','Wacky Woohoo Pizza Man doing a Joey Wheeler.','public\\uploads\\2c02dc935bf0abd4f23620ea7cb324fd3bd28adef21e.png','public/uploads/thumbnail-2c02dc935bf0abd4f23620ea7cb324fd3bd28adef21e.png',1,'2021-11-28 10:30:09',1),(24,'Doge','Doge','public\\uploads\\9c4c78c7751f07e6c3f62183eb7063948d95c6358d5f.jpeg','public/uploads/thumbnail-9c4c78c7751f07e6c3f62183eb7063948d95c6358d5f.jpeg',1,'2021-11-28 10:30:45',1),(25,'Lipstick Bird','Lipstick Bird Meme','public\\uploads\\eab88ed7d1363b9332ccc2c1af2ba2691224dd9dddd4.jpeg','public/uploads/thumbnail-eab88ed7d1363b9332ccc2c1af2ba2691224dd9dddd4.jpeg',1,'2021-11-28 10:32:28',2),(26,'Cats','Cat Meme','public\\uploads\\3980fa13b0a9f12d0224717ec5c385fe359e665763a1.jpeg','public/uploads/thumbnail-3980fa13b0a9f12d0224717ec5c385fe359e665763a1.jpeg',1,'2021-11-28 10:34:28',2),(27,'Hedgehog','Titanic Hedgehog meme','public\\uploads\\e36cdde5fb16ef3e6867f0508848e53689bf2ed51560.jpeg','public/uploads/thumbnail-e36cdde5fb16ef3e6867f0508848e53689bf2ed51560.jpeg',1,'2021-11-28 10:35:05',2),(28,'Esports (Dino version)','Meme','public\\uploads\\df8eb545884d93fb495dd7e268ee5f68114f304103b3.jpeg','public/uploads/thumbnail-df8eb545884d93fb495dd7e268ee5f68114f304103b3.jpeg',1,'2021-11-28 10:36:13',2),(29,'Majima Meme','Gotcha ya now.','public\\uploads\\23cad05a565736c87b744dc91256d8fdff46d9d4645a.jpeg','public/uploads/thumbnail-23cad05a565736c87b744dc91256d8fdff46d9d4645a.jpeg',1,'2021-11-28 10:39:47',2),(30,'Smooth Brain','Meme','public\\uploads\\5ed8593ded16f48300e5a859d432583b9c0990bad7c1.jpeg','public/uploads/thumbnail-5ed8593ded16f48300e5a859d432583b9c0990bad7c1.jpeg',1,'2021-11-28 10:40:38',2),(31,'Car Crash Dummy','Meme (This is for the algorithm)','public\\uploads\\b175138fb530b05657d3c4f84cdc88e79427fa38e360.jpeg','public/uploads/thumbnail-b175138fb530b05657d3c4f84cdc88e79427fa38e360.jpeg',1,'2021-11-28 10:43:41',2),(32,'Legoes?','Meme (This is for the search algorithm)','public\\uploads\\5b40066f3924e128fc190bba5e01fb1a4ac7cff779ed.png','public/uploads/thumbnail-5b40066f3924e128fc190bba5e01fb1a4ac7cff779ed.png',1,'2021-11-28 10:46:59',2),(33,'So It Is Written.','So It Is Written. Meme','public\\uploads\\f0b046be65771d74c530db70e3663542999abc5be465.png','public/uploads/thumbnail-f0b046be65771d74c530db70e3663542999abc5be465.png',1,'2021-11-28 10:50:56',2),(34,'Pootis','Meme','public\\uploads\\f4a95de387e574335f2ddd28c1ac410c86127aa35262.jpeg','public/uploads/thumbnail-f4a95de387e574335f2ddd28c1ac410c86127aa35262.jpeg',1,'2021-11-28 10:53:00',2),(35,'Yoshi Meme','Which Yoshi do you pick?','public\\uploads\\9b99db214b14a6204b881e769d2aef04bee0f6bcf539.jpeg','public/uploads/thumbnail-9b99db214b14a6204b881e769d2aef04bee0f6bcf539.jpeg',1,'2021-11-28 10:54:02',2),(36,'Baboon Meme','Me trying to debug my code.','public\\uploads\\3d5d2ebd517eb4e7f043ebf1d0e9cf21e1c2af72fd2e.jpeg','public/uploads/thumbnail-3d5d2ebd517eb4e7f043ebf1d0e9cf21e1c2af72fd2e.jpeg',1,'2021-11-28 10:54:48',2),(37,'They b Comfy.','Meme','public\\uploads\\7ab1f5f334dbdc68c55a53601b1e3b97da2fb1d6e47c.jpeg','public/uploads/thumbnail-7ab1f5f334dbdc68c55a53601b1e3b97da2fb1d6e47c.jpeg',1,'2021-11-28 10:56:14',2),(38,'K I R B Y  C O D I N G','Meme','public\\uploads\\cd746012959e9650b198557c59ad4e1525ad3cb4fd82.jpeg','public/uploads/thumbnail-cd746012959e9650b198557c59ad4e1525ad3cb4fd82.jpeg',1,'2021-11-28 10:57:22',2),(39,'pasta','meme','public\\uploads\\750c0bc3abef856851936318359fcef6329b2a64f191.jpeg','public/uploads/thumbnail-750c0bc3abef856851936318359fcef6329b2a64f191.jpeg',1,'2021-11-28 10:59:28',2),(40,'knife','meme','public\\uploads\\956e80412af324188efa75d3e90eb2fec954e013b927.jpeg','public/uploads/thumbnail-956e80412af324188efa75d3e90eb2fec954e013b927.jpeg',1,'2021-11-28 11:00:26',2),(41,'Engi Tips the Iceberg in Club Penguin.','meme','public\\uploads\\26bae994b4413bdccb7105304c334a961c6189f9abf7.jpeg','public/uploads/thumbnail-26bae994b4413bdccb7105304c334a961c6189f9abf7.jpeg',1,'2021-11-28 11:03:04',2),(42,'Spy sappin\' my dispenser','meme','public\\uploads\\50242cf2295aafe4ecff7b6d53138e4de472cc55936f.jpeg','public/uploads/thumbnail-50242cf2295aafe4ecff7b6d53138e4de472cc55936f.jpeg',1,'2021-11-28 11:04:17',2),(43,'Lord Of Tires','meme','public\\uploads\\9db946024df0b385e6ab3b31e2b358058fca4b7eec44.png','public/uploads/thumbnail-9db946024df0b385e6ab3b31e2b358058fca4b7eec44.png',1,'2021-11-28 11:10:07',2),(44,'Kermit Hangover','meme','public\\uploads\\203c4866f6ab4de9e617d1798edbe10890a9c78de5fd.jpeg','public/uploads/thumbnail-203c4866f6ab4de9e617d1798edbe10890a9c78de5fd.jpeg',1,'2021-11-28 11:11:37',2),(45,'Trolley Problem','Meme','public\\uploads\\3aa0cba57e4e007cf6dbe8ef27b6b345dc15075ec3b5.png','public/uploads/thumbnail-3aa0cba57e4e007cf6dbe8ef27b6b345dc15075ec3b5.png',1,'2021-11-28 11:12:59',2),(46,'Monke Punch','meme','public\\uploads\\82b4a9dfd2355ee05a48dba2b1fcf0032ac4701d54e7.png','public/uploads/thumbnail-82b4a9dfd2355ee05a48dba2b1fcf0032ac4701d54e7.png',1,'2021-11-28 11:13:46',2),(47,'Long Cat Head','meme','public\\uploads\\1275f17897441efd2df99851a207140e2201bb1ef9ec.png','public/uploads/thumbnail-1275f17897441efd2df99851a207140e2201bb1ef9ec.png',1,'2021-11-28 11:22:08',2),(48,'Long Cat Body','Long Cat Meme','public\\uploads\\59be099bfabe7ce55082593f8f018109b4e0934d3c3d.png','public/uploads/thumbnail-59be099bfabe7ce55082593f8f018109b4e0934d3c3d.png',1,'2021-11-28 11:24:17',2),(49,'Long Cat Bottom','Meme','public\\uploads\\1b1eef35222bc9c1cbae4695d49eb5d4f3f536e3e7a3.png','public/uploads/thumbnail-1b1eef35222bc9c1cbae4695d49eb5d4f3f536e3e7a3.png',1,'2021-11-28 11:24:27',2),(53,'Test 50 characters is the max limit a title can be','THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.THIS IS A REALLY LONG TEXT DESCRIPTION TO SHOWCASE HOW THE SCROLLBAR IS IMPLEMENTED.','public\\uploads\\7c98951d01dacb9f0a175ae846600215ecb2b66f3393.jpeg','public/uploads/thumbnail-7c98951d01dacb9f0a175ae846600215ecb2b66f3393.jpeg',1,'2021-11-28 11:40:58',1),(55,'error','This is what happens when you spam the description with so much characters and there is no server side validation to deal with it.','public\\uploads\\def56b7d8b7dcf8bfd5c19d5066a44b5991d440c3c8a.png','public/uploads/thumbnail-def56b7d8b7dcf8bfd5c19d5066a44b5991d440c3c8a.png',1,'2021-12-03 11:20:28',1),(56,'error title','This is what happens when you do not have server side validation to handle a bunch of characters being spammed into your input fields.','public\\uploads\\2374a7797532256116383cc2849c23e00096a7ac63ba.png','public/uploads/thumbnail-2374a7797532256116383cc2849c23e00096a7ac63ba.png',1,'2021-12-03 11:53:25',1);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(128) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `active` int NOT NULL DEFAULT '1',
  `created` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'test01','test01@test.com','$2b$15$0ybxE/a6VPPzIqWdV3e3UOYJohvWk9FEkfqnspPrGERmfcwetrPza',1,'2021-11-27 17:16:30'),(2,'bird','bird@gmail.com','$2b$15$Fpgi/q0CJT7c6FusoaGUOu7zJNrUeBIMgNmQkndOGBP.qca30plDi',1,'2021-11-27 17:21:28'),(3,'dummy','dummy@dummy.com','$2b$15$JAqJcglWadj2tp6lmnNi2uwXyB2S3NywbdNkWsOF0.pb8J4.0bgRK',1,'2021-11-28 11:53:42');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-12-04 12:09:30
