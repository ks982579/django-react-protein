import React, {useState} from "react";
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file
// https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications

// Import Components
import Card from "../../ui_helpers/Card";

// Import Sassy CSS
import sassy from './Ingestion.module.scss';

// Import Helpers
import APIActions from "../../../actions/actions";
import UploadFile from "../../ui_helpers/UploadFile";

const Ingestion = () => {
    const [fileValue, setFileValue] = useState("");

    const clearFileInput = () => {
        setFileValue(""); 
    };

    const submitHandler = (event) => {
        event.preventDefault();
        
        // Send data to backend
        APIActions.sendFile(event.target);
        
        // Clear Input on Success
        clearFileInput();
    };
    
    return (
        <section className={sassy["ingestion-container"]}>
            <Card className={sassy["card-class"]}>
                <form onSubmit={submitHandler}>
                    <UploadFile value={fileValue} setValue={setFileValue}/>
                    <input type="submit" value="Upload" />
                    <input type="reset" value="Clear" /> 
                </form>
            </Card>
        </section>
    );
};

export default Ingestion;
// X --> <Dashboard/>