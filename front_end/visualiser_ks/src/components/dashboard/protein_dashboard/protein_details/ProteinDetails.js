import React from "react";

import sassy from "./ProteinDetails.module.scss";

const ProteinDetails = (props) => {
    const {
        average_mass: averageMass,
        accession,
        cellular_processes: cellularProcesses,
        description,
        protein_functions: proteinFunctions,
        protein_id: proteinID,
        reactome_pathways: reactomePathways,
        upload_date: uploadDate,
    } = props.data

    const newUploadDate = new Date(uploadDate);
    return(
        <div className={sassy["grid-container"]}>
            <div className={sassy['grid-item']}>Protein ID</div>
            <div className={sassy['grid-item']}>{proteinID}</div>
            <div className={sassy['grid-item']}>Upload Date</div>
            <div className={sassy['grid-item']}>{newUploadDate.toLocaleString('en-GB')}</div>
            <div className={sassy['grid-item']}>Accession</div>
            <div className={sassy['grid-item']}>{accession}</div>
            <div className={sassy['grid-item']}>Description</div>
            <div className={sassy['grid-item']}>{description}</div>
            <div className={sassy['grid-item']}>Cellular Processes</div>
            <div className={sassy['grid-item']}>{cellularProcesses}</div>
            <div className={sassy['grid-item']}>Protein Functions</div>
            <div className={sassy['grid-item']}>{proteinFunctions}</div>
            <div className={sassy['grid-item']}>Reactome Pathways</div>
            <div className={sassy['grid-item']}>{reactomePathways}</div>
        </div>
    );
};

export default ProteinDetails;