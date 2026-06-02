import { useEffect } from "react";

import { keepAlive } from "../api/keepAlive";

// Pings the backend on mount to prevent cold starts
function KeepAlive() {
  useEffect(() => {
    keepAlive();
  }, []);

  return null;
}

export default KeepAlive;
