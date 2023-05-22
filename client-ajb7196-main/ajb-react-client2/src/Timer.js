import "./styles.css";

export default function Timer({time, calculateTime}){

    let display = calculateTime(time);

    return (
        <>
            <h1 class="timerDisplay">
                {display}
            </h1>
        </>
    );
}