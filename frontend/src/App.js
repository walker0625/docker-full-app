import React, {useState, useEffect} from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  
  useEffect(() => {
    axios.get('/api/values')
      .then(response => {
        console.log(response);
        setLists(response.data);
      });
  }, []);

  const [lists, setLists] = useState([]);
  const [value, setValue] = useState("");

  const changeHandler = (event) => {
    setValue(event.currentTarget.value)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    
    axios.post('/api/value', {value: value})
      .then(response => {
        if (response.data.success) {
          console.log(response);
          setLists([...lists, response.data]);
          setValue("");
        } else {
          alert("DB insert fail");
        }
      })
  }

  const deleteHandler = (event) => {
    axios.delete('/api/values')
      .then(response => {
        console.log(response);
        setLists([]);
      });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <div className="container">

          {lists && lists.map((list, index) => (
            <li key={index}>{list.value}</li>
          ))}

          <form className="example" onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="write text"
              onChange={changeHandler}
              value={value}
            />
            <button type="submit">save</button>
          </form>
        </div>
        <div className="btn-container">
          <button type="button" className="btn-delete" background="#F5330A" onClick={deleteHandler}>delete All</button>
        </div>
      </header>
    </div>
  );
}

export default App;
