import './App.css';
import { useGlobalContext } from './context';
import Search from './components/Search';
import Meals from './components/Meals';
import Favorites from './components/Favorites';
import Models from './components/Models';

function App() {
  const {showModel}=useGlobalContext()
  return (
    <div className="App">
      <Search/>
      {/* <Favorites/> */}
      <Meals/>
      {showModel && <Models/>}
    </div>
  );
}

export default App;
