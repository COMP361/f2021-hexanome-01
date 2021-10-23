import './MainMenu.scss';
import Scene from './Scene';
import Modal from './Modal';
import logo from '../../assets/img/elfenroads.png'

export default function MainMenu({setGame}) {
    return(
        <div className="main-menu">
            <Scene />
            <div className="main-menu__content">
                <img className="main-menu__logo" src={logo} alt="Elfenroads" height="80" />
                <Modal setGame={setGame} />
            </div>
        </div>
    );
}