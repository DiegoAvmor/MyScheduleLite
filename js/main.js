var elementselected = null;
var seccionmaterias = $("#materias");
var subjectsbutton = $("#crearhorario");

function gruposClickEvent(gruposeleccionado){
    seccionmaterias.empty();
    if(elementselected){
        elementselected.style.width = document.getElementById("grupos").offsetWidth - 20 + "px";
        elementselected.style.height = "";
        elementselected.style.position = "";
        elementselected.style.paddingTop = "";
        elementselected.style.transition = "";
        elementselected.style.boxShadow = "";
        elementselected.style.border = "";
    }
    console.log(gruposeleccionado.offsetHeight);
    console.log(gruposeleccionado.offsetWidth);
    gruposeleccionado.style.width = gruposeleccionado.offsetWidth + 5 + "px";
    gruposeleccionado.style.height = gruposeleccionado.offsetHeight - 25 + "px";
    gruposeleccionado.style.position = "relative";
    gruposeleccionado.style.paddingTop = "25px";
    gruposeleccionado.style.border = "1px solid";
    elementselected = gruposeleccionado;
    subjectsCharge(gruposeleccionado.value);
}

function pageId(){
    document.getElementById("mainid").style.backgroundColor = "black";
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
                                    '<p class = "font space">Horas totales:'+ htotal +'&nbsp; &nbsp; &nbsp;  Creditos:'+ subject.creditos_materia +'</p>' +
                                    '</div>');
        }
    });
}

function chargeSchedule(){
    if(elementselected){
        numbergroup = elementselected.value;
        clave = grupos[numbergroup].grupo.clave_grupo;
        document.cookie = "groupkey=" + grupos[numbergroup].grupo.clave_carrera;
        document.cookie = "groupgeneration=" + grupos[numbergroup].grupo.ciclo_escolar;
        window.location.href = "../pages/schedule.html?"+"clave_grupo="+clave+"&turno="+grupos[numbergroup].grupo.turno;
    }
}

var grupos;
var domGrupos = new Array();//Elementos DOM de los grupos
var nuevoselementos;
function createDivsGrous(){
    for(var contador= 0;contador < grupos.length;contador++){
        let infogrupo = document.createElement('div');
        infogrupo.setAttribute("class","texto barragrupos");
        infogrupo.setAttribute("onclick","gruposClickEvent(this)");
        infogrupo.setAttribute("id","Grupo " + grupos[contador].grupo.clave_grupo );
        infogrupo.innerHTML = grupos[contador].grupo.clave_carrera + " - Grupo" 
        + grupos[contador].grupo.clave_grupo + '<img id="divisor" src="../images/iconos/divisor.png" alt="divisor"> Generación: '
        + grupos[contador].grupo.ciclo_escolar + ' - ' + grupos[contador].grupo.turno;
        $("#grupos").append(infogrupo);
        domGrupos.push(infogrupo);
    }
    nuevoselementos = document.getElementsByClassName("barragrupos");
    for(var contador = 0;contador<nuevoselementos.length;contador++){
        nuevoselementos[contador].value = contador;
    }
    displayWindowSize();
}

function displayWindowSize(){
    document.getElementById("barratareas").style.height = document.documentElement.clientHeight - 110 + "px";
    document.getElementById("grupos").style.height = document.documentElement.clientHeight - 280 + "px";
    document.getElementById("grupos").style.width = document.documentElement.clientWidth/3 +"px";
    barragrupos = document.getElementsByClassName("barragrupos");
    let groupdivwidth = document.getElementById('grupos').offsetWidth;
    for(var contador = 0;contador<nuevoselementos.length;contador++){
        barragrupos[contador].style.width = groupdivwidth - 20 + "px";
    }
    document.getElementById("secciongrupos").style.width = document.getElementById("grupos").offsetWidth - 20 + "px";
    document.getElementById("cuadromaterias").style.width = document.documentElement.clientWidth/2.2 + "px";
    document.getElementById("materias").style.width = document.documentElement.clientWidth/2.2 + "px";
    document.getElementById("materias").style.height = document.documentElement.clientHeight - 260 + "px";
    //document.getElementById("cuadromaterias").style.height = document.documentElement.clientHeight - 260 + "px"; 
}

window.addEventListener("resize",displayWindowSize);