var elementselected = null;
var seccionmaterias = $("#materias");
var subjectsbutton = $("#crearhorario");

function gruposClickEvent(gruposeleccionado){
    seccionmaterias.empty();
    if(elementselected){
        elementselected.style.width = "";
        elementselected.style.height = "";
        elementselected.style.position = "";
        elementselected.style.paddingTop = "";
        elementselected.style.transition = "";
        elementselected.style.boxShadow = "";
        elementselected.style.border = "";
    }
    gruposeleccionado.style.width = "420px";
    gruposeleccionado.style.height = "50px";
    gruposeleccionado.style.position = "relative";
    gruposeleccionado.style.paddingTop = "25px";
    gruposeleccionado.style.border = "1px solid";
    elementselected = gruposeleccionado;
    subjectsCharge(gruposeleccionado.value);
}

function subjectsCharge(value){
    seccionmaterias.append('<h2 class = "texto">' + grupos[value].grupo.clave_carrera + ' - Grupo' 
    + grupos[value].grupo.clave_grupo + '<img id = "separadortitulo" src="../images/iconos/divisor.png" alt="divisor">Generación: '
    + grupos[value].grupo.ciclo_escolar + ' - ' + grupos[value].grupo.turno + "</h2>");
    seccionmaterias.append('<section id = "cuadromaterias"></section>');
    if(buttonText(grupos[value].materias.length)){
        subjectsPictures(grupos[value].materias);
    }
}

function buttonText(subjectsnumber){
    if(subjectsnumber == 0){
        document.getElementById("crearhorario").innerHTML = "Crear horario";
        return false;
    }
    document.getElementById("crearhorario").innerHTML = "Editar horario";
    return true;
}

function subjectsPictures(groupsubjects){
    var subjectpicture = $("#cuadromaterias");
    groupsubjects.forEach(subject => {
        if(subject.clave_materia){
            let hpresenciales = subject.horas_presenciales;
            let hnpresenciales = subject.horas_no_presenciales;
            let htotal = +hpresenciales + +hnpresenciales;
            subjectpicture.append('<div class = "informacionmateria"> '+ 
                                    '<div class = "font title">' + subject.nombre_materia + '</div>' +
                                    '<img src="../images/iconos/line.png" class = "line">' + 
                                    '<p class = "font space">'+ subject.clave_materia + '</p>' + 
                                    '<p class = "font space">Horas presenciales:'+hpresenciales+'</p>' + 
                                    '<p class = "font space">Horas no presenciales:'+hnpresenciales+'</p>' + 
                                    '<p class = "font space">Horas totales:'+ htotal +'&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Creditos:'+ subject.creditos_materia +'</p>' +
                                    '</div>');
        }
    });
}

function chargeSchedule(){
    
    numbergroup = elementselected.value;
    clave = grupos[numbergroup].grupo.clave_grupo;
    window.location.href = "../pages/schedule.html?"+"clave_grupo="+clave;
}