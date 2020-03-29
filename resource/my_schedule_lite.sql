-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 28-03-2020 a las 21:34:16
-- Versión del servidor: 8.0.18
-- Versión de PHP: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `my_schedule_lite`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `clave_administrador` int(10) NOT NULL,
  `nombre_administrador` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`clave_administrador`, `nombre_administrador`, `email`) VALUES
(11111, 'Carlos Alejandro Pool Quintal', 'admin1@admin.com'),
(22222, 'Manuel Martin Rico', 'admin2@admin.com'),
(33333, 'Diego Avila Morales', 'admin3@admin.com'),
(44444, 'Johan Abraham Caceres Quintal', 'admin4@admin.com'),
(55555, 'Magdiel Joab Pech Menendez', 'admin5@admin.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `matricula` int(10) NOT NULL,
  `nombre_alumno` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `clave_grupo` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`matricula`, `nombre_alumno`, `email`, `clave_grupo`) VALUES
(10001, 'Nombre de Alumno 1', 'alumno1@alumno.com', 1),
(10002, 'Nombre de Alumno 2', 'alumno2@alumno.com', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aula`
--

CREATE TABLE `aula` (
  `clave_aula` varchar(10) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `tipo_aula` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `aula`
--

INSERT INTO `aula` (`clave_aula`, `descripcion`, `tipo_aula`) VALUES
('CC1', 'Centro de computo 1', 1),
('CC2', 'Centro de computo 2', 1),
('CC3', 'Centro de computo 3', 1),
('CC4', 'Centro de computo 4', 1),
('CC5', 'Centro de computo 5', 1),
('H1', 'Aula H1', 0),
('H2', 'Aula H2', 0),
('H3', 'Aula H3', 0),
('H4', 'Aula H4', 0),
('H5', 'Aula H5', 0),
('L1', 'Laboratorio 1', 2),
('L2', 'Laboratorio 2', 2),
('L3', 'Laboratorio 3', 2),
('L4', 'Laboratorio 4', 2),
('L5', 'Laboratorio 5', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aula_carga`
--

CREATE TABLE `aula_carga` (
  `clave_aula` varchar(10) NOT NULL,
  `clave_maestro` int(10) NOT NULL,
  `clave_materia` varchar(10) NOT NULL,
  `clave_grupo` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carga`
--

CREATE TABLE `carga` (
  `clave_maestro` int(10) NOT NULL,
  `clave_materia` varchar(10) NOT NULL,
  `clave_grupo` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `carga`
--

INSERT INTO `carga` (`clave_maestro`, `clave_materia`, `clave_grupo`) VALUES
(121212, 'MAT161-A', 1),
(232323, 'MAT161-AS', 1),
(343434, 'MAT161-FIS', 1),
(454545, 'MAT161-GA', 1),
(565656, 'MAT161-RSU', 1),
(121212, 'MAT162-AA', 2),
(232323, 'MAT162-CD', 2),
(343434, 'MAT162-CM', 2),
(454545, 'MAT162-MD', 2),
(565656, 'MATLCC-PE', 2),
(121212, 'MAT163-AL', 3),
(232323, 'MAT163-AL', 3),
(343434, 'MAT163-CI', 3),
(454545, 'MAT163-PO', 3),
(565656, 'MAT163-TC', 3),
(21001, 'LAFMAT-AI', 4),
(21001, 'LAFMAT-RSU', 4),
(21002, 'LAFMAT-AS', 4),
(21003, 'LAFMAT-CF', 4),
(21004, 'LAFMAT-GAI', 4),
(21005, 'LAFMAT-IC', 4),
(21001, 'LAFMAT-AR', 5),
(21002, 'LAFMAT-AS2', 5),
(21003, 'LAFMAT-CM', 5),
(21004, 'LAFMAT-CUV', 5),
(21005, 'LAFMAT-SF', 5),
(21001, 'LAFMAT-AL', 6),
(21002, 'LAFMAT-CMT', 6),
(21003, 'LAFMAT-M', 6),
(21004, 'LAFMAT-MF', 6),
(21005, 'LAFMAT-P1', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `clave_carrera` varchar(10) NOT NULL,
  `nombre_carrera` varchar(50) NOT NULL,
  `duracion` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`clave_carrera`, `nombre_carrera`, `duracion`) VALUES
('LA', 'LICENCIATURA EN ACTUARIA', 9),
('LCC', 'LICENCIATURA EN INGENIERIA DE LA COMPUTACION', 9),
('LEM', 'LICENCIATURA EN ENSEÑANZA DE LAS MATEMATICAS', 9),
('LIS', 'LICENCIATURA EN INGENIERIA DE SOFTWARE', 9),
('LM', 'LICENCIATURA EN MATEMATICAS', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupo`
--

CREATE TABLE `grupo` (
  `clave_grupo` int(10) NOT NULL,
  `numero_grupo` int(10) NOT NULL,
  `ciclo_escolar` varchar(50) NOT NULL,
  `clave_carrera` varchar(10) NOT NULL,
  `semestre` int(10) NOT NULL DEFAULT '1',
  `turno` varchar(20) NOT NULL,
  `creditos_aprobados` int(11) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `grupo`
--

INSERT INTO `grupo` (`clave_grupo`, `numero_grupo`, `ciclo_escolar`, `clave_carrera`, `semestre`, `turno`, `creditos_aprobados`) VALUES
(1, 1, '2019-2020', 'LIS', 1, 'Matutino', 0),
(2, 2, '2019-2020', 'LIS', 2, 'Matutino', 0),
(3, 3, '2019-2020', 'LIS', 3, 'Vespertino', 0),
(4, 1, '2019-2020', 'LA', 1, 'Matutino', 0),
(5, 2, '2019-2020', 'LA', 2, 'Matutino', 0),
(6, 3, '2019-2020', 'LA', 3, 'Matutino', 0),
(7, 1, '2019-2020', 'LCC', 1, 'Matutino', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `clave_aula` varchar(10) NOT NULL,
  `clave_maestro` int(10) NOT NULL,
  `clave_materia` varchar(10) NOT NULL,
  `clave_grupo` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maestro`
--

CREATE TABLE `maestro` (
  `clave_maestro` int(10) NOT NULL,
  `nombre_maestro` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `maestro`
--

INSERT INTO `maestro` (`clave_maestro`, `nombre_maestro`, `email`) VALUES
(21001, 'Ernesto Guerrero Lara', 'maestro6@maestro.com'),
(21002, 'Eric Sansores', 'maestro7@maestro.com'),
(21003, 'Lourdres Sansores', 'maestro8@maestro.com'),
(21004, 'Eduardo Hernandez', 'maestro9@maestro.com'),
(21005, 'Carlos Herrera', 'maestro10@maestro.com'),
(121212, 'Edgar Antonio Cambranes Martinez', 'maestro1@maestro.com'),
(232323, 'Victor Hugo Pech Menendez', 'maestro2@maestro.com'),
(343434, 'Carlos Benito Mujica', 'maestro3@maestro.com'),
(454545, 'Otilio Santos Aguilar', 'maestro4@maestro.com'),
(565656, 'Luis Fernando Curi Quintal', 'maestro5@maestro.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `malla_curricular`
--

CREATE TABLE `malla_curricular` (
  `clave_carrera` varchar(10) NOT NULL,
  `semestre` int(10) NOT NULL,
  `clave_materia` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `malla_curricular`
--

INSERT INTO `malla_curricular` (`clave_carrera`, `semestre`, `clave_materia`) VALUES
('LA', 1, 'LAFMAT-AI'),
('LA', 1, 'LAFMAT-AS'),
('LA', 1, 'LAFMAT-CF'),
('LA', 1, 'LAFMAT-GAI'),
('LA', 1, 'LAFMAT-IC'),
('LA', 1, 'LAFMAT-RSU'),
('LCC', 1, 'MATLCC-A'),
('LCC', 1, 'MATLCC-AI'),
('LCC', 1, 'MATLCC-AS'),
('LCC', 1, 'MATLCC-GA'),
('LCC', 1, 'MATLCC-RSU'),
('LIS', 1, 'MAT161-A'),
('LIS', 1, 'MAT161-AS'),
('LIS', 1, 'MAT161-FIS'),
('LIS', 1, 'MAT161-GA'),
('LIS', 1, 'MAT161-RSU'),
('LA', 2, 'LAFMAT-AR'),
('LA', 2, 'LAFMAT-AS2'),
('LA', 2, 'LAFMAT-CM'),
('LA', 2, 'LAFMAT-CUV'),
('LA', 2, 'LAFMAT-SF'),
('LCC', 2, 'MATLCC-AA'),
('LCC', 2, 'MATLCC-CD'),
('LCC', 2, 'MATLCC-CM'),
('LCC', 2, 'MATLCC-MD'),
('LCC', 2, 'MATLCC-PE'),
('LIS', 2, 'MAT162-AA'),
('LIS', 2, 'MAT162-CD'),
('LIS', 2, 'MAT162-CM'),
('LIS', 2, 'MAT162-MD'),
('LIS', 2, 'MAT162-PE'),
('LA', 3, 'LAFMAT-AL'),
('LA', 3, 'LAFMAT-CMT'),
('LA', 3, 'LAFMAT-M'),
('LA', 3, 'LAFMAT-MF'),
('LA', 3, 'LAFMAT-P1'),
('LCC', 3, 'MATLCC-AL'),
('LCC', 3, 'MATLCC-CI'),
('LCC', 3, 'MATLCC-ED'),
('LCC', 3, 'MATLCC-TC'),
('LIS', 3, 'MAT163-AC'),
('LIS', 3, 'MAT163-AL'),
('LIS', 3, 'MAT163-CI'),
('LIS', 3, 'MAT163-PO'),
('LIS', 3, 'MAT163-TC');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `clave_materia` varchar(10) NOT NULL,
  `nombre_materia` varchar(50) NOT NULL,
  `creditos_materia` int(10) NOT NULL,
  `horas_presenciales` int(10) DEFAULT NULL,
  `horas_no_presenciales` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`clave_materia`, `nombre_materia`, `creditos_materia`, `horas_presenciales`, `horas_no_presenciales`) VALUES
('LAFMAT-AI', 'Algebra Intermedia', 8, 64, 64),
('LAFMAT-AL', 'Algebra Lineal', 9, 72, 72),
('LAFMAT-AR', 'Introduccion a la Administracion de Riesgos', 4, 32, 32),
('LAFMAT-AS', 'Algebra Superior I', 5, 60, 20),
('LAFMAT-AS2', 'Algebra Superior II', 6, 48, 48),
('LAFMAT-CF', 'Contabilidad Financiera', 7, 78, 34),
('LAFMAT-CM', 'Cultura Maya', 6, 48, 48),
('LAFMAT-CMT', 'Calculo Multivariable', 9, 72, 72),
('LAFMAT-CUV', 'Calculo Univariable', 11, 96, 80),
('LAFMAT-GAI', 'Geometria Analitica I', 8, 64, 64),
('LAFMAT-IC', 'Introduccion al Calculo', 4, 42, 22),
('LAFMAT-M', 'Microeconomia', 5, 48, 32),
('LAFMAT-MF', 'Matematicas Financieras', 6, 56, 40),
('LAFMAT-P1', 'Probabilidad I', 8, 80, 48),
('LAFMAT-RSU', 'Responsabilidad Social Universitaria', 6, 48, 48),
('LAFMAT-SF', 'Sistemas Financieros', 4, 64, 64),
('MAT161-A', 'Algoritmia', 7, 72, 40),
('MAT161-AS', 'Algebra Intermedia', 8, 64, 64),
('MAT161-FIS', 'Fundamentos de Ingenieria de Software', 6, 64, 32),
('MAT161-GA', 'Geometria Analitica', 8, 64, 64),
('MAT161-RSU', 'Responsabilidad Social Universitaria', 6, 48, 48),
('MAT162-AA', 'Algebra Superior', 8, 72, 56),
('MAT162-CD', 'Calculo Diferencial', 8, 72, 56),
('MAT162-CM', 'Cultura Maya', 6, 48, 48),
('MAT162-MD', 'Matematicas Discretas', 7, 72, 40),
('MAT162-PE', 'Programacion Estructurada', 7, 72, 40),
('MAT163-AC', 'Arquitectura y Organizacion de Computadoras', 8, 72, 56),
('MAT163-AL', 'Algebra Lineal', 8, 72, 56),
('MAT163-CI', 'Calculo Integral', 8, 72, 56),
('MAT163-PO', 'Programacion Orientada a Objetos', 8, 72, 56),
('MAT163-TC', 'Teoria de la Computacion', 8, 72, 56),
('MATLCC-A', 'Algoritmia', 7, 72, 40),
('MATLCC-AA', 'Algebra Avanzada', 8, 72, 56),
('MATLCC-AI', 'Algebra Intermedia', 8, 64, 64),
('MATLCC-AL', 'Algebra Lineal', 8, 72, 56),
('MATLCC-AS', 'Algebra Superior', 8, 72, 56),
('MATLCC-CD', 'Calculo Diferencial', 8, 72, 56),
('MATLCC-CI', 'Calculo Integral', 8, 72, 56),
('MATLCC-CM', 'Cultura Maya', 6, 48, 48),
('MATLCC-ED', 'Estructura de Datos', 8, 72, 56),
('MATLCC-GA', 'Geometria Analitica', 8, 64, 64),
('MATLCC-MD', 'Matematicas Discretas', 7, 72, 40),
('MATLCC-PE', 'Programacion Estructurada', 7, 72, 40),
('MATLCC-RSU', 'Responsabilidad Social Universitaria', 6, 48, 48),
('MATLCC-TC', 'Teoria de la Computacion', 8, 72, 56);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferta`
--

CREATE TABLE `oferta` (
  `clave_maestro` int(10) NOT NULL,
  `clave_materia` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `oferta`
--

INSERT INTO `oferta` (`clave_maestro`, `clave_materia`) VALUES
(21001, 'LAFMAT-AI'),
(21001, 'LAFMAT-AL'),
(21001, 'LAFMAT-AR'),
(21001, 'LAFMAT-RSU'),
(21002, 'LAFMAT-AS'),
(21002, 'LAFMAT-AS2'),
(21002, 'LAFMAT-CMT'),
(21003, 'LAFMAT-CF'),
(21003, 'LAFMAT-CM'),
(21003, 'LAFMAT-M'),
(21004, 'LAFMAT-CUV'),
(21004, 'LAFMAT-GAI'),
(21004, 'LAFMAT-MF'),
(21005, 'LAFMAT-IC'),
(21005, 'LAFMAT-P1'),
(21005, 'LAFMAT-SF'),
(121212, 'MAT161-A'),
(121212, 'MAT162-AA'),
(121212, 'MAT163-AC'),
(232323, 'MAT161-AS'),
(232323, 'MAT162-CD'),
(232323, 'MAT163-AL'),
(343434, 'MAT161-FIS'),
(343434, 'MAT162-CM'),
(343434, 'MAT163-CI'),
(454545, 'MAT161-GA'),
(454545, 'MAT162-MD'),
(454545, 'MAT163-PO'),
(565656, 'MAT161-RSU'),
(565656, 'MAT162-PE'),
(565656, 'MAT163-TC'),
(565656, 'MATLCC-PE');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `email` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`email`, `password`) VALUES
('admin1@admin.com', 'adsadsasd'),
('admin2@admin.com', 'asdasdasd'),
('admin3@admin.com', 'adsadsasd'),
('admin4@admin.com', 'asdasdads'),
('admin5@admin.com', 'asdadsasd'),
('alumno1@alumno.com', 'asdadsasd'),
('alumno2@alumno.com', 'asdasdasd'),
('maestro1@maestro.com', 'asdadsasd'),
('maestro10@maestro.com', 'asdawqwrq'),
('maestro2@maestro.com', 'asdadsads'),
('maestro3@maestro.com', 'asdasdasd'),
('maestro4@maestro.com', 'asdasdasd'),
('maestro5@maestro.com', 'asdasdasd'),
('maestro6@maestro.com', 'asdasdasd'),
('maestro7@maestro.com', 'qweqweqwe'),
('maestro8@maestro.com', 'dfgdgfadsf'),
('maestro9@maestro.com', 'asdfasdfadfs');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`clave_administrador`),
  ADD KEY `email` (`email`);

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`matricula`),
  ADD KEY `email` (`email`),
  ADD KEY `clave_grupo` (`clave_grupo`);

--
-- Indices de la tabla `aula`
--
ALTER TABLE `aula`
  ADD PRIMARY KEY (`clave_aula`);

--
-- Indices de la tabla `aula_carga`
--
ALTER TABLE `aula_carga`
  ADD PRIMARY KEY (`clave_aula`,`clave_maestro`,`clave_materia`,`clave_grupo`),
  ADD KEY `clave_maestro` (`clave_maestro`),
  ADD KEY `clave_materia` (`clave_materia`),
  ADD KEY `clave_grupo` (`clave_grupo`);

--
-- Indices de la tabla `carga`
--
ALTER TABLE `carga`
  ADD PRIMARY KEY (`clave_maestro`,`clave_materia`,`clave_grupo`),
  ADD KEY `clave_materia` (`clave_materia`),
  ADD KEY `clave_grupo` (`clave_grupo`);

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`clave_carrera`);

--
-- Indices de la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`clave_grupo`),
  ADD KEY `clave_carrera` (`clave_carrera`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`clave_aula`,`clave_maestro`,`clave_materia`,`clave_grupo`),
  ADD KEY `clave_maestro` (`clave_maestro`),
  ADD KEY `clave_materia` (`clave_materia`),
  ADD KEY `clave_grupo` (`clave_grupo`);

--
-- Indices de la tabla `maestro`
--
ALTER TABLE `maestro`
  ADD PRIMARY KEY (`clave_maestro`),
  ADD KEY `email` (`email`);

--
-- Indices de la tabla `malla_curricular`
--
ALTER TABLE `malla_curricular`
  ADD PRIMARY KEY (`clave_carrera`,`semestre`,`clave_materia`),
  ADD KEY `clave_materia` (`clave_materia`),
  ADD KEY `clave_carrera` (`clave_carrera`),
  ADD KEY `semestre` (`semestre`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`clave_materia`);

--
-- Indices de la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD PRIMARY KEY (`clave_maestro`,`clave_materia`),
  ADD KEY `clave_materia` (`clave_materia`),
  ADD KEY `clave_maestro` (`clave_maestro`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `grupo`
--
ALTER TABLE `grupo`
  MODIFY `clave_grupo` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `administrador_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuarios` (`email`);

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `alumno_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuarios` (`email`),
  ADD CONSTRAINT `alumno_ibfk_2` FOREIGN KEY (`clave_grupo`) REFERENCES `grupo` (`clave_grupo`);

--
-- Filtros para la tabla `aula_carga`
--
ALTER TABLE `aula_carga`
  ADD CONSTRAINT `aula_carga_ibfk_1` FOREIGN KEY (`clave_aula`) REFERENCES `aula` (`clave_aula`),
  ADD CONSTRAINT `aula_carga_ibfk_2` FOREIGN KEY (`clave_maestro`) REFERENCES `carga` (`clave_maestro`),
  ADD CONSTRAINT `aula_carga_ibfk_3` FOREIGN KEY (`clave_materia`) REFERENCES `carga` (`clave_materia`),
  ADD CONSTRAINT `aula_carga_ibfk_4` FOREIGN KEY (`clave_grupo`) REFERENCES `carga` (`clave_grupo`);

--
-- Filtros para la tabla `carga`
--
ALTER TABLE `carga`
  ADD CONSTRAINT `carga_ibfk_1` FOREIGN KEY (`clave_maestro`) REFERENCES `oferta` (`clave_maestro`),
  ADD CONSTRAINT `carga_ibfk_2` FOREIGN KEY (`clave_materia`) REFERENCES `oferta` (`clave_materia`),
  ADD CONSTRAINT `carga_ibfk_3` FOREIGN KEY (`clave_grupo`) REFERENCES `grupo` (`clave_grupo`);

--
-- Filtros para la tabla `grupo`
--
ALTER TABLE `grupo`
  ADD CONSTRAINT `grupo_ibfk_1` FOREIGN KEY (`clave_carrera`) REFERENCES `carrera` (`clave_carrera`);

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `horario_ibfk_1` FOREIGN KEY (`clave_aula`) REFERENCES `aula` (`clave_aula`),
  ADD CONSTRAINT `horario_ibfk_2` FOREIGN KEY (`clave_maestro`) REFERENCES `carga` (`clave_maestro`),
  ADD CONSTRAINT `horario_ibfk_3` FOREIGN KEY (`clave_materia`) REFERENCES `carga` (`clave_materia`),
  ADD CONSTRAINT `horario_ibfk_4` FOREIGN KEY (`clave_grupo`) REFERENCES `carga` (`clave_grupo`);

--
-- Filtros para la tabla `maestro`
--
ALTER TABLE `maestro`
  ADD CONSTRAINT `maestro_ibfk_1` FOREIGN KEY (`email`) REFERENCES `usuarios` (`email`);

--
-- Filtros para la tabla `malla_curricular`
--
ALTER TABLE `malla_curricular`
  ADD CONSTRAINT `malla_curricular_ibfk_1` FOREIGN KEY (`clave_carrera`) REFERENCES `carrera` (`clave_carrera`),
  ADD CONSTRAINT `malla_curricular_ibfk_2` FOREIGN KEY (`clave_materia`) REFERENCES `materia` (`clave_materia`);

--
-- Filtros para la tabla `oferta`
--
ALTER TABLE `oferta`
  ADD CONSTRAINT `oferta_ibfk_1` FOREIGN KEY (`clave_maestro`) REFERENCES `maestro` (`clave_maestro`),
  ADD CONSTRAINT `oferta_ibfk_2` FOREIGN KEY (`clave_materia`) REFERENCES `materia` (`clave_materia`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
