const $ = require('jquery');

test("Comprobar la informacion de los grupos ",() => {
    expect(JSON.parse(getGroupInfo()).length).toBe(7);
});

function getGroupInfo(){
    return $.ajax({
            type: "GET",
            url: "../MyScheduleLite/php/manage_data.php",
            async: false
        }).responseText
}