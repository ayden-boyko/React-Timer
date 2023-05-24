import "./styles.css";
import Button from "./Button";
import { useState } from "react";

export default function Client(props) {
    const [clientnum, setClientnum] = useState(0);
    const [editing, setEditing] = useState(false);
    const [newclient, setNewClient] = useState({
        clientnum: clientnum,
        clientname: props.client,
        totalHours: 0
    });
    const [client_starting_name, setClientStartingName] = useState(props.client);
    const [added, setAdded] = useState(false);
    const [letters, setLetters] = useState("");

    function handleInputChange(event){
        setLetters(letters.concat(event));
        setAdded(true);
    }

    function viewClients(){
        props.necessary2(!props.view);
    }

    function editClient(){
        setEditing(!editing);
        if (!editing){
            setClientStartingName(props.client);
            props.necessary(<input type="text" id="newclient" onChange={e => handleInputChange(e.target.value)}/>);
        }
        else{
            if (added === true && letters.length > 0){
                props.setTotalTime(0);
                setClientnum(clientnum + 1);
                newclient.totalHours = props.calculateTime(props.totaltime);
                props.setClients([...props.clients, newclient]);
                setNewClient(
                     {clientnum: clientnum,
                     clientname: letters,
                     totalHours: props.calculateTime(props.totaltime)
                });
                setLetters("");
                setAdded(true);
                props.necessary(letters);
                setClientStartingName(newclient.clientname);
            }
            else{
                props.necessary(client_starting_name);
            }
        }
    }

    return (
        <div>
            <div id="datagroup">
                <Button startstyle={"Edit"} type={"editClient"} necessary={editClient} buttontext={"Edit"}></Button>
                {added === true? <Button startstyle={"View"} type={"viewClient"} necessary={viewClients} buttontext={"View"}></Button> : null}
            </div>
            <h1>{props.client}</h1>
        </div>
        
    );
}