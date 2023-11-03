import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import { AppComparer } from './screens/appcomparer';


// console.log(obj);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppComparer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
