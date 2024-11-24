import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Router } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import ECommerce from './pages/Dashboard/ECommerce';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';
import DefaultLayout from './layout/DefaultLayout';
import Category from './pages/Category';
import Order from './pages/Order';
import Productt from './pages/Product';
import User from './pages/User';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (

    <Routes>
      <Route
        path="/login"
        element={
          <>
            <SignIn />
          </>
        }
      />

      <Route
        path='/'
        element={
          <>
            <PageTitle title="eCommerce Dashboard " />
            <DefaultLayout>
              <ECommerce />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/category"
        element={
          <>
            <PageTitle title="Category " />
            <DefaultLayout>
              <Category />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/product"
        element={
          <>
            <PageTitle title="Product " />
            <DefaultLayout>
              <Productt />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/user"
        element={
          <>
            <PageTitle title="User " />
            <DefaultLayout>
              <User />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/order"
        element={
          <>
            <PageTitle title="Order " />
            <DefaultLayout>
              <Order />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/calendar"
        element={
          <>
            <PageTitle title="Calendar " />
            <DefaultLayout>
              <Calendar />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <PageTitle title="Profile " />
            <DefaultLayout>
              <Profile />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/forms/form-elements"
        element={
          <>
            <PageTitle title="Form Elements " />
            <DefaultLayout>
              <FormElements />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/forms/form-layout"
        element={
          <>
            <PageTitle title="Form Layout " />
            <DefaultLayout>
              <FormLayout />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/tables"
        element={
          <>
            <PageTitle title="Tables " />
            <DefaultLayout>
              <Tables />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/settings"
        element={
          <>
            <PageTitle title="Settings " />
            <DefaultLayout>
              <Settings />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/chart"
        element={
          <>
            <PageTitle title="Basic Chart " />
            <DefaultLayout>
              <Chart />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/ui/alerts"
        element={
          <>
            <PageTitle title="Alerts " />
            <DefaultLayout>
              <Alerts />
            </DefaultLayout>
          </>
        }
      />
      <Route
        path="/ui/buttons"
        element={
          <>
            <PageTitle title="Buttons " />
            <DefaultLayout>
              <Buttons />
            </DefaultLayout>
          </>
        }
      />
    </Routes>
  );
}

export default App;
