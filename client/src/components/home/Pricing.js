import React, {useState, useEffect} from "react";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PricingItem from "./PricingItem";

const useStyles = makeStyles(theme => ({
    row: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    }
}));

function Pricing(props){
    const classes = useStyles();
 return (
    <div className={classes.row} style={{padding:20}}>
        <PricingItem 
            name="Base"
            price="$19"
            link="#"
            items= {["Gestisci i clienti",
            "Fino a 5 reminder al giorno",
            "Contatti via email - SMS"]}
        />


        <PricingItem 
            name="Ultimate"
            price="$49"
            link="#"
            items= {["Gestisci i clienti",
            "Fino a 5 reminder al giorno",
            "Campi personalizzati per i clienti",
            "Contatti via email - SMS - Instagram - Whatsapp - Facebook",
            "Personalizzazione",
            "Supporto telefonico 24/7"
            ]}
            bestChoice={true}

        />

        <PricingItem 
            name="Premium"
            price="$39"
            link="#"
            items= {["Gestisci i clienti",
            "Fino a 5 reminder al giorno",
            "Campi personalizzati per i clienti",
            "Contatti via email - SMS - Whatsapp ",
            "Supporto via email"
            ]}
        />

    </div>
    )   
}

export default Pricing