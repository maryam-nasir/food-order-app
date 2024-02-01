import Button from './UI/Button';
import { LOGO_IMAGE } from '../constants/AssetConstants';

const Header = () => {
    return (
        <header id='main-header'>
            <div id='title'>
                <img src={LOGO_IMAGE} alt='A restaurant' />
                <h1>Yummy Meals</h1>
            </div>
            <nav>
                <Button>Cart (0)</Button>
            </nav>
        </header>
    );
};

export default Header;