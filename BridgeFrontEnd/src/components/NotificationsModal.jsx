import { useMutation, useQuery, useQueryClient } from "react-query";
import { Modal } from "./Modal";
import {
  acceptBuilder,
  denyBuilder,
  getMyNofiticacions,
} from "../services/builders";
import { useAuthContext } from "../context/AuthContext";
import { queryConfig } from "../utils/queryConfig";
import toast from "react-hot-toast";

export const NotificationsModal = ({ isOpen, setIsOpen, cardRef }) => {
  const { authUser } = useAuthContext();
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useQuery(
    "myNotifications" + authUser.email,
    getMyNofiticacions,
    queryConfig
  );
  console.log(notifications);
  const acceptMutation = useMutation(acceptBuilder, {
    onSuccess: () => {
      toast.success("Invitacion aceptada correctamente");
      queryClient.invalidateQueries("myNotifications" + authUser.email);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const rejectMutation = useMutation(denyBuilder, {
    onSuccess: () => {
      toast.success("Invitacion rechazada correctamente");
      queryClient.invalidateQueries("myNotifications" + authUser.email);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const handleAccept = (username) => {
    acceptMutation.mutate({ username });
  };

  const handleDelete = (username) => {
    rejectMutation.mutate({ username });
  };

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      cardRef={cardRef}
      title={"Notificaciones"}
    >
      {isLoading && "Cargando..."}
      {!isLoading && notifications.length === 0 && (
        <h2 className="text-center p-8 text-2xl text-gray-500/80">
          No tienes notificaciones
        </h2>
      )}
      {!isLoading && notifications.length > 0 && console.log(notifications)}
    </Modal>
  );
};
