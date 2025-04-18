import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    valeur1: '',
    valeur2: '',
    valeur3: '',
    valeur4: '',
    moyenne: 0 // Ajout du champ moyenne dans le state
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Mise à jour de la valeur modifiée
    const updatedFormData = {
      ...formData,
      [name]: value
    };
    
    // Calcul de la moyenne si les 4 valeurs sont disponibles
    if (updatedFormData.valeur1 && updatedFormData.valeur2 && 
        updatedFormData.valeur3 && updatedFormData.valeur4) {
      const sum = parseFloat(updatedFormData.valeur1) + 
                 parseFloat(updatedFormData.valeur2) + 
                 parseFloat(updatedFormData.valeur3) + 
                 parseFloat(updatedFormData.valeur4);
      updatedFormData.moyenne = (sum / 4).toFixed(2);
    }
    
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setStatus('Élément ajouté avec succès!');
        setTimeout(() => {
          navigate('/');
        }, 1500);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout');
      }
    } catch (error) {
      setStatus('Erreur: ' + error.message);
      console.error('Error:', error);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h2 className="mb-4">Ajouter un nouvel élément</h2>
        
        {status && (
          <div className={`alert ${status.includes('Erreur') ? 'alert-danger' : 'alert-success'}`}>
            {status}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="valeur1" className="form-label">Valeur 1</label>
            <input
              type="number"
              className="form-control"
              id="valeur1"
              name="valeur1"
              value={formData.valeur1}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="valeur2" className="form-label">Valeur 2</label>
            <input
              type="number"
              className="form-control"
              id="valeur2"
              name="valeur2"
              value={formData.valeur2}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="valeur3" className="form-label">Valeur 3</label>
            <input
              type="number"
              className="form-control"
              id="valeur3"
              name="valeur3"
              value={formData.valeur3}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>
          
          <div className="mb-3">
            <label htmlFor="valeur4" className="form-label">Valeur 4</label>
            <input
              type="number"
              className="form-control"
              id="valeur4"
              name="valeur4"
              value={formData.valeur4}
              onChange={handleChange}
              required
              step="0.01"
            />
          </div>

          {/* Affichage de la moyenne calculée */}
          <div className="mb-3">
            <label className="form-label">Moyenne calculée</label>
            <input
              type="text"
              className="form-control"
              value={formData.moyenne || 'Remplissez les 4 valeurs'}
              readOnly
            />
          </div>
          
          <div className="d-grid gap-2 d-md-flex justify-content-md-end">
            <button type="button" className="btn btn-secondary me-md-2" onClick={() => navigate('/')}>
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;