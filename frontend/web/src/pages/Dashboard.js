// frontend\web\src\pages\Dashboard.js
import React, { useEffect, useState, useContext } from 'react';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../App.css';

export default function Dashboard() {
  const { logout, user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado da busca
  
  // Estados modais
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', description: '', photoUrl: '' });
  const [movementData, setMovementData] = useState({ productId: '', type: 'IN', quantity: 0 });
  const [showMoveModal, setShowMoveModal] = useState(false);

  useEffect(() => { loadProducts(); }, []);

  async function loadProducts() {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
    } catch (error) { console.error(error); }
  }

  // Lógica de Filtro (Busca)
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => { setNewProduct({ ...newProduct, photoUrl: reader.result }); };
    if(file) reader.readAsDataURL(file);
  };

  async function handleAddProduct(e) {
    e.preventDefault();
    try {
      await api.post('/products', newProduct);
      setShowAddModal(false);
      setNewProduct({ name: '', description: '', photoUrl: '' });
      loadProducts();
    } catch (error) { alert('Erro ao cadastrar'); }
  }

  function openMovementModal(product, type) {
    setMovementData({ productId: product.id, productName: product.name, type: type, quantity: 1 });
    setShowMoveModal(true);
  }

  async function handleMovement(e) {
    e.preventDefault();
    try {
      await api.post('/movements', {
        productId: movementData.productId,
        type: movementData.type,
        quantity: movementData.quantity
      });
      setShowMoveModal(false);
      loadProducts();
    } catch (error) { alert('Erro na movimentação'); }
  }

  async function handleDelete(id) {
    if(window.confirm("Deseja realmente excluir este item?")) {
      await api.delete(`/products/${id}`);
      loadProducts();
    }
  }

  return (
    <div className="dashboard">
      <header>
        <h1>ProEPI <span style={{fontWeight: 300, opacity: 0.8}}>Manager</span></h1>
        <div className="user-info">
          <span>{user?.email}</span>
          <button onClick={logout} className="logout-btn">Sair</button>
        </div>
      </header>

      {/* Barra de Ações com Busca */}
      <div className="actions">
        <input 
          type="text" 
          placeholder="🔍 Buscar EPI..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="add-btn" onClick={() => setShowAddModal(true)}>+ Novo Item</button>
      </div>

      <div className="grid-products">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(p => (
            <div key={p.id} className="card">
              <img src={p.photoUrl || 'https://placehold.co/400x300/e2e8f0/64748b?text=Sem+Foto'} alt={p.name} />
              <div className="card-content">
                <h3>{p.name}</h3>
                <p className="desc">{p.description || 'Sem descrição definida.'}</p>
                
                <div className="stock-info">
                  <span>Estoque Atual</span>
                  <span className={`stock-value ${p.currentStock < 10 ? 'low' : ''}`}>
                    {p.currentStock}
                  </span>
                </div>

                <div className="card-actions">
                  <button className="btn-icon btn-in" onClick={() => openMovementModal(p, 'IN')}>Entrada</button>
                  <button className="btn-icon btn-out" onClick={() => openMovementModal(p, 'OUT')}>Saída</button>
                </div>
                <button className="btn-del" onClick={() => handleDelete(p.id)}>Remover item</button>
              </div>
            </div>
          ))
        ) : (
          <div className="no-results">
            <p>Nenhum EPI encontrado com o nome "<strong>{searchTerm}</strong>".</p>
          </div>
        )}
      </div>

      {/* Os Modais continuam iguais */}
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Novo EPI</h2>
            <form onSubmit={handleAddProduct}>
              <label>Nome do Produto</label>
              <input value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
              <label>Descrição</label>
              <input value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
              <label>Foto do Produto</label>
              <input type="file" onChange={handleImageUpload} required />
              <div className="modal-buttons">
                <button type="button" className="btn-cancel" onClick={() => setShowAddModal(false)}>Cancelar</button>
                <button type="submit" className="btn-confirm">Salvar Produto</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showMoveModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Registrar {movementData.type === 'IN' ? 'Entrada' : 'Saída'}</h2>
            <p style={{color: '#64748b', marginBottom: '15px'}}>Item: <strong>{movementData.productName}</strong></p>
            <form onSubmit={handleMovement}>
              <label>Quantidade</label>
              <input type="number" min="1" value={movementData.quantity} onChange={e => setMovementData({...movementData, quantity: e.target.value})} required autoFocus />
              <div className="modal-buttons">
                <button type="button" className="btn-cancel" onClick={() => setShowMoveModal(false)}>Cancelar</button>
                <button type="submit" className="btn-confirm">Confirmar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}