import { useQuery } from "react-query";
import { Modal } from "./Modal";
import { getMyNofiticacions } from "../services/builders";
import { useAuthContext } from "../context/AuthContext";
import { queryConfig } from "../utils/queryConfig";

export const NotificationsModal = ({ isOpen, setIsOpen, cardRef }) => {
  const { authUser } = useAuthContext();
  const { data: notifications, isLoading } = useQuery(
    "myNotifications" + authUser.email,
    getMyNofiticacions,
    queryConfig
  );

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
