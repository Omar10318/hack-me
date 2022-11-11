import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import Sidebar from './components/Sidebar';
import NavigationItems from './components/NavigationItems';

import store from './redux/store';

function App() {
  return (<Provider store={store}>
      <div className="App">
        <BrowserRouter>
          <Sidebar></Sidebar>
          <Routes>
            <Route path='/' element={NavigationItems.find(e => e.isMain)!.component}/>
            {
              NavigationItems.map((e, i) => (
                <Route path={e.route} element={e.component} key={i}/>
              ))
            }
          </Routes>
        </BrowserRouter>
      </div>
  </Provider>
  );
}

export default App;
