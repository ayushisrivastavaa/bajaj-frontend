import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState({});
  const [filters, setFilters] = useState([]);

  useEffect(() => {
    document.title = "21BCE11353";
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
  
      const res = await axios.post("https://bajaj-backend-w9z7.onrender.com/bfhl", parsedInput);
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
      <h1>BFHL Task 1</h1>
    <p>Render may take some time to load, please wait.</p>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="4"
          cols="50"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Valid JSON format only!'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {response && Object.keys(response).length > 0 && (
       <div>
        <div>
                    <h2>Result:</h2>
                    <p>User ID: {response.user_id}</p>
                    <p>Email: {response.email}</p>
                    <p>Roll Number: {response.roll_number}</p>
                    <p>Numbers: {response.numbers.join(', ')}</p>
                    <p>Alphabets: {response.alphabets.join(', ')}</p>
                    <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>
        </div>
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
      </div>
      )}
    </div>
  );
}

export default App;
