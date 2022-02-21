import "./App.css";
import { HomePage } from "./components/Home";
import { Routes, Route } from "react-router-dom";
import { DetailsPage } from "./components/detailsPage";
import { SingleItem } from "./components/singlePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<HomePage />}></Route>
        <Route path={"/search"} element={<DetailsPage />}></Route>
        <Route path="/page/:id" element={<SingleItem />}></Route>
      </Routes>
    </div>
  );
}

export default App;
