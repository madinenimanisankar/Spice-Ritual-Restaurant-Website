import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api';
import MenuCard from '../components/MenuCard';
import Spinner from '../components/Spinner';

const Home = () => {
    const [popularItems, setPopularItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const items = await api.getMenuItems();
                // Just mock some popular items (e.g. first 3)
                setPopularItems(items.slice(0, 3));
            } catch (error) {
                console.error("Error fetching items", error);
            } finally {
                setLoading(false);
            }
        };
        fetchPopular();
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="section__container hero__container">
                <div className="hero__content">
                    <h1>Crunchy <br /> <span>Delights</span></h1>
                    <p>Enjoy the irresistible taste of authentic Indian Food, prepared with traditional recipes and a modern twist. Fresh, spicy, and always tasty.</p>
                    <Link to="/menu" className="btn">EXPLORE MENU</Link>
                </div>
                <div className="hero__image">
                    <img src="/src/assets/Onion Dosa.png" alt="Featured Dish" />
                </div>
            </section>

            {/* Highlights Banner */}
            <section className="section__container">
                <div className="banner__grid">
                    <div className="banner__card">
                        <p>TRY IT OUT TODAY</p>
                        <h4>MOST POPULAR SAMOSA</h4>
                    </div>
                    <div className="banner__card">
                        <p>MORE FLAVOR</p>
                        <h4>AUTHENTIC BIRYANI</h4>
                    </div>
                    <div className="banner__card">
                        <p>FRESH & SPICY</p>
                        <h4>CRISPY DOSA</h4>
                    </div>
                </div>
            </section>

            {/* Popular Menu Preview */}
            <section className="section__container">
                <h3 className="section__description" style={{ marginBottom: 0, color: 'var(--primary)' }}>ALWAYS TASTY SNACKS</h3>
                <h2 className="section__header">CHOOSE & ENJOY</h2>
                <p className="section__description">Experience a perfect blend of traditional recipes and modern culinary creativity. Every dish is crafted to deliver rich flavors and unforgettable taste.</p>

                {loading ? (
                    <Spinner />
                ) : (
                    <div className="order__grid">
                        {popularItems.map((item) => (
                            <MenuCard key={item.id} item={item} />
                        ))}
                    </div>
                )}
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <Link to="/menu" className="btn btn-secondary">VIEW FULL MENU</Link>
                </div>
            </section>
        </>
    );
};

export default Home;
