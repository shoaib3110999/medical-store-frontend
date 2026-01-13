import React from "react";
import { useLocation, Link } from "react-router-dom";
import { products } from "../data/medicinesData";
import { books } from "../data/booksData";

// Naqsh data (static for now)
const naqshData = [
    {
        title: "Tawiz-E-Khass",
        category: "Naqsh",
        link: "/naqsh",
        image: null // Or import taviz image if needed, but for search results handled generically
    }
];

const SearchResults = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("q") || "";

    // Combine all data
    // Map books to have a link property
    const booksWithLinks = books.map(b => ({
        ...b,
        link: `/books/${b.id}`,
        category: "Books"
    }));

    // Map products to have a link property
    const productsWithLinks = products.map(p => ({
        ...p,
        link: `/product/${encodeURIComponent(p.title)}`,
        category: "Medicines"
    }));

    const allItems = [...productsWithLinks, ...booksWithLinks, ...naqshData];

    const filteredItems = searchQuery
        ? allItems.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        : [];

    return (
        <div className="container search-results-container">
            <h2>Search Results for "{searchQuery}"</h2>
            {filteredItems.length > 0 ? (
                <div className="main-product search-results-grid">
                    {filteredItems.map((item, index) => (
                        <Link to={item.link} key={index}>
                            <div className="product-card">
                                {/* Display image if available, else placeholder or icon */}
                                {item.img || item.image ? (
                                    <img
                                        src={item.img || item.image}
                                        alt={item.title}
                                        className="product-image"
                                    />
                                ) : (
                                    <div className="placeholder-image">
                                        <span>{item.category}</span>
                                    </div>
                                )}
                                <h3 className="product-title">{item.title}</h3>
                                <p className="product-description">{item.category}</p>
                                <button className="view-btn">View</button>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <p>No results found.</p>
            )}
        </div>
    );
};

export default SearchResults;
