import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { User } from "@/types";
import { useSession } from "@/auth/authClient";

export function useUpdateUser() {
  const {refetch} = useSession()

  return useMutation({
    mutationFn: (data: User) => api.user.update(data),
    onSuccess: () => {
      refetch()
    },
  });
}
