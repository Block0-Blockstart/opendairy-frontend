import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { CssBaseline, ThemeProvider } from '@mui/material';

import { ForgotPass, Login, RequireLoggedIn, RequireNotLoggedIn, Signup } from './components/Auth';
import { RequireEthAddress } from './components/Auth/RequireEthAddress/RequireEthAddress';
import { Auctions, DashboardIndex, DashboardLayout, Offers, Rfp } from './components/Dashboard';
import { Documents, DocumentsIndex, DocumentsLayout } from './components/Documents';
import { Home } from './components/Home/';
import { Error404 } from './components/HttpErrors/Error404';
import { LayoutContainer } from './components/Layout';
import { Test } from './components/Test/Test';
import { UserProvider } from './hooks/useUser';
import { openDairyTheme } from './mui-settings/theme';

function App() {
  return (
    <ThemeProvider theme={openDairyTheme}>
      <CssBaseline />
      <LayoutContainer>
        <BrowserRouter>
          <UserProvider>
            <Routes>
              <Route path="/test" element={<Test />} />
              <Route
                path="/"
                element={
                  <RequireNotLoggedIn>
                    <Home />
                  </RequireNotLoggedIn>
                }
              />
              <Route
                path="/login"
                element={
                  <RequireNotLoggedIn>
                    <Login />
                  </RequireNotLoggedIn>
                }
              />
              <Route
                path="/signup"
                element={
                  <RequireNotLoggedIn>
                    <Signup />
                  </RequireNotLoggedIn>
                }
              />
              <Route
                path="/forgot-pass"
                element={
                  <RequireNotLoggedIn>
                    <ForgotPass />
                  </RequireNotLoggedIn>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireLoggedIn>
                    <DashboardLayout />
                  </RequireLoggedIn>
                }>
                <Route index element={<DashboardIndex />} />
                <Route path="offers" element={<Offers />} />
                <Route path="auctions" element={<Auctions />} />
                <Route path="rfp" element={<Rfp />} />
              </Route>
              <Route
                path="/documents"
                element={
                  <RequireLoggedIn>
                    <DocumentsLayout />
                  </RequireLoggedIn>
                }>
                <Route index element={<DocumentsIndex />} />
                <Route
                  path=":dealId"
                  element={
                    <RequireEthAddress>
                      <Documents />
                    </RequireEthAddress>
                  }
                />
              </Route>
              <Route path="*" element={<Error404 />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </LayoutContainer>
    </ThemeProvider>
  );
}

export default App;
