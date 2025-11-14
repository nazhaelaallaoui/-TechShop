import React from 'react';
import { useCart } from '../panier';

const Produit = () => {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: 'Produit 1', price: 10 },
    { id: 2, name: 'Produit 2', price: 20 },
    { id: 3, name: 'Produit 3', price: 30 },
  ];

  return (
    <div className="produit">
      <h1>Nos Produits</h1>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>Prix: {product.price}€</p>
            <button onClick={() => addToCart(product)}>Ajouter au panier</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produit;
