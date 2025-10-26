import { Route, Routes } from "react-router-dom";
import DashboardPage from "../DashboardPage/DashboardPage";
import CounterPage from "../CounterPage/CounterPage";
import SharedLayout from "../SharedLayout/SharedLayout";
import CounterListPage from "../CounterPage/CounterListPage";

export const App = () => {
  return (
    <Routes>
      <Route path="/:user/" element={<SharedLayout />}>
        <Route path="counters" element={<CounterListPage />}></Route>
        <Route path="counters/:addressID" element={<CounterPage />}></Route>
        <Route path="dashboard" element={<DashboardPage />}></Route>
      </Route>
      <Route path="*" errorElement={<CounterListPage />} />
    </Routes>
  );
};

export default App;
