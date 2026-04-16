import { useEffect, useState , useCallback} from 'react'

//funzione di debounce generica 
function debounce (callback, delay) {
  let timer;
  return(value) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(value);
    }, delay); 
  }
}


function App() {

  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  //la chiamata non parte subito ma dopo 500ms
  const loadProducts = useCallback(debounce(async (search) => {
    // se stringa vuota ritorna array vuoto
    if (!search.trim()) {
      setSuggestions([]);
      return;
    }

    //test per chaiamta api ad ogni pressione del tasto 
    console.log("Chiamata API con search =", search);

    try{
    const result = await fetch(`http://localhost:3333/products?search=${search}`);
    const data = await result.json();
    setSuggestions(data);
    }catch(error){
      console.error(error); 
    }
  },500), []);


 
  //effettua la chiamata ogni volta che cambia la query
  useEffect(() => {
    loadProducts(search);
  }, [search]);

  
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
