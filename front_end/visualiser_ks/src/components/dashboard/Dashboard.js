import React from "react";

// Import Components
import Ingestion from "./ingestion/Ingestion";

// Import Sassy CSS
import sassy from "./Dashboard.module.scss";
import ProteinDashboard from "./protein_dashboard/ProteinDashboard";
import Card from "../ui_helpers/Card";

const Welcome = () => {
    return (
        <Card className={sassy["welcome-container"]}>
            <article>
                <h2>
                    Data Ingestion and Viewer
                </h2>
                <h3>
                    Instructions:
                </h3>
                <p>
                    Click on the "Upload File" link in the navbar to begin uploading a csv file.
                    You can drag-and-drop a file into the browser or click on the "Choose File" button to select a file from your computer.
                    Then, click "Upload"!
                </p>
                <p>
                    Once data has been uploaded, click on the "View Data" link in the navbar.
                    Then, select a protien ID and click "Submit".
                    If the ID exists in the database, the form will provide you with the information available.
                </p>
            </article>
        </Card>
    )
}

const Dashboard = (props) => {
    const {upload, view} = props.settings;

    return (
        <main className={sassy["dash-container"]}>
            {upload && <Ingestion />}
            {view && <ProteinDashboard />}
            {!upload && !view && <Welcome />}
        </main>
    );
};

export default Dashboard;
// X --> <App/>