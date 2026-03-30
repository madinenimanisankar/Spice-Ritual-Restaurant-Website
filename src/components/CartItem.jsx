import React from 'react';
import { RiAddLine, RiSubtractLine, RiDeleteBinLine } from 'react-icons/ri';

const CartItem = ({ item, onUpdate, onRemove }) => {
    const handleIncrease = () => onUpdate(item.id, item.quantity + 1);
    const handleDecrease = () => onUpdate(item.id, item.quantity - 1);
    const handleRemove = () => onRemove(item.id);

    return (
        <div className="cart-item">
            <img src={item.image} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h4>{item.name}</h4>
                <p className="cart-item-price">${item.price.toFixed(2)}</p>
            </div>
            <div className="cart-item-actions">
                <div className="quantity-controls">
                    <button onClick={handleDecrease} className="qty-btn" title="Decrease">
                        <RiSubtractLine />
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button onClick={handleIncrease} className="qty-btn" title="Increase">
                        <RiAddLine />
                    </button>
                </div>
                <div className="cart-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button onClick={handleRemove} className="remove-btn" title="Remove Item">
                    <RiDeleteBinLine />
                </button>
            </div>
        </div>
    );
};

export default CartItem;
