
import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import sequelize, { connectDB } from './config/db.js'
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';


//initialize express
const app = express()

//middlewares
app.use(cors())
app.use(express.json())

//connect to MySQL
connectDB()

//sync models (creates tables based on your models)
sequelize.sync()
  .then(() => console.log('✅ All models synced'))
  .catch((err) => console.error('❌ Sync failed:', err))

//routes
app.get('/', (req, res) => {
    res.send("API Working")
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.post('/webhooks',clerkWebhooks)

//port
const PORT = process.env.PORT || 5000
Sentry.setupExpressErrorHandler(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})