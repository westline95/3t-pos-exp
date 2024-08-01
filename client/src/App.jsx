import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PosOrder from "./pages/PosOrder";
import '../src/assets/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const endpoint = `https://threet-pos-exp.onrender.com/sub-category/write`;
  const fetchProdCat = async () => {
    const resp = await fetch(endpoint);
    const data = await resp.json();
    console.log(data)
  }


  return (
  //  <>
  //   <h1>TESTING</h1>
  //   {/* console.log(categories) */}
  //   {categories?.data?.map((category) => {
  //     return (
  //       <div key={category.id}>
  //         <p>{category.category}</p>
  //       </div>
  //     )
  //   })}
  //  </>
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<PosOrder />} />
      </Routes>
      </BrowserRouter>
  </div>
  )
}

export default App
