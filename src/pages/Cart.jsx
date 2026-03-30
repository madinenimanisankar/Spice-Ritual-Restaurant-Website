import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';
import { RiShoppingBagLine } from 'react-icons/ri';

const Cart = () => {
    const { cartItems, updateQuantity, removeFromCart, cartTotal } = useContext(CartContext);
    const navigate = useNavigate();

    if (cartItems.length === 0) {
        return (
            <div className="section__container text-center" style={{ padding: '8rem 1rem' }}>
                <RiShoppingBagLine size={80} color="var(--text-muted)" style={{ marginBottom: '1rem' }} />
                <h2 className="section__header">Your Cart is Empty</h2>
                <p className="section__description">Looks like you haven't added any delicious items to your cart yet.</p>
                <Link to="/menu" className="btn">BROWSE MENU</Link>
            </div>
        );
    }

    return (
        <div className="section__container">
            <h2 className="section__header" style={{ textAlign: 'left' }}>Your Cart</h2>

            <div className="cart-container">
                <div className="cart-items">
                    {cartItems.map((item) => (
                        <CartItem
                            key={item.id}
                            item={item}
                            onUpdate={updateQuantity}
                            onRemove={removeFromCart}
                        />
                    ))}
                </div>

                <div className="cart-summary">
                    <h3>Order Summary</h3>
                    <div style={{ margin: '2rem 0' }}>
                        <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Taxes (5%)</span>
                            <span>${(cartTotal * 0.05).toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span className="text-primary">${(cartTotal * 1.05).toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        className="btn"
                        style={{ width: '100%', padding: '1rem' }}
                        onClick={() => navigate('/checkout')}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                    <div className="text-center" style={{ marginTop: '1rem' }}>
                        <Link to="/menu" style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            &larr; Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
