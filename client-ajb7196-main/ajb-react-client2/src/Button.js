import "./styles.css";
import { useState } from "react";

export default function Button(props) {
    const [text, setText] = useState(props.buttontext);
    const [style, setStyle] = useState(props.startstyle);

    function handleClick() {
        if (props.type === 'notifyTimer' ){
            notifyTimer();
        }
        else if (props.type === 'add5Minutes'){
            addFiveMinutes();
        }
        else if (props.type === 'subtract5Minutes'){
            if (props.time >= 300){
                subtractFiveMinutes();
            }
        }
        else if (props.type === 'editTimeTable'){
            editing();
            props.necessary();
        }
        else if (props.type === "editClient"){
            clientAdding();
            props.necessary();
        }
        else if (props.type === "FiveMore"){
            props.necessary();
        }
        else if (props.type === "FiveLess"){
            if (props.time > 300){
                props.necessary();
            }
        }
        else if (props.type === "viewClient"){
            props.necessary();
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
            props.necessary();

        }
        else{
            setText("Start");
            setStyle("timer");
            props.necessary();
        }
    }

    function addFiveMinutes(){
        props.necessary(props.time + 300);
    }

    function subtractFiveMinutes(){
        props.necessary(props.time - 300);
    }

    return (
        <div id="button" class={style} onClick={handleClick}>
            {text}
        </div>
    );
}