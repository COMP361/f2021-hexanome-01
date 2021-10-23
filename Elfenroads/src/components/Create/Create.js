import './Create.scss';

export default function Create({wait}) {
    return(
        <section className="create">
            <h1 className="create__title">Create Game</h1>
            <form className="form" onSubmit={e => e.preventDefault()}>
                <input className="form__input form__input--create" name="roomname" id="roomname" placeholder="Room Name" autoComplete="off" />
                <div className="form__group">
                    <div className="form__input form__input--radio">
                        <input type="radio" id="Elfenland" name="game" value="elfenland" checked />
                        <label for="huey">Elfenland</label>
                    </div>

                    <div className="form__input form__input--radio">
                        <input type="radio" id="Elfengold" name="game" value="elfengold" />
                        <label for="dewey">Elfengold</label>
                    </div>
                </div>
                <button className="form__button form__button--create" onClick={e => { wait({}) }}>Create</button> 
            </form>
        </section>
    )
}