import { BrowserRouter, Routes, Route } from "react-router-dom";
import PosOrder from "./pages/PosOrder";
import OrderHistory from './pages/OrderHistory';
import '../src/assets/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
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
        <Route exact path="/order-history" element={<OrderHistory />} />
      </Routes>
      </BrowserRouter>
  </div>
  )
}

export default App
