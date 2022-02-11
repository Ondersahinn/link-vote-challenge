import { ReactComponent as Logo } from 'assest/img/logo.svg'
import { Provider } from "react-redux";
import store from "redux/store";
import { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { useHistory } from "react-router";
import Home from "pages/Home";
import Header from "components/header";
import NewLink from "pages/NewLink";
import NotFound from "pages/NotFound";
import "styles/global.scss";

function App(): JSX.Element {
  const hist = useHistory();
  const loadingImg = <div className="loading-img">
    <Logo />
  </div>

  return (
    <Provider store={store}>
      <div className="App">
        <Router history={hist}>
          <Switch>
            <Suspense fallback={loadingImg}>
              <Header />
              <Route path="/" extach />
              <Route exact path='/' component={Home} />
              <Route exact path='/newlink' component={NewLink} />
              <Route path="/404" component={NotFound} />
              <Redirect to="/404" />
            </Suspense>
          </Switch>
        </Router>

      </div>
    </Provider>
  );
}

export default App;
