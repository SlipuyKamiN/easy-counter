import { Route, Routes } from "react-router-dom";
import DashboardPage from "../DashboardPage/DashboardPage";
import CounterPage from "../CounterPage/CounterPage";
import SharedLayout from "../SharedLayout/SharedLayout";
import CounterListPage from "../CounterPage/CounterListPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<CounterListPage />}></Route>
        <Route path="dashboard" element={<DashboardPage />}></Route>
        <Route path="counter/:addressID" element={<CounterPage />}></Route>
        <Route path="404" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default App;
