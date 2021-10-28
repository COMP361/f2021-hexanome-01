import './Welcome.scss';

export default function Welcome({username, join, create}) {
  return (
      <section className = 'welcome'><h1 className = 'welcome__title'>Welcome,
      <span className = 'welcome__user'>{username}</span>
            </h1>
      <button className = 'welcome__button'>Join Game</button>
            <button className="welcome__button" onClick={create}>Create Game</button>
      <button className = 'welcome__button'>Load Game</button>
        </section>);
}
