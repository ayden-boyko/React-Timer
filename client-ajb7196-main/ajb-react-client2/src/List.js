import { useState } from "react";
import "./styles.css";
import Button from "./Button";
//{props.isRunning, props.currentclient, props.endTime, startTime, calculateTime}

export default function List(props) {
    const [done, setDone] = useState(1);
    const [tableData, setTableData] = useState([])
    const [index, setIndex] = useState(0);
    const [newRow, setNewRow] = useState({
        index: index,
        client: props.currentclient,
        project: props.currentclient,
        startTime: props.calculateTime(props.startTime),
        stopTime: props.calculateTime(props.endTime),
        timeElapsed: props.endTime - props.startTime
    });
    const [entryLimit, setEntryLimit] = useState(5);
    const [editList, setEditList] = useState(false);
  
    function addRow() {
        props.setTotalTime(props.totaltime + (props.endTime - props.startTime));
        setDone(1);
        const newRow = {
          index: index,
          client: props.currentclient,
          project: props.currentclient,
          startTime: props.calculateTime(props.startTime),
          stopTime: props.calculateTime(props.endTime),
          timeElapsed: props.endTime - props.startTime
        };
        setTableData([newRow, ...tableData]);
        setNewRow({
          index: index + 1,
          client: props.currentclient,
          project: props.currentclient,
          startTime: props.calculateTime(props.startTime),
          stopTime: props.calculateTime(props.endTime),
          timeElapsed: props.endTime - props.startTime
        });
        setIndex((index) => index + 1);
        if (index <= 5){}
    }

    function editData(){
        setEditList(!editList);
        
    }

    function viewFiveMore(){
        setEntryLimit(entryLimit+5)
    }

    function viewFiveLess(){
        setEntryLimit(entryLimit-5)
    }

    if (props.isRunning === 0 && done === 0){
        addRow();
    }
    if (props.isRunning === 1 && done === 1){
        setDone(0);
    }

    function handleClientInputChange(event, index){
        const data = tableData;
        data[index].client = event;
    }
    function handleProjectInputChange(event, index){
        const data = tableData;
        data[index].project = event;
    }
    function handleStartInputChange(event, index){
        const data = tableData;
        data[index].startTime = props.calculateTime(event);
    }
    function handleStopInputChange(event, index){
        const data = tableData;
        data[index].stopTime = props.calculateTime(event);
    }
    function handleTimeInputChange(event, index){
        const data = tableData;
        data[index].timeElapsed = event;
    }

    if (editList){
        //setTableData()
    }

    return (
        <div class = "entries">
            <p id="HeaderTable">Entries</p>
            <div id="datagroup">
                <Button startstyle={"Edit"} type={"editTimeTable"} necessary={editData} buttontext={"Edit"}></Button>
                {index < 5 ? null : <Button startstyle={"Edit"} type={"FiveMore"} necessary={viewFiveMore} buttontext={"Show More"}></Button>}
                {index < 5 ? null : <Button startstyle={"Edit"} type={"FiveLess"} necessary={viewFiveLess} buttontext={"Show Less"}></Button>}
            </div>
            <table id = "data">
                <thead>
                    <tr>
                        <th>Client</th>
                        <th>Project</th>
                        <th>Start Time</th>
                        <th>Stop Time</th>
                        <th>Time Elapsed</th>
                    </tr>
                </thead>
                <tbody> 
                    {tableData.filter(row => row.index < entryLimit).map((row) => (
                        <tr key={row.index}>
                            <td>{!editList ? (row.client) : (<input
                                type="text"
                                onChange={event => handleClientInputChange(event.target.value, row.index)}
                                />)}</td>
                            <td>{!editList ? (row.project) : (<input
                                type="text"
                                onChange={event => handleProjectInputChange(event.target.value, row.index)}
                                />)}</td>
                            <td>{!editList ? (row.startTime) : (<input
                                type="text"
                                onChange={event => handleStartInputChange(event.target.value, row.index)}
                                />)}</td>
                            <td>{!editList ? (row.stopTime) : (<input
                                type="text"
                                onChange={event => handleStopInputChange(event.target.value, row.index)}
                                />)}</td>
                            <td>{!editList ? (row.timeElapsed) : (<input
                                type="text"
                                onChange={event => handleTimeInputChange(event.target.value, row.index)}
                                />)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}