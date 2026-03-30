import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import { toast } from 'react-toastify';

const Checkout = () => {
    const { cartItems, cartTotal, clearCart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user ? user.name : '',
        email: user ? user.email : '',
        phone: '',
        date: '',
        time: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Redirect if cart is empty
    useEffect(() => {
        if (cartItems.length === 0 && !isSubmitting) {
            navigate('/cart');
        }
    }, [cartItems, navigate, isSubmitting]);

    // Get today's date in local correct format (YYYY-MM-DD)
    const getLocalToday = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;
        return new Date(now.getTime() - offset).toISOString().split('T')[0];
    };
    const today = getLocalToday();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Valid email is required";
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
        if (!formData.date) newErrors.date = "Date is required";
        if (!formData.time) newErrors.time = "Time is required";

        // Validate if time is past for today's date (comparing with local time)
        if (formData.date === today && formData.time) {
            const now = new Date();
            const currentHours = now.getHours();
            const currentMinutes = now.getMinutes();

            const [selectedHours, selectedMinutes] = formData.time.split(':').map(Number);

            // Add a 15-minute buffer so they can't order for EXACTLY right now and expect it instantly
            const currentTimeInMins = currentHours * 60 + currentMinutes;
            const selectedTimeInMins = selectedHours * 60 + selectedMinutes;

            if (selectedTimeInMins < currentTimeInMins) {
                newErrors.time = "Cannot select a past time today";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user interacts
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setIsSubmitting(true);

        try {
            const orderData = {
                customerInfo: formData,
                items: cartItems,
                totalAmount: cartTotal * 1.05,
                status: 'pending',
                createdAt: new Date().toISOString()
            };

            const response = await api.placeOrder(orderData);

            if (response.success) {
                clearCart();
                toast.success("Order placed successfully!");
                navigate('/success', { state: { orderId: response.orderId } });
            }
        } catch (error) {
            console.error("Checkout failed:", error);
            toast.error("Failed to process your order. Please try again.");
            setIsSubmitting(false);
        }
    };

    return (
        <div className="section__container" style={{ maxWidth: '800px' }}>
            <h2 className="section__header">Confirm Details Pre-Order</h2>

            <div style={{ backgroundColor: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                <form onSubmit={handleSubmit}>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label>Full Name</label>
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                            />
                            {errors.name && <span className="form-error">{errors.name}</span>}
                        </div>

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="john@example.com"
                            />
                            {errors.email && <span className="form-error">{errors.email}</span>}
                        </div>

                        <div className="form-group">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                className="form-control"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="+1 234 567 8900"
                            />
                            {errors.phone && <span className="form-error">{errors.phone}</span>}
                        </div>

                        <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                            <div style={{ backgroundColor: 'rgba(255, 90, 54, 0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
                                <p style={{ color: 'var(--primary)', fontWeight: 500, margin: 0 }}>
                                    <span style={{ marginRight: '8px' }}>🕒</span>
                                    When will you arrive at the restaurant? Your food will be ready!
                                </p>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Arrival Date</label>
                            <input
                                type="date"
                                name="date"
                                className="form-control"
                                value={formData.date}
                                onChange={handleChange}
                                min={today}
                            />
                            {errors.date && <span className="form-error">{errors.date}</span>}
                        </div>

                        <div className="form-group">
                            <label>Arrival Time</label>
                            <input
                                type="time"
                                name="time"
                                className="form-control"
                                value={formData.time}
                                onChange={handleChange}
                            />
                            {errors.time && <span className="form-error">{errors.time}</span>}
                        </div>
                    </div>

                    <div style={{ borderTop: '1px solid #333', marginTop: '2rem', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <p style={{ color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Total to pay at restaurant:</p>
                            <h3 style={{ color: 'var(--primary)', fontSize: '1.75rem', margin: 0 }}>${(cartTotal * 1.05).toFixed(2)}</h3>
                        </div>

                        <button
                            type="submit"
                            className="btn"
                            disabled={isSubmitting}
                            style={{ minWidth: '200px', opacity: isSubmitting ? 0.7 : 1 }}
                        >
                            {isSubmitting ? 'PROCESSING...' : 'CONFIRM PRE-ORDER'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;
