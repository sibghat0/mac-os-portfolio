import moment from "moment";
import backgroundImage from "../assets/images/lockScreen/Late.jpg";

export default function LockScreen() {
  const formattedDate = moment().format("ddd D MMM h:mm A");
  return (
    <div className="h-full w-full">
      <img
        src={backgroundImage}
        alt="Background"
        className="absolute opacity-60 w-screen h-screen object-cover"
      />
      <div className="pt-4">
        <h3>{formattedDate}</h3>
      </div>
    </div>
  );
}
