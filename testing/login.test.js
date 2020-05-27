const $ = require('jquery');

test('Comprobar la conexion correcta con la base de datos', () => {
    expect(login("","asdasdasd")).toBe(200);
  });

function login(nameuser, password) {
    return $.ajax({
        type: "POST",
        url: "../MyScheduleLite/php/authenticate_user.php",
        data: {
            email: nameuser,
            password: password
        },
        async: false
    }).status;
}

test('Comprobar el login exitoso', () => {
    console.log(JSON.parse(loginautentication("admin2@admin.com","asdasdasd")).message);
    expect(JSON.parse(loginautentication("admin2@admin.com","asdasdasd")).message).toMatch("../MyScheduleLite/pages/main.html");
  });

function loginautentication(nameuser, password) {
    if( nameuser && password ){
        return $.ajax({
            type: "POST",
            url: "../MyScheduleLite/php/authenticate_user.php",
            data: {
                email: nameuser,
                password: password
            },
            async: false
        }).responseText;
    }
    return "";
}