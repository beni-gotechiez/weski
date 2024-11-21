import React from "react";
import dayjs from "dayjs";
import "./hotels.scss";
import { useHotels } from "../../contexts/HotelsContext";
import { Hotel as HotelType } from "../../types";
import { resorts } from "../../utils/index"

interface HotelProps extends Partial<HotelType> {
	resort: string;
	days: number;
	guests: number;
}


const Hotel: React.FC = ({
	resort,
	days,
	guests,
	name,
	images,
	rating,
	priceAfterTax,
}: HotelProps) => {
  const primaryImage = images.find((image) => image.isPrimary);
  const stars = new Array(rating).fill(0);
  const price = priceAfterTax / days / guests;
  
  
	return (
	  <div className="hotel">
		<img className="hotel-image" src={primaryImage.url}  alt={name}/>
		<div className="hotel-info">
			<span className="hotel-name">{name}</span>
			{stars.map((_, index) => (
				<span key={index}>⭐</span>
			))}
			📍{resort}
			
			<hr className="hotel-divider"/>
			<div className="hotel-price">
				{price && <span className="hotel-price-value"> £{price.toFixed(2)}</span>}&nbsp;
				<span className="per-person-text">
					/per persone
					</span>
			</div>
		</div>
	  </div>
	);
  };

const Hotels: React.FC = () => {
  const { hotels, searchParams, loading } = useHotels();
  const {name: resort} = resorts.find(resort => resort.id === searchParams?.location) || {};
  const {startDate, endDate, guests} = searchParams || {};
  const startDateObj = dayjs.unix(startDate);
  const endDateObj = dayjs.unix(endDate);
  const days = endDateObj.diff(startDateObj, "days");



  return (
    <div className="hotels">
	  {
		loading ?
			(<div>Loading...</div>) :
			(
				<>
					{!hotels.length ? <div>No hotels found</div> : (
						<div>
							<span className="hotels-search-title">
								Select your ski trip
							</span>
							<div className="hotels-search-info">{hotels.length} ski trip options | {resort} | {startDateObj.format("MMM D")} - {endDateObj.format("MMM D")} | {guests} people</div>
						</div>	
					)}
					{hotels.map((hotel) => (
					<Hotel key={hotel.code} {...hotel} resort={resort} days={days} guests={guests} />
					))}
				</>
			)
	}
    </div>
  );
};

export default Hotels;
