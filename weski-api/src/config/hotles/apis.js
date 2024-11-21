import dayjs from "dayjs";

const hotelApis = {
  weski: {
    name: "WeSki API",
    url: "https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator",
    method: "post",
    reqDataConvertion: (params) => {
      return {
        query: {
          ski_site: +params.location,
          from_date: dayjs.unix(params.startDate).format("MM/DD/YYYY"),
          to_date: dayjs.unix(params.endDate).format("MM/DD/YYYY"),
          group_size: params.guests,
        },
      };
    },
    resDataConvertion: (data) => {
      return {
		hotels: data.body.accommodations.map((hotel) => ({
			code: hotel.HotelCode,
			name: hotel.HotelName,
			images: hotel.HotelDescriptiveContent.Images.map((image) => {
				return {
					url: image.URL,
					isPrimary: image.MainImage === "True",
				}
			}),
			location: { lat: hotel.HotelInfo.Position.Latitude, lng: hotel.HotelInfo.Position.Longitude },
			pointsOfInterest: hotel.HotelInfo.Position.Distances.map((point) => ({
				name: point.type,
				distance: point.distance
			})),
			rating: hotel.HotelInfo.Rating,
			beds: hotel.HotelInfo.Beds,
			priceBeforeTax: hotel.PricesInfo.AmountBeforeTax,
			priceAfterTax: hotel.PricesInfo.AmountAfterTax,
		}))
	};
    },
  },
};

export default hotelApis;
