import React, { useState, useEffect } from "react";
import { Grid } from '@material-ui/core';
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

function Pricing(props) {
    const classes = useStyles();
    return (
        <div style={{ padding: 20 }}>
            <Grid container spacing={1}>

                <Grid item xs={12} sm={4}>
                    <PricingItem
                        name="Base"
                        price="$19"
                        link="#"
                        items={["Gestisci i clienti",
                            "Fino a 5 reminder al giorno",
                            "Contatti via email - SMS"]}
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <PricingItem
                        name="Ultimate"
                        price="$49"
                        link="#"
                        items={["Gestisci i clienti",
                            "Fino a 5 reminder al giorno",
                            "Campi personalizzati per i clienti",
                            "Contatti via email - SMS - Instagram - Whatsapp - Facebook",
                            "Personalizzazione",
                            "Supporto telefonico 24/7"
                        ]}
                        bestChoice={true}

                    />
                </Grid>
                <Grid item xs={12} sm={4}>

                    <PricingItem
                        name="Premium"
                        price="$39"
                        link="#"
                        items={["Gestisci i clienti",
                            "Fino a 5 reminder al giorno",
                            "Campi personalizzati per i clienti",
                            "Contatti via email - SMS - Whatsapp ",
                            "Supporto via email"
                        ]}
                    />

                </Grid>
            </Grid>

        </div>
    )
}

export default Pricing