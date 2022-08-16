import React from "react";

import sassy from "./ProteinAbundance.module.scss";

function minMaxAbundance(data) {
    const abundanceList = data.map(_data => {
        return _data.protein_abundance;
    });
    return [Math.min(...abundanceList), Math.max(...abundanceList)];
}

function calcPercentage(minMax, value){
    const totalDiff = minMax[1] - minMax[0];
    const subDiff = minMax[1] - value;
    return (Math.round(((totalDiff-subDiff)/totalDiff)*100));
}

const Row = props => {
    const { hour, abundance, minMax } = props

    const barStyle = {
        width: `${calcPercentage(minMax, abundance)}%`,
    }

    return (
        <>
            <div className={sassy["abundance-item"]}>{hour} hr</div>
            <div className={sassy["abundance-item"]}>
                <div className={sassy["abundance-bar"]} style={barStyle}></div>
            </div>
            <div className={sassy["abundance-item"]}>
                {abundance.toLocaleString('en-GB')}
            </div>
        </>
    );
}

const ProteinAbundance = (props) => {
    const minMax = minMaxAbundance(props.data)

    const rowJSX = props.data.map(_data => {
        return <Row hour={_data.hour} abundance={_data.protein_abundance} minMax={minMax} />
    })

    return (
        <div className={sassy["abundance-container"]}>
            {rowJSX}
        </div>
    );
};

export default ProteinAbundance;