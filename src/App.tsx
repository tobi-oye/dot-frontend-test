import './App.css';
import Ballot from './Components/Ballot/Ballot';

function App() {
  // Feel free to remove the contents of the header tag to make more room for your code
  return (
    <div className="App">
      <header className="App-header">
        <img src={'https://via.placeholder.com/150'} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
      </header>
      <Ballot />
    </div>
  );
}

export default App;
