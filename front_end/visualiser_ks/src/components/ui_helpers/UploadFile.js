import React from "react";

const UploadFile = (props) => {

    const onFileUpload = (event) => {
        props.setValue(event.target.value)
    }

    return(
        <input type="file" id="fileUpload" name="fileUpload" accept=".csv" value={props.value} onChange={onFileUpload}/>
    )
};

export default UploadFile;