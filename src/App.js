import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Dashboard from './components/Dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Products from './components/Products';
import EditProduct from './components/EditProduct';
import CreateProduct from './components/CreateProduct';

function App() {
  return (
    <>
      <Router>
        <div id="wrapper">
          <Sidebar />
          <div id="content-wrapper" className="d-flex flex-column">
            <div id="content">
              <Topbar />
              <div className="container-fluid">
                <Switch>
                  <Route path="/" component={Dashboard} exact={true} />
                  <Route path="/products" component={Products} exact={true} />
                  <Route path="/create-product" component={CreateProduct} exact={true} />
                  <Route path="/edit-product/:id" component={EditProduct} exact={true} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
