import ReactDOM from "react-dom";
import React from 'react';
import { App } from './App'


console.log("packin")

const arr = [1,2,3,4]

const IAMJS6 = () => {
    console.log(...arr);
}

window.IAMJS6 = IAMJS6;

ReactDOM.render(<App />, document.getElementById("app"));
