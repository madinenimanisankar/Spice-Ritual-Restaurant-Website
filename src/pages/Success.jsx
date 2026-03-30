import React, { useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { RiCheckLine } from 'react-icons/ri';

const Success = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const orderId = location.state?.orderId;

    useEffect(() => {
        // If user accesses this page directly without an order ID
        if (!orderId) {
            navigate('/');
        }
    }, [orderId, navigate]);

    if (!orderId) return null;

    return (
        <div className="section__container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
            <div className="success-container">
                <RiCheckLine className="success-icon" />
                <h2 className="section__header" style={{ marginBottom: '1rem' }}>Preparation Started!</h2>
                <p className="section__description" style={{ marginBottom: '1rem', color: 'var(--text-light)' }}>
                    Your advance order has been confirmed exactly the way you crafted it.
                </p>

                <p style={{ color: 'var(--text-muted)' }}>Here is your unique reference number:</p>
                <div className="order-id">{orderId}</div>

                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>
                    Please show this reference number at the front desk when you arrive at your scheduled time.
                </p>

                <Link to="/" className="btn">Return to Home</Link>
            </div>
        </div>
    );
};

export default Success;
