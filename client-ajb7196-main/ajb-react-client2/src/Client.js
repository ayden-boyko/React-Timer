import "./styles.css";
import Button from "./Button";
import { useState } from "react";

export default function Client({client, necessary, necessary2, view, setClients, clients, clientnum, endtime, calculateTime, setClientNum}) {
    const [editing, setEditing] = useState(false);
    const [newclient, setNewClient] = useState({
        clientnum: clientnum,
        clientname: client,
        totalHours: calculateTime(endtime)
    });
    const [client_starting_name, setClientStartingName] = useState(client);
    const [added, setAdded] = useState(false);
    const [letters, setLetters] = useState("");

    function handleInputChange(event){
        setLetters(letters.concat(event));
        setAdded(true);
    }

    function viewClients(){
        necessary2(!view);
    }

    function editClient(){
        setEditing(!editing);
        if (!editing){
            setClientStartingName(client);
            necessary(<input type="text" id="newclient" onChange={e => handleInputChange(e.target.value)}/>);
        }
        else{
            if (added === true && letters.length > 0){
                setClientNum(clientnum => clientnum + 1);
                setNewClient(
                     {clientnum: clientnum,
                        clientname: letters,
                     totalHours: calculateTime(endtime)
                });
                setLetters("");
                setAdded(true);
                necessary(letters);
                setClients(clients => [...clients, newclient]);
                setClientStartingName(newclient.clientname);
            }
            else{
                necessary(client_starting_name);
            }
        }
    }

    return (
        <div>
            <div id="datagroup">
                <Button startstyle={"Edit"} type={"editClient"} necessary={editClient} buttontext={"Edit"}></Button>
                {added === true? <Button startstyle={"View"} type={"viewClient"} necessary={viewClients} buttontext={"View"}></Button> : null}
            </div>
            <h1>{client}</h1>
        </div>
        
    );
}