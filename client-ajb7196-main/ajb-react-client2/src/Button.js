import "./styles.css";
import { useState } from "react";

export default function Button({type, time, necessary, startstyle, buttontext}) {
    const [text, setText] = useState(buttontext);
    const [style, setStyle] = useState(startstyle);

    function handleClick() {
        if (type === 'notifyTimer' ){
            notifyTimer();
        }
        else if (type === 'add5Minutes'){
            addFiveMinutes();
        }
        else if (type === 'subtract5Minutes'){
            if (time >= 300){
                subtractFiveMinutes();
            }
        }
        else if (type === 'editTimeTable'){
            editing();
            necessary();
        }
        else if (type === "editClient"){
            clientAdding();
            necessary();
        }
        else if (type === "FiveMore"){
            necessary();
        }
        else if (type === "FiveLess"){
            if (time > 300){
                necessary();
            }
        }
        else if (type === "viewClient"){
            necessary();
        }
    }

    function editing(){
        if (text === 'Edit'){
            setText('Save');
            setStyle('Save');
        }
        else{
            setText('Edit');
            setStyle('Edit');
        }
    }

    function clientAdding(){
        if (text === 'Edit'){
            setText('Add');
            setStyle('Add');
        }
        else{
            setText('Edit');
            setStyle('Edit');
        }
    }

    function notifyTimer(){
        if (text === "Start"){
            setText("Started");
            setStyle("timerstarted");
            necessary();

        }
        else{
            setText("Start");
            setStyle("timer");
            necessary();
        }
    }

    function addFiveMinutes(){
        necessary(time + 300);
    }

    function subtractFiveMinutes(){
        necessary(time - 300);
    }

    return (
        <div id="button" class={style} onClick={handleClick}>
            {text}
        </div>
    );
}