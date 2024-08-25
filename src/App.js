import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState({});
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    document.title = "21BCE11053";
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResponse({});
  
    try {
      console.log("Submitting:", jsonInput);
  
      const parsedInput = JSON.parse(jsonInput);
      console.log("Parsed Input:", parsedInput);
  
      if (!parsedInput.data) throw new Error("Invalid JSON structure");
  
      const res = await axios.post("https://bajaj-backend-f195.onrender.com/bfhl", parsedInput);
      console.log("Response:", res.data);
  
      setResponse(res.data);
    } catch (err) {
      console.error("Error:", err);
      setError("Invalid JSON input or server error");
    }
  };

  const handleFilterChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setFilters(value);
  };

  const renderFilteredResponse = () => {
    return (
      <div>
        {filters.includes("Numbers") && (
          <div>Numbers: {response.numbers?.join(",")}</div>
        )}
        {filters.includes("Alphabets") && (
          <div>Alphabets: {response.alphabets?.join(",")}</div>
        )}
        {filters.includes("Highest lowercase alphabet") && (
          <div>
            Highest lowercase alphabet: {response.highest_lowercase_alphabet?.join(",")}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>JSON Input Form </h1>
    <p>My backend is deployed on render free instance so it may take time to start </p>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='{"data": ["A","1","b"]}'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {response && Object.keys(response).length > 0 && (
        <div>
          <label>Multi Filter</label>
          <select multiple={true} onChange={handleFilterChange}>
            <option value="Numbers">Numbers</option>
            <option value="Alphabets">Alphabets</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          <h3>Filtered Response</h3>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
