import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import MenuCard from '../components/MenuCard';
import Spinner from '../components/Spinner';
import { RiSearchLine } from 'react-icons/ri';

const Menu = () => {
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Filters and Sorting
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [fetchedCategories, fetchedItems] = await Promise.all([
                    api.getCategories(),
                    api.getMenuItems()
                ]);
                setCategories(fetchedCategories);
                setItems(fetchedItems);
            } catch (error) {
                console.error("Error fetching menu data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Filter Logic
    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || item.categoryId === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    // Sort Logic
    const sortedItems = [...filteredItems].sort((a, b) => {
        if (sortOption === 'price-low') return a.price - b.price;
        if (sortOption === 'price-high') return b.price - a.price;
        if (sortOption === 'name') return a.name.localeCompare(b.name);
        return 0; // default
    });

    return (
        <div className="section__container">
            <h2 className="section__header">Our Menu</h2>
            <p className="section__description">Discover our carefully curated selection of authentic Indian delicacies, from spicy starters to sweet desserts.</p>

            {/* Menu Controls (Search, Filter, Sort) */}
            <div className="menu-controls">
                <div className="search-bar">
                    <RiSearchLine size={20} color="var(--text-muted)" />
                    <input
                        type="text"
                        placeholder="Search dishes or ingredients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="filter-pills">
                    <button
                        className={`filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All
                    </button>
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                <select
                    className="sort-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="default">Sort by: Default</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="name">Name: A-Z</option>
                </select>
            </div>

            {loading ? (
                <Spinner />
            ) : (
                <>
                    {sortedItems.length === 0 ? (
                        <div className="text-center" style={{ marginTop: '4rem' }}>
                            <h3>No dishes found matching your criteria.</h3>
                            <p className="text-muted">Try adjusting your search or filter settings.</p>
                            <button className="btn btn-secondary" style={{ marginTop: '1rem' }} onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>Clear Filters</button>
                        </div>
                    ) : (
                        <div className="order__grid">
                            {sortedItems.map(item => (
                                <MenuCard key={item.id} item={item} />
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Menu;
