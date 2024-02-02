import { useContext } from 'react';
import Button from './UI/Button';
import { LOGO_IMAGE } from '../constants/AssetConstants';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';

const Header = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalQuantity = cartCtx.items.reduce((total, item) => total + item.quantity, 0);

    const handleClick = () => {
        userProgressCtx.showCart();
    };

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={LOGO_IMAGE} alt='A restaurant' />
                <h1>Yummy Meals</h1>
            </div>
            <nav>
                <Button onClick={handleClick}>Cart ({totalQuantity})</Button>
            </nav>
        </header>
    );
};

export default Header;