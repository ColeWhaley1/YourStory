import express from 'express';
import cors from 'cors';
import getStoryByIdController from './apis/controllers/getStoryByIdController';
import { Request, Response } from 'express';

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

app.get("/api/stories/:id", getStoryByIdController);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
