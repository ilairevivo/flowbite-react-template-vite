import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
type RouteGuardProps = {
  children: ReactNode;
  isBiz?: boolean;
  isAdmin?: boolean;
  
};

const RouteGuard = (props: RouteGuardProps) => {
  const { children, isBiz, isAdmin } = props;

  const user = useAuth();
  if (!user) {
    return <Navigate to="/login" />;
  }
  if (isBiz && !user.isBusiness) {
    return <Navigate to="/register" />;
  }
    if (isAdmin && !user.isAdmin) {
        return <Navigate to="/home" />;
    }
  return <>{children}</>;
};
export default RouteGuard;
