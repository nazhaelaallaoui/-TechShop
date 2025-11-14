import React from 'react';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = React.useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(item => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
  };

  const addToWishlist = (product) => {
    if (!wishlist.find(item => item.id === product.id)) {
      const updated = [...wishlist, product];
      setWishlist(updated);
      localStorage.setItem('wishlist', JSON.stringify(updated));
    }
  };

  return (
    <div className="wishlist">
      <h1>Ma Liste de Souhaits</h1>
      {wishlist.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          borderRadius: '15px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#666', marginBottom: '1rem' }}>Votre liste de souhaits est vide</h2>
          <p style={{ color: '#999' }}>Ajoutez des produits à votre liste de souhaits !</p>
          <Link to="/dachbord" style={{
            display: 'inline-block',
            padding: '0.75rem 1.5rem',
            background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '25px',
            fontWeight: '600',
            marginTop: '1rem'
          }}>
            Découvrir les produits
          </Link>
        </div>
      ) : (
        <div className="product-list">
          {wishlist.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '10px',
                  marginBottom: '1rem'
                }}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <span className="price">{product.price}€</span>
              <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                <Link to={`/dachbord/produit/${product.id}`}>Voir Détails</Link>
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  style={{
                    padding: '0.5rem 1rem',
                    background: '#ff6b6b',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                  }}
                >
                  Retirer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
