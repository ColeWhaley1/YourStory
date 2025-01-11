import express from "express";
import cors from "cors";

import { Request, Response } from "express";
import getStoryByIdController from "./apis/controllers/getStoryByIdController";
import { uploadFileToStorageController } from "./apis/controllers/uploadFileToStorageController";
import multer from "multer";
import { uploadNewStoryController } from "./apis/controllers/uploadNewStoryController";
import createNewUserController from "./apis/controllers/createNewUserController";
import signInUserController from "./apis/controllers/signInUserController";
import signOutUserController from "./apis/controllers/signOutUserController";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send("Server is running!");
});

// Story routes

app.get("/api/stories/:id", getStoryByIdController);

app.post("/api/stories/new", uploadNewStoryController);

// Supabase storage routes

app.post("/api/file/:bucket", upload.single("file"), uploadFileToStorageController);

// user auth

app.post("/api/sign_up", createNewUserController);
app.post("/api/sign_in", signInUserController);
app.post("/api/sign_out", signOutUserController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
