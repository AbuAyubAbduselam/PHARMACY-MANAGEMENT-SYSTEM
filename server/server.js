import "express-async-errors";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import morgan from "morgan";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cloudinary from "cloudinary";

//routes
import drugRouter from "./routes/drugRouter.js";
import billRouter from "./routes/billRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import { updateExpiredDrugsStatus } from "./utils/updateExpiredDrugsStatus.js";
//public
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";
import cron from "node-cron";

//middleware
import errorHandlerMiddleware from "./middleware/errorHandlerMiddleware.js";
import { authenticateUser } from "./middleware/authMiddleware.js";
import Drug from "./models/drugModels.js";

app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./public")));

app.use("/api/v1/drugs", authenticateUser, drugRouter);
app.use("/api/v1/bills", authenticateUser, billRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/auth", authRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./public", "index.html"));
});

app.use("*", (req, res) => {
  res.status(404).json({ msg: "not found" });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;

const all = [
  {
    drugName: "Paracetamol",
    drugStatus: "Available",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2025-05-01",
    price: 12.99,
    quantity: 100,
    weight: 500,
    description: "Pain reliever and fever reducer.",
  },
  {
    drugName: "Ibuprofen",
    drugStatus: "Available",
    supplier: "mohammed@gmail.com",
    expiryDate: "2024-12-15",
    price: 15.49,
    quantity: 50,
    weight: 300,
    description: "Nonsteroidal anti-inflammatory drug (NSAID).",
  },
  {
    drugName: "Amoxicillin",
    drugStatus: "Available",
    supplier: "dagm@gmail.com",
    expiryDate: "2026-01-20",
    price: 25.99,
    quantity: 200,
    weight: 600,
    description: "Antibiotic used to treat bacterial infections.",
  },
  {
    drugName: "Lisinopril",
    drugStatus: "Expired",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2023-08-10",
    price: 10.0,
    quantity: 150,
    weight: 200,
    description: "ACE inhibitor used to treat high blood pressure.",
  },
  {
    drugName: "Metformin",
    drugStatus: "Out-of-stock",
    supplier: "mohammed@gmail.com",
    expiryDate: "2025-03-15",
    price: 18.75,
    quantity: 0,
    weight: 400,
    description: "Medication used to treat type 2 diabetes.",
  },
  {
    drugName: "Aspirin",
    drugStatus: "Available",
    supplier: "dagm@gmail.com",
    expiryDate: "2024-10-05",
    price: 8.99,
    quantity: 300,
    weight: 700,
    description: "Pain reliever, fever reducer, and anti-inflammatory.",
  },
  {
    drugName: "Simvastatin",
    drugStatus: "Available",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2026-02-28",
    price: 22.49,
    quantity: 80,
    weight: 500,
    description: "Medication used to control high cholesterol.",
  },
  {
    drugName: "Omeprazole",
    drugStatus: "Expired",
    supplier: "mohammed@gmail.com",
    expiryDate: "2023-12-31",
    price: 14.99,
    quantity: 120,
    weight: 200,
    description: "Proton pump inhibitor used to treat acid reflux.",
  },
  {
    drugName: "Losartan",
    drugStatus: "Available",
    supplier: "dagm@gmail.com",
    expiryDate: "2024-09-15",
    price: 16.89,
    quantity: 200,
    weight: 400,
    description: "Medication used to treat high blood pressure.",
  },
  {
    drugName: "Azithromycin",
    drugStatus: "Out-of-stock",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2025-08-25",
    price: 29.99,
    quantity: 0,
    weight: 600,
    description: "Antibiotic used to treat various bacterial infections.",
  },
  {
    drugName: "Prednisone",
    drugStatus: "Available",
    supplier: "mohammed@gmail.com",
    expiryDate: "2026-05-10",
    price: 11.99,
    quantity: 220,
    weight: 500,
    description: "Corticosteroid used to reduce inflammation.",
  },
  {
    drugName: "Levothyroxine",
    drugStatus: "Available",
    supplier: "dagm@gmail.com",
    expiryDate: "2024-11-01",
    price: 13.99,
    quantity: 250,
    weight: 300,
    description: "Medication used to treat hypothyroidism.",
  },
  {
    drugName: "Clopidogrel",
    drugStatus: "Expired",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2023-07-20",
    price: 20.0,
    quantity: 90,
    weight: 400,
    description: "Antiplatelet drug used to prevent blood clots.",
  },
  {
    drugName: "Atorvastatin",
    drugStatus: "Available",
    supplier: "mohammed@gmail.com",
    expiryDate: "2025-06-30",
    price: 24.49,
    quantity: 140,
    weight: 500,
    description: "Medication used to lower cholesterol levels.",
  },
  {
    drugName: "Amlodipine",
    drugStatus: "Out-of-stock",
    supplier: "dagm@gmail.com",
    expiryDate: "2026-03-25",
    price: 17.89,
    quantity: 0,
    weight: 300,
    description: "Calcium channel blocker used to treat high blood pressure.",
  },
  {
    drugName: "Albuterol",
    drugStatus: "Available",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2024-07-15",
    price: 15.99,
    quantity: 180,
    weight: 400,
    description: "Bronchodilator used to treat asthma.",
  },
  {
    drugName: "Ciprofloxacin",
    drugStatus: "Expired",
    supplier: "mohammed@gmail.com",
    expiryDate: "2023-11-10",
    price: 19.49,
    quantity: 60,
    weight: 200,
    description: "Antibiotic used to treat bacterial infections.",
  },
  {
    drugName: "Doxycycline",
    drugStatus: "Available",
    supplier: "dagm@gmail.com",
    expiryDate: "2026-02-10",
    price: 21.99,
    quantity: 230,
    weight: 500,
    description: "Antibiotic used to treat a variety of infections.",
  },
  {
    drugName: "Hydrochlorothiazide",
    drugStatus: "Available",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2024-04-05",
    price: 12.0,
    quantity: 170,
    weight: 400,
    description: "Diuretic used to treat high blood pressure.",
  },
  {
    drugName: "Montelukast",
    drugStatus: "Out-of-stock",
    supplier: "mohammed@gmail.com",
    expiryDate: "2025-10-15",
    price: 14.75,
    quantity: 0,
    weight: 300,
    description: "Medication used to treat allergies and asthma.",
  },
  {
    drugName: "Furosemide",
    drugStatus: "Available",
    supplier: "dagm@gmail.com",
    expiryDate: "2026-01-05",
    price: 18.5,
    quantity: 210,
    weight: 500,
    description: "Diuretic used to reduce fluid retention.",
  },
  {
    drugName: "Metoprolol",
    drugStatus: "Available",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2025-07-20",
    price: 23.49,
    quantity: 110,
    weight: 400,
    description: "Beta-blocker used to treat high blood pressure.",
  },
  {
    drugName: "Ranitidine",
    drugStatus: "Expired",
    supplier: "mohammed@gmail.com",
    expiryDate: "2023-09-25",
    price: 10.99,
    quantity: 60,
    weight: 200,
    description: "Histamine-2 blocker used to reduce stomach acid.",
  },
  {
    drugName: "Spironolactone",
    drugStatus: "Available",
    supplier: "dagm@gmail.com",
    expiryDate: "2024-12-20",
    price: 19.75,
    quantity: 130,
    weight: 500,
    description:
      "Diuretic used to treat fluid retention and high blood pressure.",
  },
  {
    drugName: "Hydrocodone",
    drugStatus: "Out-of-stock",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2025-11-10",
    price: 29.99,
    quantity: 0,
    weight: 400,
    description: "Opioid pain reliever used to treat severe pain.",
  },
  {
    drugName: "Cetirizine",
    drugStatus: "Available",
    supplier: "mohammed@gmail.com",
    expiryDate: "2026-03-05",
    price: 15.49,
    quantity: 180,
    weight: 300,
    description: "Antihistamine used to treat allergy symptoms.",
  },
  {
    drugName: "Citalopram",
    drugStatus: "Available",
    supplier: "dagm@gmail.com",
    expiryDate: "2024-08-15",
    price: 22.99,
    quantity: 100,
    weight: 500,
    description: "Antidepressant used to treat depression.",
  },
  {
    drugName: "Zolpidem",
    drugStatus: "Expired",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2023-10-05",
    price: 18.25,
    quantity: 90,
    weight: 400,
    description: "Medication used to treat insomnia.",
  },
  {
    drugName: "Clonazepam",
    drugStatus: "Available",
    supplier: "mohammed@gmail.com",
    expiryDate: "2026-06-25",
    price: 28.5,
    quantity: 70,
    weight: 500,
    description: "Medication used to treat panic disorder and seizures.",
  },
  {
    drugName: "Diazepam",
    drugStatus: "Out-of-stock",
    supplier: "dagm@gmail.com",
    expiryDate: "2025-09-10",
    price: 16.75,
    quantity: 0,
    weight: 300,
    description:
      "Medication used to treat anxiety, muscle spasms, and seizures.",
  },
  {
    drugName: "Trazodone",
    drugStatus: "Available",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2024-11-15",
    price: 19.99,
    quantity: 160,
    weight: 400,
    description: "Antidepressant used to treat major depressive disorder.",
  },
  {
    drugName: "Loratadine",
    drugStatus: "Available",
    supplier: "mohammed@gmail.com",
    expiryDate: "2025-04-05",
    price: 14.49,
    quantity: 190,
    weight: 500,
    description: "Antihistamine used to treat allergy symptoms.",
  },
  {
    drugName: "Bupropion",
    drugStatus: "Expired",
    supplier: "dagm@gmail.com",
    expiryDate: "2023-12-15",
    price: 24.75,
    quantity: 80,
    weight: 300,
    description:
      "Antidepressant used to treat major depressive disorder and smoking cessation.",
  },
  {
    drugName: "Escitalopram",
    drugStatus: "Available",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2026-07-01",
    price: 23.5,
    quantity: 110,
    weight: 400,
    description: "Antidepressant used to treat anxiety and depression.",
  },
  {
    drugName: "Fluoxetine",
    drugStatus: "Available",
    supplier: "mohammed@gmail.com",
    expiryDate: "2024-10-20",
    price: 20.99,
    quantity: 140,
    weight: 500,
    description:
      "Antidepressant used to treat depression and anxiety disorders.",
  },
  {
    drugName: "Sertraline",
    drugStatus: "Out-of-stock",
    supplier: "dagm@gmail.com",
    expiryDate: "2025-12-10",
    price: 26.49,
    quantity: 0,
    weight: 300,
    description: "Antidepressant used to treat depression, anxiety, and PTSD.",
  },
  {
    drugName: "Venlafaxine",
    drugStatus: "Available",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2024-09-05",
    price: 27.0,
    quantity: 130,
    weight: 500,
    description: "Antidepressant used to treat major depressive disorder.",
  },
  {
    drugName: "Duloxetine",
    drugStatus: "Available",
    supplier: "mohammed@gmail.com",
    expiryDate: "2026-01-15",
    price: 25.49,
    quantity: 150,
    weight: 400,
    description:
      "Medication used to treat depression, anxiety, and nerve pain.",
  },
  {
    drugName: "Quetiapine",
    drugStatus: "Available",
    supplier: "dagm@gmail.com",
    expiryDate: "2024-08-10",
    price: 29.99,
    quantity: 90,
    weight: 300,
    description:
      "Antipsychotic used to treat schizophrenia and bipolar disorder.",
  },
  {
    drugName: "Aripiprazole",
    drugStatus: "Out-of-stock",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2025-02-28",
    price: 31.75,
    quantity: 0,
    weight: 500,
    description:
      "Antipsychotic used to treat schizophrenia and bipolar disorder.",
  },
  {
    drugName: "Olanzapine",
    drugStatus: "Expired",
    supplier: "mohammed@gmail.com",
    expiryDate: "2023-08-30",
    price: 28.0,
    quantity: 70,
    weight: 400,
    description:
      "Antipsychotic used to treat schizophrenia and bipolar disorder.",
  },
  {
    drugName: "Risperidone",
    drugStatus: "Available",
    supplier: "dagm@gmail.com",
    expiryDate: "2024-03-10",
    price: 24.99,
    quantity: 120,
    weight: 300,
    description:
      "Antipsychotic used to treat schizophrenia and bipolar disorder.",
  },
  {
    drugName: "Lamotrigine",
    drugStatus: "Available",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2025-06-05",
    price: 26.5,
    quantity: 100,
    weight: 500,
    description: "Medication used to treat epilepsy and bipolar disorder.",
  },
  {
    drugName: "Topiramate",
    drugStatus: "Available",
    supplier: "mohammed@gmail.com",
    expiryDate: "2026-02-20",
    price: 27.49,
    quantity: 140,
    weight: 400,
    description: "Medication used to treat epilepsy and prevent migraines.",
  },
  {
    drugName: "Valproate",
    drugStatus: "Out-of-stock",
    supplier: "dagm@gmail.com",
    expiryDate: "2025-01-25",
    price: 29.75,
    quantity: 0,
    weight: 300,
    description: "Medication used to treat epilepsy and bipolar disorder.",
  },
  {
    drugName: "Carbamazepine",
    drugStatus: "Available",
    supplier: "abdulhamid@gmail.com",
    expiryDate: "2024-12-01",
    price: 28.99,
    quantity: 130,
    weight: 500,
    description: "Medication used to treat epilepsy and nerve pain.",
  },
];

try {
  await mongoose.connect(process.env.MONGO_URL);
  const drugs = await Drug.create(all);
  app.listen(5100, () => {
    console.log(`Server is running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  console.log(11111);
  process.exit(1);
}
