CREATE TABLE `usuarios` (
	`email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(20) NOT NULL,
	PRIMARY KEY (`email`)
) ENGINE=InnoDB;

CREATE TABLE `carrera` (
	`clave_carrera` INT NOT NULL,
	`duracion` INT(10) NOT NULL,
	`nombre_carrera` VARCHAR(50) NOT NULL,
	PRIMARY KEY (`clave_carrera`)
) ENGINE=InnoDB;

CREATE TABLE `materia` (
	`clave_materia` INT NOT NULL,
    `nombre_materia` VARCHAR(50) NOT NULL,
	`creditos` INT(10) NOT NULL,
	PRIMARY KEY (`clave_materia`)
) ENGINE=InnoDB;

CREATE TABLE `horario` (
	`clave_materia` INT NOT NULL,
    `lunes` VARCHAR(255) NOT NULL,
	`martes` VARCHAR(255) NOT NULL,
	`miercoles` VARCHAR(255) NOT NULL,
	`jueves` VARCHAR(255) NOT NULL,
	`viernes` VARCHAR(255) NOT NULL,
	PRIMARY KEY (`clave_materia`),
	CONSTRAINT fk_materia FOREIGN KEY (clave_materia) REFERENCES materia(clave_materia)
) ENGINE=InnoDB;

CREATE TABLE `aula` (
	`clave_aula` INT NOT NULL,
    `nombre_aula` VARCHAR(50) NOT NULL,
	`tipo` VARCHAR(20) NOT NULL,
	`descripcion` VARCHAR(255) NOT NULL,
	`horas_requeridas` INT(10) NOT NULL,
	PRIMARY KEY (`clave_aula`)
) ENGINE=InnoDB;

CREATE TABLE `grupos` (
	`clave_grupo` INT NOT NULL,
	`ciclo_escolar` VARCHAR(50) NOT NULL,
	`clave_carrera` INT NOT NULL,
    `turno` INT NOT NULL,
    `creditos_aprobados` INT NOT NULL,
    `semestre` INT NOT NULL,
	PRIMARY KEY (`clave_grupo`,`ciclo_escolar`,`clave_carrera`),
    CONSTRAINT fk_grupo_carrera FOREIGN KEY (clave_carrera) REFERENCES carrera(clave_carrera)
) ENGINE=InnoDB;

CREATE TABLE `administrador` (
	`clave_administrador` INT NOT NULL AUTO_INCREMENT,
	`nombre_administrador` VARCHAR(50) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`clave_administrador`),
    CONSTRAINT fk_admin_email FOREIGN KEY (email) REFERENCES usuarios(email)
) ENGINE=InnoDB;

CREATE TABLE `maestro` (
	`clave_maestro` INT NOT NULL,
	`nombre_maestro` VARCHAR(50) NOT NULL,
	`email` VARCHAR(100) NOT NULL,
	PRIMARY KEY (`clave_maestro`),
    CONSTRAINT fk_maestro_email FOREIGN KEY (email) REFERENCES usuarios(email)
) ENGINE=InnoDB;

CREATE TABLE `alumno` (
  `matricula` INT NOT NULL,
  `nombre_alumno` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `numero_grupo` INT NOT NULL,
  `ciclo_escolar` VARCHAR(50) NOT NULL,
  `clave_carrera` INT NOT NULL,
  PRIMARY KEY (`matricula`),
  CONSTRAINT fk_alumno_email FOREIGN KEY (email) REFERENCES usuarios(email),
  CONSTRAINT fk_alumno_grupos FOREIGN KEY (numero_grupo,ciclo_escolar,clave_carrera) REFERENCES grupos(clave_grupo,ciclo_escolar,clave_carrera)
) ENGINE=InnoDB;


CREATE TABLE `grupos_materia` (
	`clave_materia` INT NOT NULL,
	`clave_grupo` INT NOT NULL,
    `ciclo_escolar` VARCHAR(50) NOT NULL,
    `clave_carrera` INT NOT NULL,
	`clave_aula` INT(10) NOT NULL,
	PRIMARY KEY (`clave_materia`,`clave_grupo`,`ciclo_escolar`,`clave_carrera`),
    CONSTRAINT fk_grupos_materia_clave_materia FOREIGN KEY (clave_materia) REFERENCES materia(clave_materia),
	CONSTRAINT fk_grupos_materia_grupos FOREIGN KEY (clave_grupo,ciclo_escolar,clave_carrera) REFERENCES grupos(clave_grupo,ciclo_escolar,clave_carrera),
	CONSTRAINT fk_grupos_materia_aula FOREIGN KEY (clave_aula) REFERENCES aula(clave_aula)
) ENGINE=InnoDB;

CREATE TABLE `grupos_materia_maestro` (
	`clave_maestro` INT NOT NULL,
	`clave_materia` INT NOT NULL,
	`clave_grupo` INT NOT NULL,
    `ciclo_escolar` VARCHAR(50) NOT NULL,
    `clave_carrera` INT NOT NULL,
	PRIMARY KEY (`clave_maestro`,`clave_materia`,`clave_grupo`,`ciclo_escolar`,`clave_carrera`),
    CONSTRAINT fk_grupos_materia_maestro FOREIGN KEY (clave_maestro) REFERENCES maestro(clave_maestro),
	CONSTRAINT fk_grupos_materia_maestro_grupos FOREIGN KEY (clave_materia,clave_grupo,ciclo_escolar,clave_carrera) REFERENCES grupos_materia(clave_materia,clave_grupo,ciclo_escolar,clave_carrera)
) ENGINE=InnoDB;