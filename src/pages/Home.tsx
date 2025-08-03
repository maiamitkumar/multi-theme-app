import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface HomeProps {
  theme: string;
}

const Home: React.FC<HomeProps> =  ({ theme }) => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(8);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then(res => setProducts(res.data));
  }, []);

  const handleLoadMore = () => {
    setProductCount(prev => Math.min(prev + 4, products.length));
  };

  const hasMoreProducts = productCount < products.length;

  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the sample content paragraph.</p>
      <div className="mb-3">
        <span className={`${theme === 'theme2' ? 'text-light' : 'text-muted' }`}>Showing {productCount} of {products.length} products</span>
      </div>
      <div className="row product-grid px-3">
        {products.slice(0, productCount).map((product: any) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
            <div 
              className="card h-100 shadow-sm card-hover border-0 bg-light-hover" 
              style={{ 
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.classList.add('bg-light', 'shadow', 'translate-up');
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove('bg-light', 'shadow', 'translate-up');
              }}
            >
              <div className="bg-light p-3">
                <img src={product.image} className="card-img-top bg-light" alt={product.title} />
              </div>
              <div className="card-body">
                <h5 className="card-title">
                  {product.title.split(' ').slice(0, 5).join(' ')}
                  {product.title.split(' ').length > 5 ? '...' : ''}
                </h5>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {hasMoreProducts && (
        <div className="text-center pb-3 load-more-container">
          <button 
            className="btn btn-primary btn-sm px-3 py-2" 
            onClick={handleLoadMore}
          >
            <i className="bi bi-arrow-down-circle me-2"></i>
            Load More Products
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;