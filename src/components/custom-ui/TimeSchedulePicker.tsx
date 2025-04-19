import React, { useEffect, useState } from "react";
import TimePicker from "./TimePicker";
import { TPeriod, TTime } from "@/types";

type TimeSchedulePickerProps = {
  value: TTime | null;
  onChange: (val: TTime) => void;
};
function TimeSchedulePicker({ value, onChange }: TimeSchedulePickerProps) {
  const [hour, setHour] = useState(value?.hour || "0");
  const [minute, setMinute] = useState(value?.minute || "0");
  const [period, setPeriod] = useState<TPeriod>(value?.period || "AM");

  useEffect(() => {
    onChange({ hour, minute, period });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute, period]);
  return (
    <div>
      <TimePicker
        hour={hour}
        minute={minute}
        setHour={setHour}
        setMinute={setMinute}
        period={period}
        setPeriod={setPeriod}
      />
    </div>
  );
}

export default TimeSchedulePicker;
