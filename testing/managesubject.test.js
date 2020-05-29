const $ = require('jquery');
var request = '{"clave_aula":"CC3","clave_maestro":"343434","clave_materia":"MAT162-CM","dia_semana":"Lunes","hora_inicio":"7:30","hora_termina":"8:00","nombre_maestro":"Carlos Benito Mujica","nombre_materia":"Cultura Maya"}';
var key = "2";

test('Comprobar la correcta insercion de materias en horario', () => {
  expect(JSON.parse(addSubject(request,key).substring(1)).status).toBe(200);
});

test('Comprobar el error al insertar una materia en un horario ocupado', () => {
  expect(JSON.parse(addSubject(request,key)).status).toBe(404);
});

function addSubject(outjson,outclv){
  return $.ajax({
    method: "POST",
    url: "../MyScheduleLite/php/update_schedule.php",
    data: { "horario":outjson, "clave":outclv },
    success: function (response) {
      return response;
    },
    error: function (xhr, ajaxOptions, thrownError) {
      console.log(xhr.status);
      console.log(thrownError);
      return thrownError;
    },
    async: false
  }).responseText;
}

test('Comprobar la correcta eliminacion de un horario especifico', () => {
  expect(JSON.parse(deleteSub(JSON.parse(request).clave_materia,key)).message).toBe('Horario eliminado correctamente');
});

function deleteSub(outmat,outclv){
  outmat = JSON.stringify(outmat);
  return $.ajax({
    method: "POST",
    url: "../MyScheduleLite/php/remove_schedule.php",
    data: {"clave":outclv, "materia":outmat
    },
    success: function (response) {
      return response;
    },
    error: function (xhr, ajaxOptions, thrownError) {
      return thrownError;
    },
    async: false
  }).responseText;
}