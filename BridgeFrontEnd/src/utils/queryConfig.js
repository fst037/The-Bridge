import toast from "react-hot-toast";

export const queryConfig = {
  retry: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  refetchIntervalInBackground: false,
  refetchInterval: false,
  onError: (error) => toast.error(error.message),
};
