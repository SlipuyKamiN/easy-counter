import { Route, Routes } from "react-router-dom";
import DashboardPage from "../DashboardPage/DashboardPage";
import CounterPage from "../CounterPage/CounterPage";
import SharedLayout from "../SharedLayout/SharedLayout";
import AddressesListPage from "../CounterPage/AddressesListPage";
import { EmptyPage } from "../Common/StateIndicator";

export const App = () => {
  return (
    <Routes>
      <Route path=":user" element={<SharedLayout />}>
        <Route index element={<AddressesListPage />} />
        <Route path="counters/:addressID" element={<CounterPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Route>
      <Route path="*" element={<EmptyPage />} />
    </Routes>
  );
};

export default App;
