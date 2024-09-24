import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../assets/css/SearchBar.css'; 

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      // Redirigir a la página de resultados de búsqueda
      navigate(`/search?query=${searchTerm}`);
      setSearchTerm(''); // Limpiar el campo de búsqueda después de enviar
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">
        <i className="fa-solid fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;



