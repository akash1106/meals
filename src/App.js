import './App.css';
import { useGlobalContext } from './context';
import Search from './components/Search';
import Meals from './components/Meals';
import Favorites from './components/Favorites';
import Models from './components/Models';

function App() {
  const {showModel,favorite}=useGlobalContext()
  return (
    <div className="App">
      <Search/>
      {favorite.length>0 && <Favorites/>}
      <Meals/>
      {showModel && <Models/>}
    </div>
  );
}

export default App;
