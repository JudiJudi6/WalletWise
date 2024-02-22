import { useUserNotifications } from "../../hooks/useUserNotifications";
import { useUser } from "../autentication/useUser";

function Notifications() {
  const { user } = useUser();
  const { data } = useUserNotifications(user.user.id);
  console.log(data);
  return <div>Notifications</div>;
}

export default Notifications;
