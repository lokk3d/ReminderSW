const router = require("express").Router();
var axios = require("axios")
var bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

require("dotenv").config();
const MINUTES_THRESHOLD = 1000

router.route("/").get([

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const adminAuth = "Bearer " + process.env.ADMIN_AUTH

    axios.get("http://localhost:5000/api/meeting/getTodayReminders",
        {
            headers: {
                Authorization: adminAuth
            }
        })
        .then(res => {
            const meetings = res.data
            meetings.forEach(meeting => {

                const reminders = meeting.reminder
                reminders.forEach(reminder => {

                    if (reminder.executed !== true) {
                        console.log("Da eseguire ")
                        console.log(reminder)

                        let diffMins = getMinutesDifference(new Date(), new Date(reminder.date))
                        console.log("Mancano " + diffMins + " minuti all'eseguzione del reminder")

                        if (diffMins > 0 && diffMins <= MINUTES_THRESHOLD) {
                            execReminder(reminder, meeting)
                        }
                    }
                })



            });
        })
        .catch(err => {
            //console.log(err.data)
        })
    res.status(200).json("")

});

const getMinutesDifference = (date1, date2) => {
    const diffTime = date2 - date1

    let diffHrs = Math.floor((diffTime % 86400000) / 3600000); // hours
    let diffMins = Math.round(((diffTime % 86400000) % 3600000) / 60000); //mins
    return diffMins + (diffHrs * 60)

}

const execReminder = (reminder, meeting) => {
    //TODO: fai un refactoring generale
    //TODO: rimuovi il codice duplicato
    //TODO: scrivi un'unica api per prendere tutte le sessioni
    const contacts = reminder.contacts

    generateUserToken(meeting.professional, (token) => {
        if (typeof token === "undefined") {
            logError("Errore nella generazione del token di autenticazione");
        } else {

            if (contacts.email === true) {
                sendEmail(token, reminder, meeting,(res) => {
                    if(res == true){
                        let index = meeting.reminder.indexOf(reminder);
                            console.log(index)
                            meeting.reminder[index].executed =  true
                            console.log(meeting)

                            axios.post('http://localhost:5000/api/meeting/update',
                            {meeting: meeting},
                            { headers: { authorization: "Bearer " + token } })
                              .then((res) => {
                                console.log(res.data)
                              })
                              .catch((err) => {
                                console.log(err)
                              })
                    }
                })
            }



            if (contacts.whatsapp === true) {
                sendWhatsapp(token, reminder, meeting,(res) => {
                    if(res == true){
                        let index = meeting.reminder.indexOf(reminder);
                            console.log(index)
                            meeting.reminder[index].executed =  true
                            console.log(meeting)

                            axios.post('http://localhost:5000/api/meeting/update',
                            {meeting: meeting},
                            { headers: { authorization: "Bearer " + token } })
                              .then((res) => {
                                console.log(res.data)
                              })
                              .catch((err) => {
                                console.log(err)
                              })
                    }
                })
            }

        }
    })

}



async function generateUserToken(email, callback) {
    //console.log("Genero un token per l'utente: " + email);
    const adminAuth = "Bearer " + process.env.ADMIN_AUTH

    axios.post('http://localhost:5000/api/admin/generateUserToken',
        { email: email },
        { headers: { authorization: adminAuth } })
        .then((res) => {
            //console.log(res.data.authToken)
            callback(res.data.authToken)
        })
        .catch((err) => {

        })
}

async function sendEmail(token, reminder, meeting, callback) {
    //ho la sessione email configurata? (si/no)
    //il cliente ha il contatto sul quale inviare? (si/no)
    //prova ad inviare il reminder
    //imposta executed: true nel reminder e fai l'update del reminder (non so come, fa tu)
    axios.get('http://localhost:5000/api/user/session/getEmailSession',
        { headers: { authorization: "Bearer " + token } })
        .then((session) => {
            if (session.data.defined) {
                console.log("Email found: " + session.data.username)

                const client = meeting.client
                axios.post('http://localhost:5000/api/client/contacts',
                    { id: client },
                    { headers: { authorization: "Bearer " + token } })
                    .then((contacts) => {
                        if (typeof contacts.data.email === "undefined") {
                            logError("Email di contatto per il cliente " + meeting.client + " non definita");
                        } else {
                            console.log("Email di contatto: " + contacts.data.email)

                            const subject = "Attenzione, hai un nuovo reminder!"

                            const obj = {
                                email: session.data.username,
                                password: session.data.password,
                                toEmail: contacts.data.email,
                                subject: subject,
                                text: reminder.text
                            }

                            console.log(obj)
                            
                           axios.post('http://localhost:5000/api/sender/email/send',
                           obj,
                           { headers: { authorization: "Bearer " + token } })
                             .then((res) => {
                               //console.log(res)
                               logSuccess("Email inviata correttamente! ")
                               callback(true)

                             })
                             .catch((err) => {
                                 logError("Errore nell'invio dell'email ")
                               console.log(err)
                             })                             
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            }
        })
        .catch((err) => {
            logError("Errore, sessione email non definita o impossibile da recuperare");

        })
}


async function sendWhatsapp(token, reminder, meeting, callback){
    axios.get('http://localhost:5000/api/user/session/getWhatsappSession',
        { headers: { authorization: "Bearer " + token } })
        .then((session) => {
            if (session.data.defined) {
                console.log("Whatsapp found: " + session.data.sessionId)

                const client = meeting.client
                axios.post('http://localhost:5000/api/client/contacts',
                    { id: client },
                    { headers: { authorization: "Bearer " + token } })
                    .then((contacts) => {
                        if (typeof contacts.data.whatsapp === "undefined") {
                            logError("Numero di contatto (Whatsapp) per il cliente " + meeting.client + " non definito");
                        } else {
                            console.log("Contatto (Whatsapp): " + contacts.data.whatsapp)

                            const obj = {                                 
                                instance: session.data.sessionId,
                                chatId: contacts.data.whatsapp,
                                msg: reminder.text
                            }

                            console.log(obj)
                            
                           axios.post('http://localhost:5000/api/sender/whatsapp/send',
                           obj,
                           { headers: { authorization: "Bearer " + token } })
                             .then((res) => {
                               //console.log(res)
                               logSuccess("Messaggio Whatsapp inviato correttamente! ")
                               callback(true)

                             })
                             .catch((err) => {
                                 logError("Errore nell'invio del messaggio Whatsapp ")
                               console.log(err)
                             })                             
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })

            }
        })
        .catch((err) => {
            logError("Errore, sessione whatsapp non definita o impossibile da recuperare");

        })
}

const logError = (msg) => {
    //TODO: implementare salvataggio su file di msg (per ogni utente) 
    console.log(msg);
}

const logSuccess = (msg) => {
    //TODO: implementare salvataggio su file di msg (per ogni utente) 
    console.log(msg);
}


router.route("/lol").get((req, res) => {
    res.status(200).json("loool")

});

module.exports = router;