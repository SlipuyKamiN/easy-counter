import { Route, Routes } from "react-router-dom";
import DashboardPage from "../DashboardPage/DashboardPage";
import CounterPage from "../CounterPage/CounterPage";
import SharedLayout from "../SharedLayout/SharedLayout";
import CounterListPage from "../CounterPage/CounterListPage";

export const App = () => {
  return (
    <Routes>
      <Route path=":user" element={<SharedLayout />}>
        <Route index element={<CounterListPage />} />
        <Route path="counters/:addressID" element={<CounterPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="*" element={<div>Not found</div>} />
      </Route>
    </Routes>
  );
};

export default App;
