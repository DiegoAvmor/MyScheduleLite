function chargeTime(turno){
   document.getElementById(turno).style.display = 'block';
}

function setGroupHeader(keycarrer, keygroup, groupgeneration, groupturn){
    $('#groupinfo').append(
        '<h2>' + keycarrer + ' - Grupo ' 
    + keygroup + '<img id = "separadortitulo" src="../images/iconos/divisor.png" alt="divisor">Generación: '
    + groupgeneration + ' - ' + groupturn + "</h2>"    );
}

function pageId(){
    document.getElementById("scheduleid").style.backgroundColor = "black";
}

/**
 * 
<div class = "scheduleinfo">
    <div class = "scheduletitle montserratfont font16 fontsemibold">Fundamentos de ingnieria de software</div><img src = "../images/iconos/options.png" class = "optionsbuton">
    <img id = "horizontalseparator" src = "../images/iconos/horizontalseparator.png">
    <p class = "montserratfont font16">Nombre del maestro</p>
    <p class = "montserratfont font16">Aula</p>
</div>
 */
function chargeSubjectsTable(subject){
    let newschedulelement = document.createElement('div');
    newschedulelement.setAttribute("class","scheduleinfo " + subject.clave_materia);
    let newschedulecontainer = document.createElement('div');
    let newsubjecttitle = document.createElement('div');
    newsubjecttitle.setAttribute("class","scheduletitle montserratfont font16 fontsemibold");
    newsubjecttitle.innerHTML = subject.nombre_materia;
    let newoptionsbutton = document.createElement("button");
    newoptionsbutton.setAttribute("onclick","openModalButtons(this)");
    newoptionsbutton.setAttribute("class","optionsbuton");
    newoptionsbutton.setAttribute("id",subject.clave_materia + ',' + subject.nombre_materia);
    let newseparator = document.createElement("img");
    newseparator.setAttribute("id","horizontalseparator");
    newseparator.setAttribute("src","../images/iconos/horizontalseparator.png");
    let newteachername = document.createElement("p");
    newteachername.setAttribute("class","montserratfont font16");
    newteachername.innerHTML = subject.nombre_maestro;
    let newroomname = document.createElement("p");
    newroomname.setAttribute("class","montserratfont font16");
    newroomname.innerHTML = "Aula: " + subject.clave_aula;
    newschedulelement.append(newschedulecontainer);
    newschedulecontainer.append(newsubjecttitle);
    newschedulecontainer.append(newoptionsbutton);
    newschedulecontainer.append(newseparator);
    newschedulecontainer.append(newteachername);
    newschedulecontainer.append(newroomname);
    document.getElementById("scheduletable").rows[timesmorning[subject.hora_inicio]].cells[weekdays[subject.dia_semana]].append(newschedulelement);
}

var popupoptionssubjectselected;
var popupoptionssubkeyselected;
function openModalButtons(divoption){
    popupoptionssubkeyselected = divoption.id.split(',')[0];
    popupoptionssubjectselected = divoption.id.split(',')[1];
    const modal = document.getElementById('optionspopup');
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeModalButtons(elementname){
    const modal = document.getElementById(elementname);
    modal.classList.remove('active');
    overlay.classList.remove('active');
    if(elementname === "editionpopup"){
        restartElement($('.dayspopupoption'),document.getElementById("errordivoption"));
        popupoptionssubkeyselected = "";
        popupoptionssubjectselected = "";
    }
}

function openAddScheduleButtons(){
    const modal = document.getElementById('addschedulepopup');
    modal.classList.add('active');
    overlay.classList.add('activenoopacity');
    //chargeOffer();
}

function openEditModal(){
    chargeSubjectName();
    closeModalButtons('optionspopup');
    const modal = document.getElementById('editionpopup');
    if(modal == null) return;
    modal.classList.add('active');
    overlay.classList.add('active');
}

function closeAddScheduleButtons(){
    const modal = document.getElementById('addschedulepopup');
    if(modal == null) return;
    modal.classList.remove('active');
    overlay.classList.remove('activenoopacity');
    restartElement($('.dayspopup'),document.getElementById("errordiv"));
}

function displayWindowSize(){
    document.getElementById("barratareas").style.height = document.documentElement.clientHeight - 110 + "px";
}

window.addEventListener("resize",displayWindowSize);

function returnMainPage(){
    window.location.assign("main.html");
}

function restartElement(weeknameelements,errordiv){
    for(var counter = 0;counter < weeknameelements.length;counter ++){
        weeknameelements[counter].style.color = '#444444';
        document.getElementsByName(weeknameelements[counter].id)[0].style.display = "none";
    }
    errordiv.style.display = "none";
    selectweekelements = [false,false,false,false,false];
}