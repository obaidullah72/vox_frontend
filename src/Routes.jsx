import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Login, Signup, ForgotPassword, Dashboard, GenerateCode, GistHistory, Profile, SavedCodes} from "./pages";
import { PrivateRoute, PublicRoute, } from "./layouts/guards";
import ErrorBoundary from "./components/ErrorBoundary.jsx";
import UserLayout from "./layouts/Layout.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          <Route element={<PrivateRoute />}>

            <Route element={<UserLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/generate" element={<GenerateCode />} />
              <Route path="/gist" element={<GistHistory />} />
              <Route path="/generate" element={<GenerateCode />} />
              <Route path="/save" element={<SavedCodes />} />
              <Route path='/profile' element={<Profile />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
