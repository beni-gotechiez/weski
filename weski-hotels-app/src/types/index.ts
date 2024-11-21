interface Image {
	url: string;
	isPrimary: boolean;
}

interface Location {
	lat: number;
	lng: number;
}

interface pointsOfInterest {
	name: string;
	distance: number;
}

interface Hotel {
	code: string;
	name: string;
	images: Image[];
	location: Location;
	pointsOfInterest: pointsOfInterest[];
	rating: number;
	beds: number;
	priceBeforeTax: number;
	priceAfterTax: number;
  }

  interface SearchParams {
	location: number;
	startDate: number;
	endDate: number;
	guests: number;
  }
  

export { Image, Location, pointsOfInterest, Hotel, SearchParams };