import moment from "moment";

const LockScreenClock = () => {
  const now = moment();
  const dateStr = now.format("ddd D MMM");
  const timeStr = now.format("H:mm");

  return (
    <div className="flex flex-col items-center text-white">
      <h2 className="text-2xl font-semibold tracking-wide text-gray-100 opacity-70 drop-shadow-2xl mb-2">
        {dateStr}
      </h2>

      <h1 className="text-[6rem] leading-none font-bold tracking-tighter drop-shadow-3xl opacity-50 text-white">
        {timeStr}
      </h1>
    </div>
  );
};

export default LockScreenClock;
