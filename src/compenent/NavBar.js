import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../panier';

const NavBar = () => {
  const { items } = useCart();
  const totalItems = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">E-commerce</Link>
      </div>
    <li><Link to="/">Tableau de Bord</Link></li>
      <ul className="navbar-nav">
         
         <li><Link to="/produit">Produits</Link></li>
         <li><Link to="/panier">Panier ({totalItems})</Link></li>
         <li><Link to="/profil">Profil</Link></li>
         <li><Link to="/about">À propos</Link></li>
         <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
