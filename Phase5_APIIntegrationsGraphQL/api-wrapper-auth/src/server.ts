import dotenv from 'dotenv';
dotenv.config();

import { app, registerController } from './app';
import { NewsController } from './controllers/news.controller';

registerController(NewsController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
