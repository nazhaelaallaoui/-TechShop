import React from 'react';
import { Link } from 'react-router-dom';

const Produit = () => {
  // Mock product data with real images and enhanced details
  const products = [
    {
      id: 1,
      name: 'Smartphone Galaxy S23',
      price: 899,
      description: 'Le dernier smartphone Samsung avec caméra haute résolution et performance exceptionnelle.',
      image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop&crop=center',
      category: 'smartphones',
      rating: 4.5,
      reviews: 128,
      features: ['Écran 6.1" AMOLED', 'Triple caméra 50MP', 'Batterie 3900mAh', '5G compatible']
    },
    {
      id: 2,
      name: 'MacBook Pro M2',
      price: 1299,
      description: 'Ordinateur portable Apple avec puce M2 pour une productivité maximale.',
      image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=300&fit=crop&crop=center',
      category: 'ordinateurs',
      rating: 4.8,
      reviews: 89,
      features: ['Puce M2 8-core', 'Écran Retina 13.3"', 'Mémoire unifiée 8GB', 'SSD 256GB']
    },
    {
      id: 3,
      name: 'Casque Sony WH-1000XM5',
      price: 349,
      description: 'Casque sans fil avec réduction de bruit active et qualité audio supérieure.',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=300&fit=crop&crop=center',
      category: 'audio',
      rating: 4.6,
      reviews: 203,
      features: ['Réduction de bruit active', 'Autonomie 30h', 'Connexion multipoint', 'Audio haute résolution']
    },
    {
      id: 4,
      name: 'iPad Pro 12.9"',
      price: 1099,
      description: 'Tablette professionnelle Apple avec écran Liquid Retina XDR et puce M2.',
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop&crop=center',
      category: 'tablettes',
      rating: 4.7,
      reviews: 156,
      features: ['Écran 12.9" Liquid Retina', 'Puce M2', 'Caméra 12MP', 'Face ID']
    },
    {
      id: 5,
      name: 'AirPods Pro',
      price: 279,
      description: 'Écouteurs sans fil avec réduction de bruit active et qualité audio premium.',
      image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c9bf1d?w=400&h=300&fit=crop&crop=center',
      category: 'audio',
      rating: 4.4,
      reviews: 312,
      features: ['Réduction de bruit active', 'Audio spatial', 'Résistance à l\'eau', 'Autonomie 6h']
    },
    {
      id: 6,
      name: 'Dell XPS 13',
      price: 1199,
      description: 'Ordinateur portable ultrabook avec écran InfinityEdge et performances exceptionnelles.',
      image: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400&h=300&fit=crop&crop=center',
      category: 'ordinateurs',
      rating: 4.3,
      reviews: 94,
      features: ['Écran 13.3" FHD+', 'Intel Core i7', 'SSD 512GB', 'Poids 1.2kg']
    },
    {
      id: 7,
      name: 'iPhone 15 Pro',
      price: 1199,
      description: 'Le dernier iPhone avec puce A17 Pro et caméra professionnelle.',
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=300&fit=crop&crop=center',
      category: 'smartphones',
      rating: 4.9,
      reviews: 245,
      features: ['Puce A17 Pro', 'Caméra 48MP', 'Titanium', 'USB-C']
    },
    {
      id: 8,
      name: 'Surface Pro 9',
      price: 1099,
      description: 'Tablette hybride Microsoft avec processeur Intel Core i5.',
      image: 'https://images.unsplash.com/photo-1587614295999-6c1f4c3f662d?w=400&h=300&fit=crop&crop=center',
      category: 'tablettes',
      rating: 4.4,
      reviews: 178,
      features: ['Intel Core i5', 'Écran 13"', 'Windows 11', 'Clavier détachable']
    },
    {
      id: 9,
      name: 'PlayStation 5',
      price: 499,
      description: 'Console de jeu nouvelle génération avec SSD ultra-rapide.',
      image: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?w=400&h=300&fit=crop&crop=center',
      category: 'gaming',
      rating: 4.8,
      reviews: 567,
      features: ['SSD 825GB', 'Ray Tracing', '4K Gaming', 'DualSense']
    },
    {
      id: 10,
      name: 'Nintendo Switch OLED',
      price: 349,
      description: 'Console hybride avec écran OLED amélioré et autonomie prolongée.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
      category: 'gaming',
      rating: 4.6,
      reviews: 423,
      features: ['Écran OLED 7"', 'Autonomie 9h', 'Joy-Con', 'Mode portable/TV']
    },
    {
      id: 11,
      name: 'Apple Watch Series 9',
      price: 429,
      description: 'Montre connectée avec capteurs de santé avancés et design élégant.',
      image: 'https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=400&h=300&fit=crop&crop=center',
      category: 'wearables',
      rating: 4.7,
      reviews: 312,
      features: ['Écran Retina', 'GPS', 'Capteurs santé', 'Résistance eau 50m']
    },
    {
      id: 12,
      name: 'Samsung Galaxy Watch 6',
      price: 349,
      description: 'Smartwatch Android avec suivi fitness complet et design moderne.',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop&crop=center',
      category: 'wearables',
      rating: 4.5,
      reviews: 289,
      features: ['Suivi sommeil', 'GPS intégré', 'Écran AMOLED', 'Batterie 40h']
    },
    {
      id: 13,
      name: 'Logitech MX Master 3S',
      price: 99,
      description: 'Souris ergonomique sans fil avec précision laser et autonomie exceptionnelle.',
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=300&fit=crop&crop=center',
      category: 'accessoires',
      rating: 4.8,
      reviews: 156,
      features: ['Capteur 8000 DPI', 'Autonomie 70j', 'Bluetooth/USB', 'Ergonomique']
    },
    {
      id: 14,
      name: 'Razer BlackWidow V3',
      price: 139,
      description: 'Clavier mécanique gaming avec switches optiques et RGB personnalisable.',
      image: 'https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=300&fit=crop&crop=center',
      category: 'accessoires',
      rating: 4.6,
      reviews: 203,
      features: ['Switches optiques', 'RGB Chroma', 'Anti-ghosting', 'Câble USB-C']
    },
    {
      id: 15,
      name: 'Monitor LG 27UL950-W',
      price: 699,
      description: 'Moniteur 4K UHD avec HDR et calibration professionnelle.',
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=300&fit=crop&crop=center',
      category: 'moniteurs',
      rating: 4.7,
      reviews: 134,
      features: ['4K UHD', 'HDR10', 'USB-C', 'Calibration factory']
    }
  ];

  return (
    <div className="produits">
      <h1>Nos Produits</h1>
      <div className="product-list">
        {products.map((product) => (
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
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300/61dafb/ffffff?text=Produit+TechShop';
              }}
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className="price">{product.price}€</span>
            <Link to={`/dachbord/produit/${product.id}`}>Voir Détails</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Produit;
