import { Route, Routes } from "react-router-dom";
import DashboardPage from "../DashboardPage/DashboardPage";
import CounterPage from "../CounterPage/CounterPage";
import DataPage from "../DataPage/DataPage";
import SharedLayout from "../SharedLayout/SharedLayout";
import CounterListPage from "../CounterPage/CounterListPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<DashboardPage />}></Route>
        <Route path="counterList" element={<CounterListPage />}></Route>
        <Route path="counter/:addressID" element={<CounterPage />}></Route>
        <Route path="data" element={<DataPage />}></Route>
        <Route path="404" element={<div>404</div>} />
      </Route>
    </Routes>
  );
};

export default App;
