import React, { useState } from 'react'; 

function EditableInput(props){

    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(props.text)
    const textInput = React.createRef();


    function setOnFocus(){
        setEdit(true)
    }

    function onEdit(e){
        setEdit(false)
        if(text ==="") setText("Untitled task...")
        props.onEdit(text)
    }

    function handleKeyPress(event){
        if(event.key === 'Enter'){
            onEdit(event)
        }
      }

    return(
        <div className="editableInput" itemID={props.id}>
            {
                edit ?  <input className={props.className + "_inp"} 
                placeholder={props.placeholder} autoFocus  
                type="text" value={text} 
                onChange={ e=>setText(e.target.value) } 
                onBlur={ onEdit }
                ref={textInput}
                onKeyPress={handleKeyPress}
                ></input> : 

                <p className={props.className} style={{margin:0}}onClick={ () =>{
                   setOnFocus()
                }}>{text}</p>
            }
        </div>
    );

}

export default EditableInput;