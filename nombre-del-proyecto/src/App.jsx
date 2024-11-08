import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [text, setText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  // Función para manejar el cambio en el input
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault(); // Evita el comportamiento por defecto del formulario
    // Filtrar productos según el texto ingresado
    const filtered = products.filter(product => 
      product.title.toLowerCase().startsWith(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((json) => {
        setProducts(json);
        setFilteredProducts(json); // Inicialmente, mostrar todos los productos
      })
      .catch((error) => {
        setError(error.message); // Establecer el mensaje de error en el estado
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []);

  return (
    <>
      <h1>Comenzando React</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type='text' 
          value={text} 
          onChange={handleInputChange} 
          placeholder="Buscar productos..." 
        />
        <button type="submit">Buscar</button>
      </form>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>} 
      <ul>
        {filteredProducts.map(product => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </>
  );
}

export default App;