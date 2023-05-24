import "./styles.css";

export default function Timer(props){

    let display = props.calculateTime(props.time);

    return (
        <>
            <h1 class="timerDisplay">
                {display}
            </h1>
        </>
    );
}