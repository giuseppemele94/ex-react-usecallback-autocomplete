import { useEffect, useState , useMemo} from 'react'



function App() {

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const loadProducts = async (search) => {
    // se stringa vuota ritorna array vuoto
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    try{
    const result = await fetch(`http://localhost:3333/products?search=${search}`);
    const data = await result.json();
    setSuggestions(data);
    }catch(error){
      console.error(error); 
    }
  };

  //effettua la chiamata ogni volta che cambia la query
  useEffect(() => {
    loadProducts(search);
  }, [search]);

  // const filteredProducts = useMemo(() => {
  //   if (!search.trim()) return [];
  //   return suggestions;
  // }, [suggestions, search]);

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          placeholder="Cerca un prodotto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {search.trim() !== "" && suggestions.length > 0 && (
          <ul className="suggestions-dropdown">
            {suggestions.map((p) => (
              <li key={p.id}className="suggestion-item">{p.name}</li>
            ))}
          </ul>
        )}
      </div>

    </>
  )
}

export default App
