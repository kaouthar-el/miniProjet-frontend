import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductList() {
  const [products, setProducts] = useState([]);
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchProducts();
  }, []);

  const calculateAverage = (product) => {
    const sum = product.valeur1 + product.valeur2 + product.valeur3 + product.valeur4;
    return (sum / 4).toFixed(2);
  };

  const formatDate = (dateString) => {
    if (!dateString) {
      // Si pas de date, retourne la date du jour
      dateString = new Date().toISOString();
    }
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/products/${productId}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setProducts(products.filter(product => product.id !== productId));
        alert('Produit supprimé avec succès');
      } else {
        alert('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Une erreur est survenue');
    }
  };

  return (
    <div className="row">
      <div className="col">
        <h1 className="mb-4">Gestion des valeurs</h1>
        <Link to="/product/create" className="btn btn-primary mb-3">Ajouter un élément</Link>
        
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>id</th>
              <th>Date</th>
              <th>Valeur 1</th>
              <th>Valeur 2</th>
              <th>Valeur 3</th>
              <th>Valeur 4</th>
              <th>Moyenne</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{formatDate(product.date)}</td>
                <td>{product.valeur1}</td>
                <td>{product.valeur2}</td>
                <td>{product.valeur3}</td>
                <td>{product.valeur4}</td>
                <td>{calculateAverage(product)}</td>
                <td>
                  <Link to={`/product/edit/${product.id}`} className="btn btn-sm btn-warning me-2">
                    Modifier
                  </Link>
                  <button 
                    onClick={() => handleDelete(product.id)} 
                    className="btn btn-sm btn-danger"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;