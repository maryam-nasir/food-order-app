import { useContext } from 'react';
import Button from './UI/Button';
import Input from './UI/Input';
import Modal from './UI/Modal';
import Error from './Error';
import API_CONSTANTS from '../constants/ApiConstants';
import CartContext from '../store/CartContext';
import UserProgressContext from '../store/UserProgressContext';
import { currencyFormatter } from '../utils/formatting';
import useHttp from '../hooks/useHttp';

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);
    const { loading, data, error, sendHttpRequest, clearData } = useHttp(`${API_CONSTANTS.BASE_API_URL}${API_CONSTANTS.ORDER}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }, null);

    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0);

    const handleClose = () => {
        userProgressCtx.hideCheckout();
    };

    const handleFinish = () => {
        userProgressCtx.hideCheckout();
        cartCtx.clearCart();
        clearData();
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const customerData = Object.fromEntries(formData.entries());

        sendHttpRequest({
            body: JSON.stringify({
                order: {
                    items: cartCtx.items,
                    customer: customerData
                },
            })
        });
    };

    if (data && !error) {
        return (<Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <p className='modal-actions'>
                <Button onClick={handleFinish}>Okay</Button>
            </p>
        </Modal>);
    }

    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleClose}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

                <Input id='name' label='Full Name' type='text' />
                <Input id='email' label='Email Address' type='email' />
                <Input id='street' label='Street' type='text' />

                <div className='control-row'>
                    <Input id='postal-code' label='Postal Code' type='text' />
                    <Input id='city' label='City' type='text' />
                </div>

                {error && <Error title="Failed to submit order" message={error.message} />}
                <p className='modal-actions'>
                    {loading ? <span>Sending order data...</span> :
                        <>
                            <Button type='button' textOnly onClick={handleClose}>Close</Button>
                            <Button>Submit Order</Button>
                        </>
                    }
                </p>

            </form>
        </Modal>
    );
};

export default Checkout;