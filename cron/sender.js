const cron = require('node-cron');
const Axios = require("axios");
const Meeting = require("../models/meeting.model");

const cronSender = () => {
    /*
    # ┌────────────── second (optional)
    # │ ┌──────────── minute
    # │ │ ┌────────── hour
    # │ │ │ ┌──────── day of month
    # │ │ │ │ ┌────── month
    # │ │ │ │ │ ┌──── day of week
    # │ │ │ │ │ │
    # │ │ │ │ │ │
    # * * * * * *
    */

    const fiveSecs = '*/5 * * * * *';

    cron.schedule(fiveSecs, () => {
        //console.log('Eseguo il cron...');
        /*
        il cron fa una query a mongo
        chiede se ci sono reminder attivi in data odierna che devono essere inviati tra l'orario corrente e 10 minuti in avanti
        una volta trovata la lista li scorre uno ad uno
        preleva il meeting, il quale a sua volta preleva il cliente
        Dal cliente si trovano i contatti
        Si provano a smistare le varie chiamate
        > Viene aggiornato il reminder con il valore di uscita della query (eseguito o meno, e se non eseguito con quale errore)
        */
       //TODO: fix
        Axios.get("http://localhost:5000/api/meeting/getTodayReminders",
            {
                headers: {
                    Authorization: "Bearer " + process.env.ADMIN_AUTH
                }
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.data)
            })


    });

}

module.exports = { cron: cronSender }
