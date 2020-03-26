USE my_schedule_lite;

CREATE TABLE `administrador` (
  `clave_administrador` int(11) NOT NULL,
  `nombre_administrador` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`clave_administrador`, `nombre_administrador`, `email`) VALUES
(14000799, 'Carlos Pool', 'carlospq_17@hotmail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

CREATE TABLE `alumno` (
  `matricula` int(11) NOT NULL,
  `nombre_alumno` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `numero_grupo` int(11) NOT NULL,
  `ciclo_escolar` varchar(50) NOT NULL,
  `clave_carrera` int(11) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`matricula`, `nombre_alumno`, `email`, `numero_grupo`, `ciclo_escolar`, `clave_carrera`) VALUES
(0, 'Nombre0', 'correo0@correoejemplo.com', 1, '2019-2020', 1),
(1, 'Nombre1', 'correo1@correoejemplo.com', 1, '2019-2020', 1),
(4, 'Nombre2', 'correo2@correoejemplo.com', 1, '2019-2020', 1),
(9, 'Nombre3', 'correo3@correoejemplo.com', 1, '2019-2020', 1),
(16, 'Nombre4', 'correo4@correoejemplo.com', 1, '2019-2020', 1),
(25, 'Nombre5', 'correo5@correoejemplo.com', 1, '2019-2020', 1),
(36, 'Nombre6', 'correo6@correoejemplo.com', 1, '2019-2020', 1),
(49, 'Nombre7', 'correo7@correoejemplo.com', 1, '2019-2020', 1),
(64, 'Nombre8', 'correo8@correoejemplo.com', 1, '2019-2020', 1),
(81, 'Nombre9', 'correo9@correoejemplo.com', 1, '2019-2020', 1),
(100, 'Nombre10', 'correo10@correoejemplo.com', 1, '2019-2020', 1),
(121, 'Nombre11', 'correo11@correoejemplo.com', 1, '2019-2020', 1),
(144, 'Nombre12', 'correo12@correoejemplo.com', 1, '2019-2020', 1),
(169, 'Nombre13', 'correo13@correoejemplo.com', 1, '2019-2020', 1),
(196, 'Nombre14', 'correo14@correoejemplo.com', 1, '2019-2020', 1),
(225, 'Nombre15', 'correo15@correoejemplo.com', 1, '2019-2020', 1),
(256, 'Nombre16', 'correo16@correoejemplo.com', 1, '2019-2020', 1),
(289, 'Nombre17', 'correo17@correoejemplo.com', 1, '2019-2020', 1),
(324, 'Nombre18', 'correo18@correoejemplo.com', 1, '2019-2020', 1),
(361, 'Nombre19', 'correo19@correoejemplo.com', 1, '2019-2020', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `aula`
--

CREATE TABLE `aula` (
  `clave_aula` int(11) NOT NULL,
  `nombre_aula` varchar(50) NOT NULL,
  `tipo` varchar(20) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `horas_requeridas` int(10) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `aula`
--

INSERT INTO `aula` (`clave_aula`, `nombre_aula`, `tipo`, `descripcion`, `horas_requeridas`) VALUES
(1, 'D1', 'Aula', 'Aula D1', 50),
(11, 'H5', 'Laboratorio', 'Laboratorio de usos multiples', 30),
(12, 'CC3', 'Laboratorio', 'Laboratorio de cómputo CC3', 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrera`
--

CREATE TABLE `carrera` (
  `clave_carrera` varchar(6) NOT NULL,
  `duracion` int(10) NOT NULL,
  `nombre_carrera` varchar(50) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `carrera`
--

INSERT INTO `carrera` (`clave_carrera`, `duracion`, `nombre_carrera`) VALUES
(0, 0, 'Carrera No.0'),
(1, 11, 'LICENCIATURA EN INGENIERIA DE SOFTWARE'),
(2, 4, 'Carrera No.2'),
(3, 6, 'Carrera No.3'),
(4, 8, 'Carrera No.4'),
(5, 10, 'Carrera No.5'),
(6, 12, 'Carrera No.6'),
(7, 14, 'Carrera No.7'),
(8, 16, 'Carrera No.8'),
(9, 18, 'Carrera No.9'),
(10, 20, 'Carrera No.10'),
(11, 22, 'Carrera No.11'),
(12, 24, 'Carrera No.12'),
(13, 26, 'Carrera No.13'),
(14, 28, 'Carrera No.14'),
(15, 30, 'Carrera No.15'),
(16, 32, 'Carrera No.16'),
(17, 34, 'Carrera No.17'),
(18, 36, 'Carrera No.18'),
(19, 38, 'Carrera No.19');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos`
--

CREATE TABLE `grupos` (
  `clave_grupo` int(11) NOT NULL,
  `ciclo_escolar` varchar(50) NOT NULL,
  `clave_carrera` int(11) NOT NULL,
  `turno` varchar(12) NOT NULL,
  `creditos_aprobados` int(11) NOT NULL,
  `semestre` int(11) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `grupos`
--

INSERT INTO `grupos` (`clave_grupo`, `ciclo_escolar`, `clave_carrera`, `turno`, `creditos_aprobados`, `semestre`) VALUES
(1, '2019-2020', 1, 1, 0, 1),
(2, '2019-2020', 2, 1, 0, 1),
(7, '2020-2021', 13, 0, 0, 1),
(12, '2019-2020', 0, 1, 0, 1),
(5, '2019-2020', 5, 1, 0, 1),
(6, '2019-2020', 6, 1, 0, 1),
(8, '2019-2020', 7, 1, 0,1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_materia`
--

CREATE TABLE `grupos_materia` (
  `clave_materia` int(11) NOT NULL,
  `clave_grupo` int(11) NOT NULL,
  `ciclo_escolar` varchar(50) NOT NULL,
  `clave_carrera` int(11) NOT NULL,
  `clave_aula` int(10) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `grupos_materia`
--

INSERT INTO `grupos_materia` (`clave_materia`, `clave_grupo`, `ciclo_escolar`, `clave_carrera`, `clave_aula`) VALUES
(0, 12, '2019-2020', 0, 12),
(2, 12, '2019-2020', 0, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `grupos_materia_maestro`
--

CREATE TABLE `grupos_materia_maestro` (
  `clave_maestro` int(11) NOT NULL,
  `clave_materia` int(11) NOT NULL,
  `clave_grupo` int(11) NOT NULL,
  `ciclo_escolar` varchar(50) NOT NULL,
  `clave_carrera` int(11) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `grupos_materia_maestro`
--

INSERT INTO `grupos_materia_maestro` (`clave_maestro`, `clave_materia`, `clave_grupo`, `ciclo_escolar`, `clave_carrera`) VALUES
(123123, 0, 12, '2019-2020', 0),
(123123, 2, 12, '2019-2020', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `horario`
--

CREATE TABLE `horario` (
  `clave_materia` int(11) NOT NULL,
  `lunes` varchar(255) NOT NULL,
  `martes` varchar(255) NOT NULL,
  `miercoles` varchar(255) NOT NULL,
  `jueves` varchar(255) NOT NULL,
  `viernes` varchar(255) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `horario`
--

INSERT INTO `horario` (`clave_materia`, `lunes`, `martes`, `miercoles`, `jueves`, `viernes`) VALUES
(0, '7:30 am - 8:00 am', '7:30 am - 8:00 am', '7:30 am - 8:00 am', '7:30 am - 8:00 am', '7:30 am - 8:00 am'),
(1, '8:30 am - 9:00 am', '7:30 am - 8:00 am', '7:00 am - 7:30 am', '8:00 am - 8:30 am', '7:45 am - 8:15 am'),
(2, '8:30 am - 9:00 am', '7:30 am - 8:00 am', '7:00 am - 7:30 am', '8:00 am - 8:30 am', '7:45 am - 8:15 am');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `maestro`
--

CREATE TABLE `maestro` (
  `clave_maestro` int(11) NOT NULL,
  `nombre_maestro` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `maestro`
--

INSERT INTO `maestro` (`clave_maestro`, `nombre_maestro`, `email`) VALUES
(2222, 'Carlos el profe', 'profe@unprofe.com'),
(123123, 'Juan Perez', 'profe@unprofe.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materia`
--

CREATE TABLE `materia` (
  `clave_materia` varchar(50) NOT NULL,
  `nombre_materia` varchar(50) NOT NULL,
  `creditos` int(10) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `materia`
--

INSERT INTO `materia` (`clave_materia`, `nombre_materia`, `creditos`) VALUES
(0, 'Materia de relleno 0', 0),
(1, 'Materia de relleno 1', 1),
(2, 'Materia de relleno 2', 2),
(3, 'Materia de relleno 3', 3),
(4, 'Materia de relleno 4', 4),
(5, 'Materia de relleno 5', 5),
(6, 'Materia de relleno 6', 6),
(7, 'Materia de relleno 7', 7),
(8, 'Materia de relleno 8', 8),
(9, 'Materia de relleno 9', 9),
(10, 'Materia de relleno 10', 10),
(11, 'Materia de relleno 11', 11),
(12, 'Materia de relleno 12', 12),
(13, 'Materia de relleno 13', 13),
(14, 'Materia de relleno 14', 14),
(15, 'Materia de relleno 15', 15),
(16, 'Materia de relleno 16', 16),
(17, 'Materia de relleno 17', 17),
(18, 'Materia de relleno 18', 18),
(19, 'Materia de relleno 19', 19);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `email` varchar(100) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`email`, `password`) VALUES
('carlospq_17@hotmail.com', '12345678'),
('correo0@correoejemplo.com', 'asdasd'),
('correo1@correoejemplo.com', 'asdasd'),
('correo10@correoejemplo.com', 'asdasd'),
('correo11@correoejemplo.com', 'asdasd'),
('correo12@correoejemplo.com', 'asdasd'),
('correo13@correoejemplo.com', 'asdasd'),
('correo14@correoejemplo.com', 'asdasd'),
('correo15@correoejemplo.com', 'asdasd'),
('correo16@correoejemplo.com', 'asdasd'),
('correo17@correoejemplo.com', 'asdasd'),
('correo18@correoejemplo.com', 'asdasd'),
('correo19@correoejemplo.com', 'asdasd'),
('correo2@correoejemplo.com', 'asdasd'),
('correo3@correoejemplo.com', 'asdasd'),
('correo4@correoejemplo.com', 'asdasd'),
('correo5@correoejemplo.com', 'asdasd'),
('correo6@correoejemplo.com', 'asdasd'),
('correo7@correoejemplo.com', 'asdasd'),
('correo8@correoejemplo.com', 'asdasd'),
('correo9@correoejemplo.com', 'asdasd'),
('otroprofe@otroprofe.com', 'unprofemas'),
('profe@unprofe.com', 'profesor');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`clave_administrador`),
  ADD KEY `fk_admin_email` (`email`);

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`matricula`),
  ADD KEY `fk_alumno_email` (`email`),
  ADD KEY `fk_alumno_grupos` (`numero_grupo`,`ciclo_escolar`,`clave_carrera`);

--
-- Indices de la tabla `aula`
--
ALTER TABLE `aula`
  ADD PRIMARY KEY (`clave_aula`);

--
-- Indices de la tabla `carrera`
--
ALTER TABLE `carrera`
  ADD PRIMARY KEY (`clave_carrera`);

--
-- Indices de la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD PRIMARY KEY (`clave_grupo`,`ciclo_escolar`,`clave_carrera`),
  ADD KEY `fk_grupo_carrera` (`clave_carrera`);

--
-- Indices de la tabla `grupos_materia`
--
ALTER TABLE `grupos_materia`
  ADD PRIMARY KEY (`clave_materia`,`clave_grupo`,`ciclo_escolar`,`clave_carrera`),
  ADD KEY `fk_grupos_materia_grupos` (`clave_grupo`,`ciclo_escolar`,`clave_carrera`),
  ADD KEY `fk_grupos_materia_aula` (`clave_aula`);

--
-- Indices de la tabla `grupos_materia_maestro`
--
ALTER TABLE `grupos_materia_maestro`
  ADD PRIMARY KEY (`clave_maestro`,`clave_materia`,`clave_grupo`,`ciclo_escolar`,`clave_carrera`),
  ADD KEY `fk_grupos_materia_maestro_grupos` (`clave_materia`,`clave_grupo`,`ciclo_escolar`,`clave_carrera`);

--
-- Indices de la tabla `horario`
--
ALTER TABLE `horario`
  ADD PRIMARY KEY (`clave_materia`);

--
-- Indices de la tabla `maestro`
--
ALTER TABLE `maestro`
  ADD PRIMARY KEY (`clave_maestro`),
  ADD KEY `fk_maestro_email` (`email`);

--
-- Indices de la tabla `materia`
--
ALTER TABLE `materia`
  ADD PRIMARY KEY (`clave_materia`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `clave_administrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14000800;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `fk_admin_email` FOREIGN KEY (`email`) REFERENCES `usuarios` (`email`);

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `fk_alumno_email` FOREIGN KEY (`email`) REFERENCES `usuarios` (`email`),
  ADD CONSTRAINT `fk_alumno_grupos` FOREIGN KEY (`numero_grupo`,`ciclo_escolar`,`clave_carrera`) REFERENCES `grupos` (`clave_grupo`, `ciclo_escolar`, `clave_carrera`);

--
-- Filtros para la tabla `grupos`
--
ALTER TABLE `grupos`
  ADD CONSTRAINT `fk_grupo_carrera` FOREIGN KEY (`clave_carrera`) REFERENCES `carrera` (`clave_carrera`);

--
-- Filtros para la tabla `grupos_materia`
--
ALTER TABLE `grupos_materia`
  ADD CONSTRAINT `fk_grupos_materia_aula` FOREIGN KEY (`clave_aula`) REFERENCES `aula` (`clave_aula`),
  ADD CONSTRAINT `fk_grupos_materia_clave_materia` FOREIGN KEY (`clave_materia`) REFERENCES `materia` (`clave_materia`),
  ADD CONSTRAINT `fk_grupos_materia_grupos` FOREIGN KEY (`clave_grupo`,`ciclo_escolar`,`clave_carrera`) REFERENCES `grupos` (`clave_grupo`, `ciclo_escolar`, `clave_carrera`);

--
-- Filtros para la tabla `grupos_materia_maestro`
--
ALTER TABLE `grupos_materia_maestro`
  ADD CONSTRAINT `fk_grupos_materia_maestro` FOREIGN KEY (`clave_maestro`) REFERENCES `maestro` (`clave_maestro`),
  ADD CONSTRAINT `fk_grupos_materia_maestro_grupos` FOREIGN KEY (`clave_materia`,`clave_grupo`,`ciclo_escolar`,`clave_carrera`) REFERENCES `grupos_materia` (`clave_materia`, `clave_grupo`, `ciclo_escolar`, `clave_carrera`);

--
-- Filtros para la tabla `horario`
--
ALTER TABLE `horario`
  ADD CONSTRAINT `fk_materia` FOREIGN KEY (`clave_materia`) REFERENCES `materia` (`clave_materia`);

--
-- Filtros para la tabla `maestro`
--
ALTER TABLE `maestro`
  ADD CONSTRAINT `fk_maestro_email` FOREIGN KEY (`email`) REFERENCES `usuarios` (`email`);
COMMIT;