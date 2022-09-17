import express, { json, urlencoded } from "express";
import path from 'path';
import cors from "cors";
import helmet from "helmet";
import { SuccessResponse } from './common/index.js';
import morganMiddleware from "./middleware/morgan.js";
import db from "./models/index.js";
import { createAdmin } from './config/default.config.js';
import authRoutes from './routes/auth.routes.js';
import quizappRoutes from './routes/quizapp.routes.js';
const app = express();

//options for cors midddleware
const options = cors.CorsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
};

app.use(json({ limit:    '100mb' }));
app.use(urlencoded({ extended: true, limit: '100mb' }));
app.use(helmet());
app.use(morganMiddleware);

// add cors
app.use(cors(options));

// simple route
app.get("/", (request, response) => {
    SuccessResponse(response, "Quizapp server activated.");
})

// Sequelize initialization
db.sequelize.sync().then(() => {
    // creating defaults
    createAdmin();
});

app.use(express.static(path.join(__dirname, '../public')));

// Binding routes
authRoutes(app);
quizappRoutes(app);

// change timezone for app
process.env.TZ = "Africa/Lagos";

export default app;

