import React, { useReducer } from 'react';

// Import components
import Navbar from './components/navbar/Navbar';
import Dashboard from './components/dashboard/Dashboard';
import Footer from './components/footer/Footer';


// Import Sassy CSS
import sassy from './App.module.scss';

const initValues = {
    upload: false,
    view: false,
}
const ACTIONS = {
    VIEW: "VIEW",
    UPLOAD: "UPLOAD",
    NEITHER: "NEITHER",
}

const reducerFunction = (prevState, payload) => {
    if (payload.action == ACTIONS.VIEW) {
        return {
            upload: false,
            view: true,
        }
    } else if (payload.action == ACTIONS.UPLOAD) {
        return {
            upload: true,
            view: false,
        }
    } else {
        return initValues;
    }
}

const App = () => {
    const [settings, setterDispatch] = useReducer(reducerFunction, initValues)

    const onUploadClick = () => {
        setterDispatch({action: ACTIONS.UPLOAD});
    }
    const onViewClick = () => {
        setterDispatch({action: ACTIONS.VIEW});
    }
    const onNeitherClick = () => {
        setterDispatch({action: ACTIONS.NEITHER});
    }

    return (
        <div className={sassy["webpage-container"]}>
            <Navbar onUploadClick={onUploadClick} onViewClick={onViewClick} onNeitherClick={onNeitherClick}/>
            <Dashboard settings={settings}/>
            <Footer />
        </div>
    );
}

export default App;
// X --> index.js