import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import { loggedIn } from "@/features/auth/authSlice";
import { useState } from "react";
import LoginModal from "@/features/auth/LoginModal";

export default function ProtectedRoute() {
  const authenticated = useAppSelector(loggedIn);
  const [open, setOpen] = useState<boolean>(true);

  if (authenticated === undefined) return null;

  if (authenticated === false) {
    return <LoginModal open={open} onClose={() => setOpen(false)} />;
  }

  return <Outlet />;
}
