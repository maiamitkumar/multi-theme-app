import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [productCount, setProductCount] = useState(8);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then(res => setProducts(res.data));
  }, []);

  const handleAddProducts = () => {
    setProductCount(prev => Math.min(prev + 4, products.length));
  };

  const handleReduceProducts = () => {
    setProductCount(prev => Math.max(prev - 4, 4));
  };

  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the sample content paragraph.</p>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={handleAddProducts}>
          Add Products
        </button>
        <button className="btn btn-secondary" onClick={handleReduceProducts}>
          Reduce Products
        </button>
        <span className="ms-3 text-muted">Showing {productCount} products</span>
      </div>
      <div className="row">
        {products.slice(0, productCount).map((product: any) => (
          <div className="col-md-3 col-sm-6 mb-3" key={product.id}>
            <div 
              className="card h-100 shadow-sm border-0 bg-light-hover" 
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
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text">${product.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;