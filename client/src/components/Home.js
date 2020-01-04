import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DateRangeIcon from '@material-ui/icons/DateRange';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #093969 30%, #061b3a 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    display:"flex", 
    flexDirection:"column",
    padding: 20,
    margin: 0,
    alignItems:"center",
    justifyContent: "center"
  },
  col:{
    display:"flex", 
    flexDirection:"column",
    alignItems:"center",
    justifyContent: "center",
    padding:20
  }
});


function Home() {
  const classes = useStyles();

  return (
    <div >
     
        <h1 className={classes.root}>Benvenuto! </h1>
        <br/>
        <div className={classes.col} >
          <h3>Cosa puoi fare con questa piattaforma? </h3>

          <List component="nav" aria-label="main mailbox folders">
          <ListItem button>
            <ListItemIcon>
              <GroupAddIcon />
            </ListItemIcon>
            <ListItemText primary="Salvare i tuoi clienti e i relativi contatti" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <ImportExportIcon />
            </ListItemIcon>
            <ListItemText primary="Aggiungere incontri con i clienti" />
          </ListItem>
          <Divider />
          <ListItem button>
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <ListItemText primary="Creare reminder per i clienti" 
              secondary="Verranno inviati automaticamente dopo il tempo prestabilito sui contatti scelti" />
          </ListItem>
          
        </List>

        <Button variant="contained" color="primary" 
        style={{padding: 10, width:300, marginTop:20}}
        onClick={()=>{window.location ="/singup"}}>crea un account</Button>

        <ExpansionPanel style={{marginTop:50, maxWidth: 500, marginBottom: 50}}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>How it works?</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
        
      </div>
    </div>
  );
}

export default Home;
