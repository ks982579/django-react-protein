import React, {useReducer} from "react";
import Card from "../../ui_helpers/Card";
import ProteinForm from "./from_components/ProteinForm";
import ProteinCombo from "./ProteinCombo";

let initReducerValue = {
    details: [],
    abundance: [],
}
const ACTIONS = {
    DETAILS: "DETAILS",
    ABUNDANCE: "ABUNDANCE",
    BOTH: "BOTH",
    CLEAR: "CLEAR",
}

const reducerDispatch = (prevState, payload) => {
    // payload = {action, data}
    if(payload.action == ACTIONS.DETAILS){
        return({
            details: payload.data,
            abundance: prevState.abundance,
        });
    } else if(payload.action == ACTIONS.ABUNDANCE){
        return({
            details: prevState.details,
            abundance: payload.data,
        });
    } else if(payload.action == ACTIONS.BOTH){
        return({
            details: payload.data.details,
            abundance: payload.data.abundance,
        });
    } else if(payload.action == ACTIONS.CLEAR){
        return initReducerValue;
    }
}

const ProteinDashboard = () => {
    const [data, dispatch] = useReducer(reducerDispatch, initReducerValue);

    const fullUpdate = (proteinDetails, proteinAbundance) => {
        let payload = {
            action: ACTIONS.BOTH,
            data: {
                details: proteinDetails,
                abundance: proteinAbundance,
            }
        }
        dispatch(payload);
    }
    const clearData = () => {
        dispatch({action: ACTIONS.CLEAR})
    }

    let displayJSX = []
    for (let _i = 0; _i < data.details.length; _i++){
        displayJSX.push(<ProteinCombo key={data.details.id} details={data.details[_i]} abundance={data.abundance[_i]}/>)
    }

    if (displayJSX.length < 1){
        displayJSX = (
            <Card>
                <b>No Data</b>
                <p>
                    &#x1f9ea; Please provide a valid Protein ID in the form above &#x1f9ec;
                </p>
            </Card>
        )
    }

    return (
        <section>
            <aside>
                <ProteinForm onUpdate={fullUpdate} onClear={clearData}/>
            </aside>
            <article>
                {displayJSX}
            </article>
        </section>
    )
};

export default ProteinDashboard;