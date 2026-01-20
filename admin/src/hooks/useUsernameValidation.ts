import { useState, useEffect } from "react";
import { useDebounce } from "./useDebounce";

interface UseUsernameValidationOptions {
  debounceMs?: number;
  apiUrl?: string;
}

export function useUsernameValidation(
  username: string,
  options: UseUsernameValidationOptions = {},
) {
  const {
    debounceMs = 500,
    apiUrl = `${import.meta.env.VITE_API_BASE_URL}/check-username`,
  } = options;

  const [usernameError, setUsernameError] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const debouncedUsername = useDebounce(username, debounceMs);

  useEffect(() => {
    if (username !== debouncedUsername && username.length >= 1) {
      setIsCheckingUsername(true);
    }
  }, [username, debouncedUsername]);

  useEffect(() => {
    if (debouncedUsername) {
      checkUsername(debouncedUsername);
    } else {
      setIsCheckingUsername(false);
      setUsernameError("");
    }
  }, [debouncedUsername]);

  const checkUsername = async (username: string) => {
    setIsCheckingUsername(true);

    if (username.length < 1) {
      setUsernameError("");
      setIsCheckingUsername(false);
      return;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      setUsernameError("Username can contain only letters, numbers and _");
      setIsCheckingUsername(false);
      return;
    }

    setUsernameError("");

    try {
      const res = await fetch(`${apiUrl}?username=${username}`);
      const { exists, message } = await res.json();

      if (res.status === 409 && exists) {
        setUsernameError(message);
      } else if (res.status === 200 && !exists) {
        setUsernameError("");
      } else if (res.status === 400) {
        setUsernameError(message);
      } else {
        throw new Error(message);
      }
    } catch (e) {
      setUsernameError("Error checking username");
    } finally {
      setIsCheckingUsername(false);
    }
  };

  return {
    usernameError,
    isCheckingUsername,
    isValid:
      !usernameError && username.length > 0 && debouncedUsername === username,
  };
}
