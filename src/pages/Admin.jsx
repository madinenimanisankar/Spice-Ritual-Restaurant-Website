import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import Spinner from '../components/Spinner';

const Admin = () => {
    const { user, login, logout } = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [menuItems, setMenuItems] = useState([]);
    const [fetchingData, setFetchingData] = useState(false);

    // Load menu items when admin logs in
    useEffect(() => {
        if (user?.role === 'admin') {
            const loadAdminData = async () => {
                setFetchingData(true);
                try {
                    const items = await api.getMenuItems();
                    setMenuItems(items);
                } catch (err) {
                    console.error(err);
                } finally {
                    setFetchingData(false);
                }
            };
            loadAdminData();
        }
    }, [user]);

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

    const handleDeleteItem = (id) => {
        if (window.confirm("Are you sure you want to delete this menu item?")) {
            // In a real app we'd call an API here. Let's just update local state.
            setMenuItems(prev => prev.filter(item => item.id !== id));
        }
    };

    // Login view
    if (!user || user.role !== 'admin') {
        return (
            <div className="section__container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
                <div style={{ backgroundColor: 'var(--bg-card)', padding: '3rem 2rem', borderRadius: '12px', width: '100%', maxWidth: '450px', boxShadow: 'var(--shadow-lg)' }}>
                    <h2 className="section__header" style={{ marginBottom: '0.5rem' }}>Admin Portal</h2>
                    <p className="text-center text-muted" style={{ marginBottom: '2rem' }}>Sign in to manage menu items.</p>

                    <form onSubmit={handleLogin}>
                        {error && <div style={{ backgroundColor: 'rgba(220, 53, 69, 0.1)', color: 'var(--danger)', padding: '0.75rem', borderRadius: '8px', marginBottom: '1.5rem', textAlign: 'center' }}>{error}</div>}

                        <div className="form-group">
                            <label>Admin Email</label>
                            <input
                                type="email"
                                className="form-control"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@spiceritual.com"
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
                                placeholder="Any password works for dummy login"
                                required
                            />
                        </div>

                        <button type="submit" className="btn" style={{ width: '100%', marginTop: '1rem' }} disabled={loading}>
                            {loading ? 'AUTHENTICATING...' : 'LOGIN DIRECTORY'}
                        </button>
                    </form>
                    <p className="text-center text-muted" style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}>
                        Hint: Use <strong>admin@spiceritual.com</strong>
                    </p>
                </div>
            </div>
        );
    }

    // Dashboard view
    return (
        <div className="section__container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <div>
                    <h2 className="section__header" style={{ textAlign: 'left', marginBottom: '0' }}>Admin Dashboard</h2>
                    <p className="text-muted">Welcome, {user.name}!</p>
                </div>
                <button onClick={logout} className="btn btn-secondary">LOGOUT</button>
            </div>

            <div style={{ backgroundColor: 'var(--bg-card)', borderRadius: '12px', padding: '2rem', boxShadow: 'var(--shadow-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <h3>Menu Management</h3>
                    <button className="btn" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>+ NEW ITEM</button>
                </div>

                {fetchingData ? <Spinner /> : (
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '2px solid #333', color: 'var(--text-muted)' }}>
                                    <th style={{ padding: '1rem' }}>ID</th>
                                    <th style={{ padding: '1rem' }}>Item Image</th>
                                    <th style={{ padding: '1rem' }}>Item Name</th>
                                    <th style={{ padding: '1rem' }}>Category</th>
                                    <th style={{ padding: '1rem' }}>Price</th>
                                    <th style={{ padding: '1rem', textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {menuItems.map(item => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #222' }}>
                                        <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>#{item.id}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', objectFit: 'contain', backgroundColor: '#252525', borderRadius: '4px' }} />
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: 500 }}>{item.name}</td>
                                        <td style={{ padding: '1rem' }}>
                                            <span style={{ backgroundColor: 'var(--bg-dark)', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' }}>{item.categoryName}</span>
                                        </td>
                                        <td style={{ padding: '1rem', fontWeight: 600, color: 'var(--primary)' }}>${item.price.toFixed(2)}</td>
                                        <td style={{ padding: '1rem', textAlign: 'center' }}>
                                            <button className="btn btn-secondary" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', marginRight: '0.5rem' }}>Edit</button>
                                            <button className="btn" style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', backgroundColor: 'var(--danger)' }} onClick={() => handleDeleteItem(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Admin;
