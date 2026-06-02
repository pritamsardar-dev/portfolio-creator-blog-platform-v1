import clsx from "clsx";
import { useDispatch } from "react-redux";

import authService from "../../appwrite/auth";
import { logout } from "../../store/authSlice";
import LogoutCircularLineIcon from "../../assets/icons/LogoutCircularLineIcon";

function LogoutBtn({ className = "", onClick }) {
  const dispatch = useDispatch();

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout());

      if (onClick) {
        onClick();
      }
    });
  };

  return (
    <button
      onClick={logoutHandler}
      className={clsx(
        "inline-flex items-center justify-center gap-2",
        "cursor-pointer rounded-xl px-4 py-2",
        "text-sm font-medium",
        "text-[var(--color-text-muted)]",
        "transition-all duration-200",
        "hover:bg-[var(--color-card-hover)] hover:text-[var(--color-text)]",
        "active:scale-[0.98]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]",
        "focus:ring-offset-2 focus:ring-offset-[var(--color-bg)]",
        className,
      )}
    >
      <LogoutCircularLineIcon className="h-4 w-4" />
      <span>Logout</span>
    </button>
  );
}

export default LogoutBtn;
