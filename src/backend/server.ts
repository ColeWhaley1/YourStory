import express from "express";
import cors from "cors";

import { Request, Response } from "express";
import getStoryByIdController from "./apis/controllers/getStoryByIdController";
import { uploadFileToStorageController, upload } from "./apis/controllers/uploadFileToStorageController";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
    res.send("Server is running!");
});

app.get("/api/stories/:id", getStoryByIdController);

app.post("/api/file/:bucket", upload.single("file"), uploadFileToStorageController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
