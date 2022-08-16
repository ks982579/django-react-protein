import React from "react";

import Card from "../../ui_helpers/Card";

import ProteinDetails from "./protein_details/ProteinDetails";
import ProteinAbundance from "./protein_abundance/ProteinAbundance";

import sassy from "./ProteinCombo.module.scss";

const ProteinCombo = props => {
    return (
        <Card className={sassy["protein-container"]}>
            <ProteinDetails data={props.details} />
            <ProteinAbundance data={props.abundance}/> 
        </Card>
    );
};

export default ProteinCombo;