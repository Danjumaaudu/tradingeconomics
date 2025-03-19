import React from "react";
import CompareCountryGDP from "./components/Comparison";

const App : React.FC = () => {
    return (
        <div>
            <nav className="Nav-bar">
                <h1 className="T-E">TRADING <span className="econ">ECONOMICS</span></h1>
            <h2 className="comp">GROSS DOMESTIC PRODUCT INDICATOR COMPARISON</h2>
            </nav>
            <CompareCountryGDP />
        </div>
    )
}

export  default App;