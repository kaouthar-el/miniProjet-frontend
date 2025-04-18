import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        valeur1: '',
        valeur2: '',
        valeur3: '',
        valeur4: ''
    });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}`);
                const { valeur1, valeur2, valeur3, valeur4 } = response.data.product;
                setFormData({
                    valeur1,
                    valeur2,
                    valeur3,
                    valeur4
                });
                setStatus('');
                setLoading(false);
            } catch (error) {
                console.log(error.response?.data?.errors || error.message);
                setStatus('Erreur lors du chargement du produit');
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await axios.put(`http://127.0.0.1:8000/api/products/${id}`, formData);
            setStatus('Produit mis à jour avec succès');
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            setStatus('Erreur: ' + (error.response?.data?.message || error.message));
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div className="text-center mt-4">Chargement...</div>;
    }

    return (
        <div className="row">
            <div className="col-md-6 offset-md-3">
                <h2 className="mb-4">Modifier l'élément #{id}</h2>
                
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
                        />
                    </div>
                    
                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                        <button type="button" className="btn btn-secondary me-md-2" onClick={() => navigate('/')}>
                            Annuler
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Enregistrer les modifications
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProduct;