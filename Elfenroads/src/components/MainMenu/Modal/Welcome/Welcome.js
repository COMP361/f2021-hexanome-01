import './Welcome.scss';

export default function Welcome({user, join, create}) {
      console.log(user);
  return (
      <section className = 'welcome'>
      <h1 className = 'welcome__title'>Welcome,
            <span className = 'welcome__user'> {user.lsUser.name}</span>
      </h1>
      <button className = 'welcome__button'>Join Game</button>
            <button className="welcome__button" onClick={create}>Create Game</button>
      <button className = 'welcome__button'>Load Game</button>
        </section>);
}
