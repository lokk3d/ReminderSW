import React, { useState, useEffect } from "react";
import WrapperBox from "../WrapperBox"
import Template from "./Template";


function WrappedTemplate(props) {

    
    return (
        <WrapperBox header="I miei template"  >
            <Template />
        </WrapperBox >
    )
}

export default WrappedTemplate