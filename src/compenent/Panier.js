import React, { useState } from 'react';
import { useCart } from '../panier';
import { useNavigate } from 'react-router-dom';

const Panier = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const navigate = useNavigate();

  const handleClearCart = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider le panier ?')) {
      setLoading(true);
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 500));
      clearCart();
      setLoading(false);
    }
  };

  const handleRemoveItem = async (id, name) => {
    if (window.confirm(`Retirer "${name}" du panier ?`)) {
      setLoading(true);
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 300));
      removeFromCart(id);
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (id, qty) => {
    setLoading(true);
    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 200));
    updateQuantity(id, qty);
    setLoading(false);
  };

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!customerInfo.name.trim()) errors.name = 'Le nom est requis';
    if (!customerInfo.email.trim()) errors.email = 'L\'email est requis';
    else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) errors.email = 'Email invalide';
    if (!customerInfo.phone.trim()) errors.phone = 'Le téléphone est requis';
    if (!customerInfo.address.trim()) errors.address = 'L\'adresse est requise';
    return errors;
  };

  const handleCheckout = () => {
    setShowCheckoutForm(true);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Create order with customer info
    const order = {
      id: Date.now(),
      items: items,
      total: totalPrice.toFixed(2),
      date: new Date().toISOString(),
      status: 'pending',
      customer: customerInfo
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    clearCart();
    alert('Commande passée avec succès !');
    navigate('/dachbord/order-history');
  };

  return (
    <div className="panier">
      <h1>Votre Panier</h1>
      {items.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
          borderRadius: '15px',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#666', marginBottom: '1rem' }}>Votre panier est vide</h2>
          <p style={{ color: '#999' }}>Ajoutez des produits pour commencer vos achats !</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <h3>{item.name}</h3>
                <p>Prix unitaire: {item.price}€</p>
                <p>Sous-total: {(item.price * item.qty).toFixed(2)}€</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.qty - 1)}
                    disabled={loading}
                  >
                    -
                  </button>
                  <span>Quantité: {item.qty}</span>
                  <button
                    onClick={() => handleUpdateQuantity(item.id, item.qty + 1)}
                    disabled={loading}
                  >
                    +
                  </button>
                </div>
                <button onClick={() => handleRemoveItem(item.id, item.name)}>Supprimer</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <h2>Total: {totalPrice.toFixed(2)}€</h2>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
              <button
                onClick={handleClearCart}
                style={{
                  background: '#ff6b6b',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Vider le panier
              </button>
              <button
                onClick={handleCheckout}
                style={{
                  background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                  color: 'white',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                Passer à la caisse
              </button>
            </div>
          </div>

          {showCheckoutForm && (
            <div style={{
              marginTop: '2rem',
              padding: '2rem',
              background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
              borderRadius: '15px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
            }}>
              <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', color: '#333' }}>
                Informations de livraison
              </h2>
              <form onSubmit={handleOrderSubmit}>
                <div style={{ display: 'grid', gap: '1rem', maxWidth: '500px', margin: '0 auto' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={customerInfo.name}
                      onChange={handleCustomerInfoChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: formErrors.name ? '2px solid #ff6b6b' : '2px solid #ddd',
                        fontSize: '1rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      placeholder="Votre nom complet"
                    />
                    {formErrors.name && (
                      <p style={{ color: '#ff6b6b', fontSize: '0.9rem', margin: '0.25rem 0' }}>
                        {formErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Adresse e-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={customerInfo.email}
                      onChange={handleCustomerInfoChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: formErrors.email ? '2px solid #ff6b6b' : '2px solid #ddd',
                        fontSize: '1rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      placeholder="votre.email@example.com"
                    />
                    {formErrors.email && (
                      <p style={{ color: '#ff6b6b', fontSize: '0.9rem', margin: '0.25rem 0' }}>
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={customerInfo.phone}
                      onChange={handleCustomerInfoChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: formErrors.phone ? '2px solid #ff6b6b' : '2px solid #ddd',
                        fontSize: '1rem',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                      placeholder="+212 6 XX XX XX XX"
                    />
                    {formErrors.phone && (
                      <p style={{ color: '#ff6b6b', fontSize: '0.9rem', margin: '0.25rem 0' }}>
                        {formErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
                      Adresse de livraison *
                    </label>
                    <textarea
                      name="address"
                      value={customerInfo.address}
                      onChange={handleCustomerInfoChange}
                      rows="3"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: '10px',
                        border: formErrors.address ? '2px solid #ff6b6b' : '2px solid #ddd',
                        fontSize: '1rem',
                        outline: 'none',
                        boxSizing: 'border-box',
                        resize: 'vertical'
                      }}
                      placeholder="Votre adresse complète"
                    />
                    {formErrors.address && (
                      <p style={{ color: '#ff6b6b', fontSize: '0.9rem', margin: '0.25rem 0' }}>
                        {formErrors.address}
                      </p>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem' }}>
                    <button
                      type="button"
                      onClick={() => setShowCheckoutForm(false)}
                      style={{
                        background: '#666',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      style={{
                        background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontWeight: '600'
                      }}
                    >
                      Confirmer la commande
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Panier;
