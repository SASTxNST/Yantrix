import { AuthProvider } from "./presentation/context/AuthContext";
import { AppRoutes } from "./presentation/routes/AppRoutes";

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}