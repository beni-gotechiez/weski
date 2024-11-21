import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import hotelsRoutes from './api-routes/hotels.js';

const app = express();

app.use(cors({
	origin: "http://localhost:5173", // Replace with your frontend's URL
	methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
	allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
  }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// Express routes
app.use('/hotels', hotelsRoutes);

app.get('/_health', (req, res) => {
	res.status(200).send('OK');
});

const PORT = process.env.PORT || 8080;

const startServer = async () => {
	const server = app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
};

startServer();
