-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Lug 26, 2021 alle 11:56
-- Versione del server: 10.4.19-MariaDB
-- Versione PHP: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `keycloak`
--
USE keycloak;
-- --------------------------------------------------------

--
-- Dump dei dati per la tabella `keycloak_role`
--

INSERT INTO `keycloak_role` (`ID`, `CLIENT_REALM_CONSTRAINT`, `CLIENT_ROLE`, `DESCRIPTION`, `NAME`, `REALM_ID`, `CLIENT`, `REALM`) VALUES
('1448710', 'prova', b'0', "UTENTE_SEARCH", '1448710', 'prova', NULL, NULL),
('1448711', 'prova', b'0', "UTENTE_READ", '1448711', 'prova', NULL, NULL),
('1448712', 'prova', b'0', "UTENTE_CREATE", '1448712', 'prova', NULL, NULL),
('1448713', 'prova', b'0', "UTENTE_UPDATE", '1448713', 'prova', NULL, NULL),
('1448714', 'prova', b'0', "UTENTE_DELETE", '1448714', 'prova', NULL, NULL),
('1448715', 'prova', b'0', "UTENTE_REPORT", '1448715', 'prova', NULL, NULL);

INSERT INTO `group_role_mapping` (`ROLE_ID`, `GROUP_ID`) VALUES
('1448710', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448711', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448712', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448713', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448714', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448715', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `keycloak_role` (`ID`, `CLIENT_REALM_CONSTRAINT`, `CLIENT_ROLE`, `DESCRIPTION`, `NAME`, `REALM_ID`, `CLIENT`, `REALM`) VALUES
('1448711373', 'prova', b'0', "UTENTE_FIND_BY_THE_ORDINE_OBJECT_KEY" , '1448711373', 'prova', NULL, NULL);

INSERT INTO `group_role_mapping` (`ROLE_ID`, `GROUP_ID`) VALUES ('1448711373', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');   


INSERT INTO `keycloak_role` (`ID`, `CLIENT_REALM_CONSTRAINT`, `CLIENT_ROLE`, `DESCRIPTION`, `NAME`, `REALM_ID`, `CLIENT`, `REALM`) VALUES
('1448720', 'prova', b'0', "PRODUCT_SEARCH", '1448720', 'prova', NULL, NULL),
('1448721', 'prova', b'0', "PRODUCT_READ", '1448721', 'prova', NULL, NULL),
('1448722', 'prova', b'0', "PRODUCT_CREATE", '1448722', 'prova', NULL, NULL),
('1448723', 'prova', b'0', "PRODUCT_UPDATE", '1448723', 'prova', NULL, NULL),
('1448724', 'prova', b'0', "PRODUCT_DELETE", '1448724', 'prova', NULL, NULL),
('1448725', 'prova', b'0', "PRODUCT_REPORT", '1448725', 'prova', NULL, NULL);

INSERT INTO `group_role_mapping` (`ROLE_ID`, `GROUP_ID`) VALUES
('1448720', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448721', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448722', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448723', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448724', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448725', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `keycloak_role` (`ID`, `CLIENT_REALM_CONSTRAINT`, `CLIENT_ROLE`, `DESCRIPTION`, `NAME`, `REALM_ID`, `CLIENT`, `REALM`) VALUES
('1448721274', 'prova', b'0', "PRODUCT_FIND_BY_THE_ORDER_ITEM_OBJECT_KEY" , '1448721274', 'prova', NULL, NULL);

INSERT INTO `group_role_mapping` (`ROLE_ID`, `GROUP_ID`) VALUES ('1448721274', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');   


INSERT INTO `keycloak_role` (`ID`, `CLIENT_REALM_CONSTRAINT`, `CLIENT_ROLE`, `DESCRIPTION`, `NAME`, `REALM_ID`, `CLIENT`, `REALM`) VALUES
('1448730', 'prova', b'0', "ORDINE_SEARCH", '1448730', 'prova', NULL, NULL),
('1448731', 'prova', b'0', "ORDINE_READ", '1448731', 'prova', NULL, NULL),
('1448732', 'prova', b'0', "ORDINE_CREATE", '1448732', 'prova', NULL, NULL),
('1448733', 'prova', b'0', "ORDINE_UPDATE", '1448733', 'prova', NULL, NULL),
('1448734', 'prova', b'0', "ORDINE_DELETE", '1448734', 'prova', NULL, NULL),
('1448735', 'prova', b'0', "ORDINE_REPORT", '1448735', 'prova', NULL, NULL);

INSERT INTO `group_role_mapping` (`ROLE_ID`, `GROUP_ID`) VALUES
('1448730', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448731', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448732', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448733', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448734', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448735', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `keycloak_role` (`ID`, `CLIENT_REALM_CONSTRAINT`, `CLIENT_ROLE`, `DESCRIPTION`, `NAME`, `REALM_ID`, `CLIENT`, `REALM`) VALUES
('1448731371', 'prova', b'0', "ORDINE_FIND_BY_UTENTE", '1448731371', 'prova', NULL, NULL);

INSERT INTO `group_role_mapping` (`ROLE_ID`, `GROUP_ID`) VALUES ('1448731371', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `keycloak_role` (`ID`, `CLIENT_REALM_CONSTRAINT`, `CLIENT_ROLE`, `DESCRIPTION`, `NAME`, `REALM_ID`, `CLIENT`, `REALM`) VALUES
('1448731174', 'prova', b'0', "ORDINE_FIND_BY_THE_ORDER_ITEM_OBJECT_KEY" , '1448731174', 'prova', NULL, NULL);

INSERT INTO `group_role_mapping` (`ROLE_ID`, `GROUP_ID`) VALUES ('1448731174', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');   


INSERT INTO `keycloak_role` (`ID`, `CLIENT_REALM_CONSTRAINT`, `CLIENT_ROLE`, `DESCRIPTION`, `NAME`, `REALM_ID`, `CLIENT`, `REALM`) VALUES
('1448740', 'prova', b'0', "ORDER_ITEM_SEARCH", '1448740', 'prova', NULL, NULL),
('1448741', 'prova', b'0', "ORDER_ITEM_READ", '1448741', 'prova', NULL, NULL),
('1448742', 'prova', b'0', "ORDER_ITEM_CREATE", '1448742', 'prova', NULL, NULL),
('1448743', 'prova', b'0', "ORDER_ITEM_UPDATE", '1448743', 'prova', NULL, NULL),
('1448744', 'prova', b'0', "ORDER_ITEM_DELETE", '1448744', 'prova', NULL, NULL),
('1448745', 'prova', b'0', "ORDER_ITEM_REPORT", '1448745', 'prova', NULL, NULL);

INSERT INTO `group_role_mapping` (`ROLE_ID`, `GROUP_ID`) VALUES
('1448740', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448741', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448742', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448743', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448744', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a'),
('1448745', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');
INSERT INTO `keycloak_role` (`ID`, `CLIENT_REALM_CONSTRAINT`, `CLIENT_ROLE`, `DESCRIPTION`, `NAME`, `REALM_ID`, `CLIENT`, `REALM`) VALUES
('1448741173', 'prova', b'0', "ORDER_ITEM_FIND_BY_ORDINE", '1448741173', 'prova', NULL, NULL);

INSERT INTO `group_role_mapping` (`ROLE_ID`, `GROUP_ID`) VALUES ('1448741173', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');

INSERT INTO `keycloak_role` (`ID`, `CLIENT_REALM_CONSTRAINT`, `CLIENT_ROLE`, `DESCRIPTION`, `NAME`, `REALM_ID`, `CLIENT`, `REALM`) VALUES
('1448741272', 'prova', b'0', "ORDER_ITEM_FIND_BY_PRODUCT", '1448741272', 'prova', NULL, NULL);

INSERT INTO `group_role_mapping` (`ROLE_ID`, `GROUP_ID`) VALUES ('1448741272', 'a0e054dc-ff85-4c6a-8c09-56c651ce1d2a');



COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
