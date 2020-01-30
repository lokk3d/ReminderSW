import React, { useState, useEffect } from "react";
import WrapperBox from "../WrapperBox";
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MessageList from "./MessageList"
import axios from "axios";
import Cookies from 'universal-cookie';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    row: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    col: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "col"
    }

}));


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}


function Messages(props) {
    const theme = useTheme();

    const cookies = new Cookies();
    const token = cookies.get('dateReminder-AuthToken')

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const [messages, setMessages] = React.useState([]);
    //se un messaggio che deve essere inviato a 3 contatti è stato inviato a 2 e a uno non è stato possibile inviarlo, va ugualmente in error
    const [pendingMessages, setPendingMessages] = React.useState([]);
    const [errorMessages, setErrorMessages] = React.useState([]);
    const [sentMessages, setSentMessages] = React.useState([]);


    useEffect(()=>{
        axios.get('/api/message',
        { headers: { authorization: "Bearer " + token } })
          .then((res) => {
              console.log(res.data);
            setMessages(res.data)
          })
          .catch((err) => {
            console.log(err)
          })
    },[])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = index => {
        setValue(index);
    };


    return (
        <div className={classes.col}>
            <div style={{ maxWidth: 800, width: "100%" }}>
                <h2 style={{textAlign:"center"}}>I miei messaggi</h2>
                <AppBar position="static" color="default">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Tutti" {...a11yProps(0)}  style={{color:"blue"}}/>
                        <Tab label="Inviati" {...a11yProps(1)} style={{color:"green"}}/>
                        <Tab label="Errore" {...a11yProps(2)} style={{color:"red"}}/>
                        <Tab label="Pending" {...a11yProps(2)} style={{}}/>

                    </Tabs>
                </AppBar>
                <div style={{backgroundColor:"#fafafa"}}>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        {
                            (messages.length === 0)?
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <AddCircleOutlineIcon style={{ margin: 10 }} />
                                <p>Non hai messaggi</p>
                            </div>:
                            <MessageList messages={messages}/>
                        }
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                    {
                            (messages.length === 0)?
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <AddCircleOutlineIcon style={{ margin: 10 }} />
                                <p>Non hai messaggi inviati</p>
                            </div>:
                            <MessageList messages={messages}/>
                        }
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                    {
                            (messages.length === 0)?
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <AddCircleOutlineIcon style={{ margin: 10 }} />
                                <p>Non hai messaggi non inviati</p>
                            </div>:
                            <MessageList messages={messages}/>
                        }
                    </TabPanel>
                    <TabPanel value={value} index={3} dir={theme.direction}>
                    {
                            (messages.length === 0)?
                            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                <AddCircleOutlineIcon style={{ margin: 10 }} />
                                <p>Non hai messaggi in attesa</p>
                            </div>:
                            <MessageList messages={messages}/>
                        }
                    </TabPanel>
                </div>
            </div>
        </div>

    )
}

export default Messages