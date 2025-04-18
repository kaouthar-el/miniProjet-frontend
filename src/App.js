import * as React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import EditProduct from "./components/Edit.component";
import CreateProduct from "./components/create.component";
import ProductList from "./components/list.component";

function App() {
  return (
    <Router>
      <div className="container py-4">
        <nav className="navbar navbar-expand-lg bg-body-tertiary mb-4">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">Table des valeurs </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">Accueil</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link active" to="/product/create">Ajouter un élément</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Success message placeholder - you would implement this with state/context */}
        {/* <div className="alert alert-success" v-if="status">
          {status}
        </div> */}

        <Routes>
          <Route path="/product/create" element={<CreateProduct />} />
          <Route path="/product/edit/:id" element={<EditProduct />} />
          <Route path="/" element={<ProductList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;