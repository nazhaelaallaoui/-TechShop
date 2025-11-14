import React, { useState, useEffect } from 'react';

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: '',
    comment: '',
    author: '',
    verified: false
  });
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = localStorage.getItem(`reviews_${productId}`);
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    } else {
      // Mock reviews for demo
      const mockReviews = [
        {
          id: 1,
          rating: 5,
          title: "Excellent produit !",
          comment: "Très satisfait de cet achat. La qualité est exceptionnelle et le service client est parfait.",
          author: "Marie Dupont",
          date: "2024-01-15",
          verified: true,
          helpful: 12
        },
        {
          id: 2,
          rating: 4,
          title: "Bon rapport qualité-prix",
          comment: "Produit de bonne qualité, livraison rapide. Petit problème avec l'emballage mais rien de grave.",
          author: "Jean Martin",
          date: "2024-01-10",
          verified: true,
          helpful: 8
        },
        {
          id: 3,
          rating: 5,
          title: "Recommande vivement !",
          comment: "Au top ! Fonctionne parfaitement, design moderne et fonctionnalités complètes.",
          author: "Sophie Bernard",
          date: "2024-01-08",
          verified: false,
          helpful: 15
        }
      ];
      setReviews(mockReviews);
      localStorage.setItem(`reviews_${productId}`, JSON.stringify(mockReviews));
    }
  }, [productId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const review = {
      id: Date.now(),
      ...newReview,
      author: currentUser.name || newReview.author,
      date: new Date().toISOString().split('T')[0],
      verified: !!currentUser.name,
      helpful: 0
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));

    // Reset form
    setNewReview({
      rating: 5,
      title: '',
      comment: '',
      author: '',
      verified: false
    });
    setShowReviewForm(false);
  };

  const handleHelpful = (reviewId) => {
    const updatedReviews = reviews.map(review =>
      review.id === reviewId
        ? { ...review, helpful: review.helpful + 1 }
        : review
    );
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${productId}`, JSON.stringify(updatedReviews));
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      case 'helpful':
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(review => review.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(review => review.rating === rating).length / reviews.length) * 100 : 0
  }));

  const renderStars = (rating, interactive = false, onChange = null) => {
    return (
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            style={{
              fontSize: '1.2rem',
              cursor: interactive ? 'pointer' : 'default',
              color: star <= rating ? '#ffc107' : '#ddd'
            }}
            onClick={interactive ? () => onChange && onChange(star) : undefined}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div style={{
      background: 'linear-gradient(145deg, rgba(255,255,255,0.9), rgba(240,240,240,0.9))',
      borderRadius: '15px',
      padding: '2rem',
      marginTop: '2rem',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>
        Avis clients ({reviews.length})
      </h2>

      {/* Rating Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem',
        padding: '1.5rem',
        background: 'rgba(255,255,255,0.8)',
        borderRadius: '10px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#333' }}>
            {averageRating.toFixed(1)}
          </div>
          {renderStars(Math.round(averageRating))}
          <div style={{ marginTop: '0.5rem', color: '#666' }}>
            {reviews.length} avis
          </div>
        </div>

        <div>
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.25rem'
            }}>
              <span style={{ minWidth: '20px' }}>{rating}★</span>
              <div style={{
                flex: 1,
                height: '8px',
                background: '#eee',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${percentage}%`,
                  height: '100%',
                  background: '#ffc107',
                  borderRadius: '4px'
                }} />
              </div>
              <span style={{ minWidth: '30px', fontSize: '0.9rem', color: '#666' }}>
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sort and Write Review */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1.5rem',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid #ddd',
            background: 'white'
          }}
        >
          <option value="newest">Plus récent</option>
          <option value="oldest">Plus ancien</option>
          <option value="highest">Meilleures notes</option>
          <option value="lowest">Pires notes</option>
          <option value="helpful">Plus utiles</option>
        </select>

        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          style={{
            background: 'linear-gradient(45deg, #61dafb, #21b4d6)',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '25px',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Écrire un avis
        </button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <form onSubmit={handleSubmitReview} style={{
          background: 'rgba(255,255,255,0.8)',
          padding: '1.5rem',
          borderRadius: '10px',
          marginBottom: '2rem'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Note
            </label>
            {renderStars(newReview.rating, true, (rating) =>
              setNewReview({ ...newReview, rating })
            )}
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <input
              type="text"
              placeholder="Titre de l'avis"
              value={newReview.title}
              onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
              required
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                marginBottom: '1rem',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <textarea
              placeholder="Votre avis..."
              value={newReview.comment}
              onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
              required
              rows="4"
              style={{
                width: '100%',
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #ddd',
                resize: 'vertical',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              style={{
                background: '#f44336',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Annuler
            </button>
            <button
              type="submit"
              style={{
                background: '#4caf50',
                color: 'white',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              Publier
            </button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {sortedReviews.map((review) => (
          <div key={review.id} style={{
            background: 'rgba(255,255,255,0.8)',
            padding: '1.5rem',
            borderRadius: '10px',
            border: '1px solid #e0e0e0'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '1rem'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  {renderStars(review.rating)}
                  {review.verified && (
                    <span style={{
                      background: '#4caf50',
                      color: 'white',
                      padding: '0.25rem 0.5rem',
                      borderRadius: '10px',
                      fontSize: '0.8rem'
                    }}>
                      ✓ Vérifié
                    </span>
                  )}
                </div>
                <h4 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>
                  {review.title}
                </h4>
                <div style={{ color: '#666', fontSize: '0.9rem' }}>
                  Par {review.author} • {review.date}
                </div>
              </div>
            </div>

            <p style={{ color: '#555', lineHeight: '1.6', marginBottom: '1rem' }}>
              {review.comment}
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <button
                onClick={() => handleHelpful(review.id)}
                style={{
                  background: 'none',
                  border: '1px solid #ddd',
                  padding: '0.5rem 1rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem'
                }}
              >
                👍 Utile ({review.helpful})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
