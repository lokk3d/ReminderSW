import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Paper, List, ListItem } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
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


function PricingItem(props){
    const classes = useStyles();

    const name = props.name || "Pack name"
    const price = props.price || "$29"
    const priceTime = "/month"
    const items = props.items || ["Funzione1", "Funzione2", "Funzione3"]
    const link = props.link || "#"

    const bestChoice = props.bestChoice || false
    
    return(
        <Paper className={classes.col} style={{maxWidth:250, margin:5}}>
            {
                (bestChoice) ? 
                <div className={classes.col} 
                style={{width:"100%", backgroundColor:"#E66B00", borderRadius:"5px", height:"40px"}}>
                    <h3 
                    style={{color:"white", textTransform:"uppercase", fontWeight:400, textAlign:"center", margin:0}}
                    >Best choice</h3>

                </div>
                :
                <div></div>
            }
            
            <h2 style={{marginBottom:0, fontWeight:500}}>{name}</h2>
            <hr style={{width:"70%"}}/>
            <div style={{fontSize:24}} className={classes.row}>
                {price}
                <div style={{fontSize:12, marginLeft:5}}>{priceTime}</div>
            </div>
            <List>{
                items.map(item=> {
                    return (
                    <ListItem style={{paddingTop:0}}>
                        <CheckIcon
                        fontSize="small" />
                        <div className={classes.row}
                        style={{marginLeft:10, fontSize:14}}
                        >
                            {item}  
                        </div>
                    </ListItem>
                    )
                })
                }</List>
            <Button color="primary" variant="contained"
            style={{marginBottom:20}}>Buy Now</Button>
          


        </Paper>
    )

}

export default PricingItem