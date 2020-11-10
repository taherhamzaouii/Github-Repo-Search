import './App.css';
import Main from './Components/Main'
import Login from './Components/Login'

function App() { 

  const accessToken = localStorage.getItem('token')
  
  return (
    <div className="App">
     
     {
       //verify the token is stored in local storage to redirect the user to the main component
        accessToken ?
        <Main />
         :
        <Login /> 
      }
 
    </div>
  );
}

export default App;
