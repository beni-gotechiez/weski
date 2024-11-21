import React, { useState } from "react";
import "./search-form.scss";
import ResortsSelect from "./resorts-select/resorts-select";
import GuestsSelect from "./guests-select/guests-select";
import SearchButton from "./search-button/search-button";
import DatePicker from "react-datepicker";
import dayjs from "dayjs";
import { useHotels } from "../../contexts/HotelsContext";

const SearchForm: React.FC = () => {
	const [location, setLocation] = useState<number>(1);
	const [startDate, setStartDate] = useState<Date | null>(dayjs().toDate());
	const [endDate, setEndDate] = useState<Date | null>(dayjs().add(7, "days").toDate());
	const [guests, setGuests] = useState<number>(2);

  const { fetchAndSetHotels } = useHotels();

  const handleSearch = async () => {
    await fetchAndSetHotels({location, startDate: dayjs(startDate).unix(), endDate: dayjs(endDate).unix(), guests});
  };

  return (
    <div className="search-form">
      <ResortsSelect value={location} onChange={setLocation} />
	  <GuestsSelect value={guests} onChange={setGuests} />
      <DatePicker className="search-form-date-picker" selected={startDate} onChange={setStartDate} enableTabLoop={false} />
	  <DatePicker className="search-form-date-picker" selected={endDate} onChange={setEndDate} enableTabLoop={false} />
      <SearchButton onClick={handleSearch} />
    </div>
  );
};

export default SearchForm;
