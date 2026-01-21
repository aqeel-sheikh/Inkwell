import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { User } from "@/types";
import { useNavigate } from "react-router";

export function useUpdateUser() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: User) => api.user.update(data),
    onSuccess: () => {
      navigate(0);
    },
  });
}
