import './Wait.scss';

export default function Wait({game, setGame}) {
    return(
        <div className="wait">
            <button onClick={() => setGame(true)}>Start</button>
        </div>
    )
}