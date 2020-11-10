import './App.css';
import Main from './Components/Main'
import Login from './Components/Login'

function App() { 

  const accessToken = localStorage.getItem('token')
  
  return (
    <div className="App">
     
     {
        accessToken ?
        <Main />
         :
        <Login /> 
      }
 
    </div>
  );
}

export default App;
