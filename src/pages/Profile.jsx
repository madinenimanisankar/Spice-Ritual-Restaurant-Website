import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import { RiFileList3Line, RiUserLine } from 'react-icons/ri';

const Profile = () => {
    const { user, login, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [orders, setOrders] = useState([]);
    const [fetchingData, setFetchingData] = useState(false);

    // Load orders if logged in
    useEffect(() => {
        if (user) {
            if (user.role === 'admin') {
                // Redirect to admin dashboard automatically
                navigate('/admin');
                return;
            }

            const loadOrders = async () => {
                setFetchingData(true);
                try {
                    const fetchedOrders = await api.getCustomerOrders(user.email);
                    setOrders(fetchedOrders);
                } catch (err) {
                    console.error(err);
                } finally {
                    setFetchingData(false);
                }
            };
            loadOrders();
        }
    }, [user, navigate]);

    const [isLoginView, setIsLoginView] = useState(true);
    const [name, setName] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.login(email);
            if (response.success) {
                login(response.user);
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError("An error occurred during login.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.register(name, email, password);
            if (response.success) {
                login(response.user); // auto login upon successful registration
            } else {
                setError(response.message);
            }
        } catch (err) {
            setError("An error occurred during registration.");
        } finally {
            setLoading(false);
        }
    };

    // Auth view
    if (!user) {
        return (
            <div className="section__container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '3rem 2rem', borderRadius: '12px', width: '100%', maxWidth: '450px', boxShadow: 'var(--shadow-lg)' }}>
                    <h2 className="section__header" style={{ marginBottom: '0.5rem' }}>
                        {isLoginView ? 'Welcome Back' : 'Create Account'}
                    </h2>
                    <p className="text-center text-muted" style={{ marginBottom: '2rem' }}>
                        {isLoginView ? 'Sign in to view your profile and order history.' : 'Join Spice Ritual to unlock fast checkout.'}
                    </p>

                    <form onSubmit={isLoginView ? handleLogin : handleRegister}>
                        {error && <div style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

                        {!isLoginView && (
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        )}

                        <div className="form-group">
                            <label>Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input
                                type="password"
                                className="form-control"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Any password works for demo"
                                required
                            />
                        </div>

                        <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                            {loading ? 'AUTHENTICATING...' : (isLoginView ? 'LOGIN TO DASHBOARD' : 'REGISTER ACCOUNT')}
                        </button>
                    </form>

                    <div className="text-center" style={{ marginTop: '1.5rem' }}>
                        <p style={{ color: 'var(--text-muted)' }}>
                            {isLoginView ? "Don't have an account?" : "Already have an account?"}
                            <button
                                type="button"
                                onClick={() => { setIsLoginView(!isLoginView); setError(''); }}
                                style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold', marginLeft: '0.5rem', textDecoration: 'underline' }}
                            >
                                {isLoginView ? 'Sign up' : 'Log in'}
                            </button>
                        </p>
                    </div>

                    {isLoginView && (
                        <p className="text-center text-muted" style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}>
                            Hint: Use <strong>user@spiceritual.com</strong> for Customer or <strong>admin@spiceritual.com</strong> for Admin.
                        </p>
                    )}
                </div>
            </div>
        );
    }

    // Profile view
    return (
        <div className="section__container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ backgroundColor: 'var(--primary)', color: 'white', height: '50px', width: '50px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '1.5rem' }}>
                        <RiUserLine />
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--text-light)' }}>{user.name}</h2>
                        <p className="text-muted" style={{ margin: 0 }}>{user.email}</p>
                    </div>
                </div>
                <button onClick={logout} className="btn btn-secondary">LOGOUT</button>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #333', paddingBottom: '1rem' }}>
                    <RiFileList3Line size={24} color="var(--primary)" />
                    <h3>Order History</h3>
                </div>

                {fetchingData ? <Spinner /> : orders.length === 0 ? (
                    <div className="text-center" style={{ padding: '3rem 0' }}>
                        <p className="text-muted">You have no past orders.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {orders.map(order => (
                            <div key={order.id} style={{ border: '1px solid #333', borderRadius: '8px', padding: '1.5rem' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', paddingBottom: '1rem', marginBottom: '1rem' }}>
                                    <div>
                                        <h4 style={{ color: 'var(--primary)', margin: 0 }}>{order.id}</h4>
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}</p>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                        <span style={{ backgroundColor: 'rgba(40, 167, 69, 0.1)', color: 'var(--success)', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 600, textTransform: 'uppercase' }}>
                                            {order.status}
                                        </span>
                                        <p style={{ fontWeight: 'bold', fontSize: '1.2rem', marginTop: '0.5rem', color: 'var(--text-light)' }}>${order.totalAmount.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div>
                                    <h5 style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Items:</h5>
                                    <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                                        {order.items.map(item => (
                                            <li key={item.id} style={{ marginBottom: '0.25rem' }}>
                                                {item.quantity}x {item.name} <span style={{ color: 'var(--text-muted)' }}>(${item.price.toFixed(2)} ea)</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
