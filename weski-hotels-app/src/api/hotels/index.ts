import { Hotel, SearchParams } from "../../types";
  const fetchHotels = (searchParams: SearchParams, onmessage: (hotels: Hotel[]) => void): void => {
	const queryString = new URLSearchParams(searchParams).toString();
	  const eventSourceUrl = `http://localhost:8080/hotels/search?${queryString}`;
  
	  const eventSource = new EventSource(eventSourceUrl);

	  eventSource.onmessage = (event) => {
		try {
			const {hotels}: Hotel[] = JSON.parse(event.data);
			onmessage(hotels);
			console.log("Received hotels:", hotels);
		  } catch (error) {
			console.error("Error parsing hotels data:", error);
		  }
	  };
  
  
	  // Handle error events
	  eventSource.addEventListener("error", (event) => {
		console.error("Error receiving SSE data:", event);
		eventSource.close();
		reject(new Error("Failed to fetch hotels via SSE."));
	  });
  
	  // Listen for the "end" event to know when the stream is complete
	  eventSource.addEventListener("end", () => {
		console.log("SSE stream ended.");
		eventSource.close(); // Close the SSE connection
	  });

	  return;
  };
  
  export { fetchHotels };
  