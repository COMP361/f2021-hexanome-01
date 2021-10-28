import './Create.scss';

export default function Create({wait}) {
    const handleFormSubmit = (e) => {
        e.preventDefault();
        wait({
            roomname: e.target.roomname.value,
            game: e.target.game.value || 'elfenland',
        });
    };

    return (
        <section className="create">
            <h1 className="create__title">Create Game</h1>
            <form className="form" onSubmit={handleFormSubmit}>
                <input className="form__input form__input--create" name="roomname" id="roomname" placeholder="Room Name" autoComplete="off" />
                <div className="form__group">
                    <div className="form__input form__input--radio">
                        <input type="radio" id="Elfenland" name="game" value="elfenland" checked />
                        <label htmlFor="Elfenland">Elfenland</label>
                    </div>

                    <div className="form__input form__input--radio">
                        <input type="radio" id="Elfengold" name="game" value="elfengold" />
                        <label htmlFor="Elfengold">Elfengold</label>
                    </div>
                </div>
                <button className="form__button form__button--create">Create</button>
            </form>
        </section>
    );
}
