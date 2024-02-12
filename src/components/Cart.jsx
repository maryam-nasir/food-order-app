import { useContext } from 'react';
import CartItem from './CartItem';
import Modal from './UI/Modal';
import Button from './UI/Button';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { currencyFormatter } from '../utils/formatting';

const Cart = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);

    const handleClose = () => {
        userProgressCtx.hideCart();
    };

    const handleGoToCheckout = () => {
        userProgressCtx.showCheckout();
    };

    return (
        <Modal open={userProgressCtx.progress === 'cart'} className='cart' onClose={userProgressCtx.progress === 'cart' ? handleClose : null}>
            <h2>Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => <CartItem
                    key={item.id}
                    name={item.name}
                    quantity={item.quantity}
                    price={item.price}
                    onIncrease={() => cartCtx.addItem(item)}
                    onDecrease={() => cartCtx.removeItem(item.id)}
                />)}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={handleClose}>Close</Button>
                {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to Checkout</Button>}
            </p>
        </Modal>
    );
};

export default Cart;