import React from "react";
import Card from "../../../ui_helpers/Card";

import APIActions from "../../../../actions/actions";

import sassy from "./ProteinForm.module.scss";

const ProteinForm = (props) => {
    const { onUpdate, onClear } = props

    const submitHandler = async (event) => {
        event.preventDefault();
        // Calling GET protein details
        const jsonRespDetails = await APIActions.getProteinDetails(event.target);
        if (jsonRespDetails.status !== 404) {
            // Calling GET protein abundance
            const jsonRespAbundance = await APIActions.getProteinAbundance(event.target);
            // Update reducer
            onUpdate(jsonRespDetails, jsonRespAbundance);
        } else {
            onClear();
        }
    }

    return (
        <Card className={sassy["form-container"]}>
            <form onSubmit={submitHandler} className={sassy['protein-form']}>
                <div>
                    <label htmlFor="proteinID">Protien ID: </label>
                    <input id="proteinID" type="number" name="proteinID" placeholder="Protein ID..." />
                </div>
                <div className={sassy['buttons']}>
                    <input type="submit" value="Submit" />
                    <input type="reset" value="Clear" />
                </div>
            </form>
        </Card>
    );
};

export default ProteinForm;