import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { RiAddFill, RiShoppingCartFill } from 'react-icons/ri';

const MenuCard = ({ item }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="order__card menu-item-card">
            <div className="card-image-wrapper">
                <img src={item.image} alt={item.name} className="card-image" />
                <span className="card-category-badge">{item.categoryName}</span>
            </div>
            <div className="card-content">
                <h4>{item.name}</h4>
                <p className="description">{item.description}</p>
                <div className="card-footer">
                    <span className="price">${item.price.toFixed(2)}</span>
                    <button
                        className="btn btn-icon"
                        onClick={() => addToCart(item)}
                        title="Add to Cart"
                    >
                        <RiAddFill size={20} /> <RiShoppingCartFill />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuCard;
