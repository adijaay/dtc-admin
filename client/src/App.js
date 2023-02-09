import logo from './logo.svg';
// import './App.css';
import {Routes, Route, HashRouter} from 'react-router-dom';
import Login from './admin/login';
import Edit from './admin/edit';
import SectionTable from './admin/sectiontable';


function App() {
  return (
    <div>
    <HashRouter basename='/' >
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/edit' element={<Edit/>}></Route>
      </Routes>
    </HashRouter>
    </div>
  );
}

export default App;
