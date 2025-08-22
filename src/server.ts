import app from './app';
import { env } from './utils/env';

app.listen(env.PORT, () => {
  console.info(`Server is running on port ${env.PORT}`);
});
