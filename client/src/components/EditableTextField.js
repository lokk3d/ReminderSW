import React, { useState, useEffect, createRef } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Edit from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({

  container: {
    display: "flex",
    flexWrap: "no-wrap",
  },
  textField: {
    maxWidth: 300,
    color: "black",
    fontSize: 30,
    opacity: 1,
    borderBottom: 0,
    "&:before": {
      borderBottom: 0
    },
    marginTop: 5
  }
}));



function EditableTextField(props) {

  const [value, setValue] = useState(props.value || "")
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    if (typeof props.onChange !== "undefined") {
      props.onChange(value)
    }
  }, [value])

  const handleClick = () => {
    setEditMode(true)
  };
  const classes = useStyles();


  return (
    <div className={classes.container}>


      <TextField
        name="email"
        placeholder={props.placeholder || ""}

        defaultValue={value}
        margin="normal"
        onChange={(e) => {
          setValue(e.target.value)
        }}
        InputProps={{
          readOnly: !editMode,
        }}
        className={classes.textField}
        onBlur={() => setEditMode(false)}
      />
      <IconButton onClick={handleClick} style={{paddingBottom:5, paddingTop:5}}>
        <Edit />
      </IconButton>
    </div>
  );

}

export default EditableTextField;
