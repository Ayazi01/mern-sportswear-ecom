import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Cart from "./Cart";
import styled from "styled-components";

function App() {
  return (
    <div>
      <Router>
        <div>
          <NavBar />
          <ContentWrapper>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
            </Switch>
            <div>
              <Img src="team_the_smallest_mvp.png" alt="team logo" />
            </div>
          </ContentWrapper>
        </div>
      </Router>
    </div>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  max-width: 1400px;
  margin: auto;
`

const Img = styled.img` 
width: 100%;
position: sticky;
top: 0;
`

export default App;
