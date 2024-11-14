import express from 'express';
import cors from 'cors';

import { Request, Response } from 'express';
import getStoryByIdController from './apis/controllers/getStoryByIdController';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

module.exports = {
    webpack: (config: any) => {
      config.resolve.alias.canvas = false;
      return config;
    },
  };
  

app.get("/", (_req: Request, res: Response) => {
    res.send("Server is running!");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get("/api/stories/:id", getStoryByIdController);
