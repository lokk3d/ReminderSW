var fs = require('fs');
var path = require('path');

function logOnFile(username, text) {
    console.log("Creo utente: "+username+ " | " + text)
    let m = new Date();
    let dateString = m.getUTCFullYear() + "/" + (m.getUTCMonth() + 1) + "/" + m.getUTCDate() + "_"
        + m.getUTCHours() + ":" + m.getUTCMinutes() + ":" + m.getUTCSeconds();

    let jsonPath = path.join(__dirname, 'files', 'logs', username + ".log");
    fs.appendFile(jsonPath,
        "\n"+dateString + "\t" + text, function (err) {
            if (err) throw err;
        });
}


module.exports = logOnFile