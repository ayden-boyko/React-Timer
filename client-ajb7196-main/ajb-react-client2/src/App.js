import Client from "./Client";
import Timer from "./Timer";
import Button from "./Button";
import List from "./List";
import { useRef, useState } from "react";

export default function App() {
    const [isRunning, setisRunning] = useState(0);
    const [time, setTime] = useState(0)
    let id = useRef(null);
    const [clientnum, setClientNum] = useState(0);
    const [startTime, setStartTime] = useState(time)
    const [endtime, setEndTime] = useState(time)
    const [client, setClient] = useState("John Doe Inc.");
    const [view, setView] = useState(false)
    const [clients, setClients] = useState([]);

    function calculateTime(elapsed){
        let [sec,min,hr] = [0,0,0];
        sec = Math.floor((elapsed % 60)).toString().padStart(2, "0");
        min = Math.floor((elapsed / 60)).toString().padStart(2, "0");
        hr = Math.floor(((elapsed / 60) / 60)).toString().padStart(2, "0");
        let finaltime = (hr + ":" + min + ":" + sec);
        return finaltime;
    }

    function handleClick() {
        if (isRunning === 1){
            clearInterval(id.current);
            setEndTime(time);
            setisRunning(0);
            setTime(0)
        }
        else{
            setStartTime(time);
            id.current = setInterval(() => {
                setTime((time) => time + 1);
            }, 1000);
            setisRunning(1);
        }
    }

    if (!view){
        return (
            <>
                <Client client={client} necessary={setClient} necessary2={setView} view={view} setClients={setClients} clients={clients} clientNum={clientnum} endtime={time} calculateTime={calculateTime} setClientNum={setClientNum}/>
                <Timer time={time} calculateTime={calculateTime}/>
                <div id="group">
                    <Button startstyle={"plus"} type={"add5Minutes"} time={time} necessary={setTime} buttontext={"+5"}/>
                    <Button startstyle={"timer"} type={"notifyTimer"} time={time} necessary={handleClick} buttontext={"Start"}/>
                    <Button startstyle={"minus"} type={"subtract5Minutes"} time={time} necessary={setTime} buttontext={"-5"}/>
                </div>
                <List isRunning={isRunning} currentclient={client} endTime={endtime} startTime={startTime} calculateTime={calculateTime}/>
            </>
        );
    } else {
        return (
            <>
                <Client client={client} necessary={setClient} necessary2={setView} view={view} setClients={setClients} clients={clients} clientNum={clientnum} endtime={endtime} calculateTime={calculateTime} setClientNum={setClientNum}/>
                <table id = "data">
                    <tbody> 
                        {clients.map((client) => (
                            <tr key={client.clientnum} >
                                <td>{client.clientname}</td>
                                <td>{client.totalHours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <List isRunning={isRunning} currentclient={client} endTime={endtime} startTime={startTime} calculateTime={calculateTime}/>
            </>
        );
    }
}