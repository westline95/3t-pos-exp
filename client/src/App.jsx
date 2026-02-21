import { BrowserRouter, Routes, Route } from "react-router-dom";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Missing from "./pages/Missing";
import PosOrder from "./pages/PosOrder";
import OrderHistory from './pages/OrderHistory';
import '../src/assets/scss/style.scss';
import 'bootstrap/dist/css/bootstrap.min.css';


const roleList = {
    admin: "admin",
    staff: "staff",
    courier: "courier"
};

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
        <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />  
        <Route element={<PersistLogin />}>

          <Route element={<RequireAuth allowedRoles={[roleList.admin, roleList.staff]} />}>
            <Route path="/" element={<PosOrder />} />
          </Route>
          <Route element={<RequireAuth allowedRoles={[roleList.admin, roleList.staff]} />}>
            <Route path="/order-history" element={<OrderHistory />} />
          </Route>
        </Route>

          {/* catch all */}
          <Route path="*" element={<Missing />} /> 
          </Route> 
      </Routes>
      </BrowserRouter>
  </div>
  )
}

export default App
