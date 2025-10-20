import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';

const CalendarPage = () => {
  const [date, setDate] = useState(new Date());

  const handleChange = (newDate) => {
    setDate(newDate);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Mi Calendario</h1>
      <Calendar
        onChange={handleChange}
        value={date}
      />
      <div className="mt-4">
        <p>Fecha seleccionada: {date.toDateString()}</p>
      </div>
    </div>
  );
};

export default CalendarPage;
