import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email invalide';
    }

    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    if (!isLogin) {
      if (!formData.name) {
        newErrors.name = 'Nom requis';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Confirmation du mot de passe requise';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Simulate authentication
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (isLogin) {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        alert('Connexion réussie !');
        navigate('/dachbord');
      } else {
        setErrors({ general: 'Email ou mot de passe incorrect' });
      }
    } else {
      const existingUser = users.find(u => u.email === formData.email);
      if (existingUser) {
        setErrors({ email: 'Cet email est déjà utilisé' });
      } else {
        const newUser = {
          id: Date.now(),
          name: formData.name,
          email: formData.email,
          password: formData.password
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        alert('Inscription réussie !');
        navigate('/dachbord');
      }
    }
  };

  return (
    <div style={{
      maxWidth: '400px',
      margin: '2rem auto',
      padding: '2rem',
      background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
      borderRadius: '15px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '2rem',
        color: '#333'
      }}>
        {isLogin ? 'Connexion' : 'Inscription'}
      </h2>

      {errors.general && (
        <div style={{
          color: '#ff6b6b',
          textAlign: 'center',
          marginBottom: '1rem',
          padding: '0.5rem',
          background: '#ffebee',
          borderRadius: '5px'
        }}>
          {errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              name="name"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: `2px solid ${errors.name ? '#ff6b6b' : '#ddd'}`,
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.name && <span style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{errors.name}</span>}
          </div>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '10px',
              border: `2px solid ${errors.email ? '#ff6b6b' : '#ddd'}`,
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.email && <span style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <input
            type="password"
            name="password"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleInputChange}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '10px',
              border: `2px solid ${errors.password ? '#ff6b6b' : '#ddd'}`,
              fontSize: '1rem',
              outline: 'none',
              boxSizing: 'border-box'
            }}
          />
          {errors.password && <span style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{errors.password}</span>}
        </div>

        {!isLogin && (
          <div style={{ marginBottom: '1rem' }}>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '10px',
                border: `2px solid ${errors.confirmPassword ? '#ff6b6b' : '#ddd'}`,
                fontSize: '1rem',
                outline: 'none',
                boxSizing: 'border-box'
              }}
            />
            {errors.confirmPassword && <span style={{ color: '#ff6b6b', fontSize: '0.9rem' }}>{errors.confirmPassword}</span>}
          </div>
        )}

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          {isLogin ? 'Se connecter' : 'S\'inscrire'}
        </button>
      </form>

      <div style={{ textAlign: 'center' }}>
        <button
          onClick={() => setIsLogin(!isLogin)}
          style={{
            background: 'none',
            border: 'none',
            color: '#61dafb',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          {isLogin ? 'Pas encore de compte ? S\'inscrire' : 'Déjà un compte ? Se connecter'}
        </button>
      </div>
    </div>
  );
};

export default Login;
