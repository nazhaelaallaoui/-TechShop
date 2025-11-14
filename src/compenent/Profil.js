import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profil = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    bio: ''
  });

  useEffect(() => {
    // Load current user from localStorage
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      const userData = JSON.parse(currentUser);
      setUser(userData);
      setEditForm({
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        dateOfBirth: userData.dateOfBirth || '',
        gender: userData.gender || '',
        bio: userData.bio || ''
      });
    } else {
      // Redirect to login if no user is logged in
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    const updatedUser = { ...user, ...editForm };
    setUser(updatedUser);

    // Update localStorage
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    // Update users array
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }

    setIsEditing(false);
    alert('Profil mis à jour avec succès !');
  };

  const handleCancel = () => {
    setEditForm({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      address: user.address || '',
      dateOfBirth: user.dateOfBirth || '',
      gender: user.gender || '',
      bio: user.bio || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
      localStorage.removeItem('currentUser');
      navigate('/login');
    }
  };

  if (!user) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        margin: '2rem auto',
        maxWidth: '600px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <h2>Chargement du profil...</h2>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '2rem',
        padding: '2rem',
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{
          color: '#333',
          marginBottom: '0.5rem',
          fontSize: '2.5rem',
          fontWeight: '700'
        }}>
          👤 Mon Profil
        </h1>
        <p style={{
          color: '#666',
          fontSize: '1.1rem',
          margin: '0'
        }}>
          Gérez vos informations personnelles et vos préférences
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '300px 1fr',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Profile Picture and Quick Actions */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            fontSize: '4rem',
            color: 'white',
            boxShadow: '0 4px 15px rgba(97, 218, 251, 0.3)'
          }}>
            {user.name ? user.name.charAt(0).toUpperCase() : '👤'}
          </div>

          <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>{user.name}</h3>
          <p style={{ color: '#666', marginBottom: '1.5rem' }}>{user.email}</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                padding: '0.75rem 1rem',
                background: isEditing ? '#ff6b6b' : 'linear-gradient(45deg, #61dafb, #21b4d6)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              {isEditing ? 'Annuler' : '✏️ Modifier Profil'}
            </button>

            <button
              onClick={() => navigate('/dachbord/settings')}
              style={{
                padding: '0.75rem 1rem',
                background: 'linear-gradient(45deg, #9c27b0, #673ab7)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              ⚙️ Paramètres
            </button>

            <button
              onClick={handleLogout}
              style={{
                padding: '0.75rem 1rem',
                background: 'linear-gradient(45deg, #f44336, #d32f2f)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
            >
              🚪 Déconnexion
            </button>
          </div>
        </div>

        {/* Profile Information */}
        <div style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
          borderRadius: '15px',
          padding: '2rem',
          boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{ color: '#333', marginBottom: '1.5rem', borderBottom: '2px solid #61dafb', paddingBottom: '0.5rem' }}>
            📋 Informations Personnelles
          </h2>

          {isEditing ? (
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '2px solid #ddd',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    required
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '2px solid #ddd',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={editForm.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '2px solid #ddd',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                    Date de naissance
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={editForm.dateOfBirth}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '10px',
                      border: '2px solid #ddd',
                      fontSize: '1rem',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Genre
                </label>
                <select
                  name="gender"
                  value={editForm.gender}
                  onChange={handleInputChange}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '2px solid #ddd',
                    fontSize: '1rem',
                    outline: 'none',
                    background: 'white'
                  }}
                >
                  <option value="">Sélectionner</option>
                  <option value="homme">Homme</option>
                  <option value="femme">Femme</option>
                  <option value="autre">Autre</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Adresse
                </label>
                <textarea
                  name="address"
                  value={editForm.address}
                  onChange={handleInputChange}
                  rows="3"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '2px solid #ddd',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: '#333' }}>
                  Biographie
                </label>
                <textarea
                  name="bio"
                  value={editForm.bio}
                  onChange={handleInputChange}
                  rows="4"
                  placeholder="Parlez-nous un peu de vous..."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '10px',
                    border: '2px solid #ddd',
                    fontSize: '1rem',
                    outline: 'none',
                    boxSizing: 'border-box',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  onClick={handleSave}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}
                >
                  💾 Sauvegarder
                </button>
                <button
                  onClick={handleCancel}
                  style={{
                    flex: 1,
                    padding: '0.75rem',
                    background: 'linear-gradient(45deg, #9e9e9e, #757575)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    cursor: 'pointer',
                    fontWeight: '600',
                    fontSize: '1rem'
                  }}
                >
                  ❌ Annuler
                </button>
              </div>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(97, 218, 251, 0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(97, 218, 251, 0.2)'
                }}>
                  <strong style={{ color: '#61dafb' }}>Nom:</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#333' }}>{user.name || 'Non spécifié'}</p>
                </div>

                <div style={{
                  background: 'rgba(97, 218, 251, 0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(97, 218, 251, 0.2)'
                }}>
                  <strong style={{ color: '#61dafb' }}>Email:</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#333' }}>{user.email || 'Non spécifié'}</p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div style={{
                  background: 'rgba(97, 218, 251, 0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(97, 218, 251, 0.2)'
                }}>
                  <strong style={{ color: '#61dafb' }}>Téléphone:</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#333' }}>{user.phone || 'Non spécifié'}</p>
                </div>

                <div style={{
                  background: 'rgba(97, 218, 251, 0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(97, 218, 251, 0.2)'
                }}>
                  <strong style={{ color: '#61dafb' }}>Date de naissance:</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#333' }}>
                    {user.dateOfBirth ? new Date(user.dateOfBirth).toLocaleDateString('fr-FR') : 'Non spécifiée'}
                  </p>
                </div>
              </div>

              <div style={{
                background: 'rgba(97, 218, 251, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(97, 218, 251, 0.2)'
              }}>
                <strong style={{ color: '#61dafb' }}>Genre:</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: '#333' }}>
                  {user.gender === 'homme' ? 'Homme' :
                   user.gender === 'femme' ? 'Femme' :
                   user.gender === 'autre' ? 'Autre' : 'Non spécifié'}
                </p>
              </div>

              <div style={{
                background: 'rgba(97, 218, 251, 0.1)',
                padding: '1rem',
                borderRadius: '10px',
                border: '1px solid rgba(97, 218, 251, 0.2)'
              }}>
                <strong style={{ color: '#61dafb' }}>Adresse:</strong>
                <p style={{ margin: '0.5rem 0 0 0', color: '#333', whiteSpace: 'pre-line' }}>
                  {user.address || 'Non spécifiée'}
                </p>
              </div>

              {user.bio && (
                <div style={{
                  background: 'rgba(97, 218, 251, 0.1)',
                  padding: '1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(97, 218, 251, 0.2)'
                }}>
                  <strong style={{ color: '#61dafb' }}>Biographie:</strong>
                  <p style={{ margin: '0.5rem 0 0 0', color: '#333', whiteSpace: 'pre-line' }}>
                    {user.bio}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Account Statistics */}
      <div style={{
        background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
        borderRadius: '15px',
        padding: '2rem',
        boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ color: '#333', marginBottom: '1.5rem', borderBottom: '2px solid #61dafb', paddingBottom: '0.5rem' }}>
          📊 Statistiques du compte
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
            borderRadius: '10px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
              {JSON.parse(localStorage.getItem('orders') || '[]').length}
            </h3>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>Commandes passées</p>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            background: 'linear-gradient(45deg, #ff6b6b, #ff5252)',
            borderRadius: '10px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
              {JSON.parse(localStorage.getItem('wishlist') || '[]').length}
            </h3>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>Articles en wishlist</p>
          </div>

          <div style={{
            textAlign: 'center',
            padding: '1.5rem',
            background: 'linear-gradient(45deg, #4caf50, #66bb6a)',
            borderRadius: '10px',
            color: 'white'
          }}>
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '2rem' }}>
              {new Date(user.createdAt || Date.now()).toLocaleDateString('fr-FR', { year: 'numeric' })}
            </h3>
            <p style={{ margin: 0, fontSize: '1.1rem' }}>Membre depuis</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
