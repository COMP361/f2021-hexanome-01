import './Login.scss';

export default function Login({next, setGame}) {
    
    return(
        <section className="login">
            <div className="login__panel">
                <h1 className="login__title">Login</h1>
                <form className="form" onSubmit={e => { next(e.target.username.value) }}>
                    <input className="form__input" name="username" id="username" placeholder="Username" autoComplete="off" />
                    <input className="form__input" name="password" id="password" type="password" placeholder="Password" />
                    <button className="form__button">Login</button>
                </form>
            </div>
            <div className="login__panel">
                <h1 className="login__title">Sign Up</h1>
                <form className="form">
                    <input className="form__input" name="username" id="username" placeholder="Username" autoComplete="off" />
                    <input className="form__input" name="password" id="password" type="password" placeholder="Password" />
                    <input className="form__input" name="confirmpassword" id="confirmpassword" type="password" placeholder="Confirm Password" />
                    <button className="form__button" onClick={() => setGame(true)}>Sign Up</button>
                </form>
            </div>
        </section>
    )
}