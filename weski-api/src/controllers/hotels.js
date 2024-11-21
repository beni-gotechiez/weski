import hotelService from "../services/hotels.js";

async function searchHotels(req, res) {
  try {
    const searchParams = req.query;
    const hotelPromises = hotelService.searchHotels(searchParams);

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    hotelPromises.forEach((hotelPromise) => {
      hotelPromise
        .then(async (hotel) => {
          res.write(`data: ${JSON.stringify(hotel)}\n\n`);
        })
        .catch((error) => {
          console.error("searchHotels: Error resolving hotel promise", {
            error,
          });
          res.write(
            `event: error\ndata: ${JSON.stringify({
              status: "error",
              message: error.message || "Error fetching a hotel",
            })}\n\n`
          );
        });
    });

    
    Promise.allSettled(hotelPromises).then(() => {
      res.write("event: end\ndata:{}\n\n");
      res.end();
    });
  } catch (error) {
    console.error("searchHotels: Failed to fetch hotels", { error });
    res.status(error.status || 500).json({
      status: "error",
      message: error.message || "Failed to fetch hotels",
    });
  }
}

export default {
  searchHotels,
};
