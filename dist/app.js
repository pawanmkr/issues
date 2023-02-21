import express from 'express';
import chalk from 'chalk';
import router from './routes/index.js';
const app = express();
const PORT = process.env.PORT || 3000;
app.use("/api", router);
app.listen(PORT, () => {
    console.log(chalk.bgGreen.black(`Server live at https://localhost:${PORT} ...`));
});
export default app;
//# sourceMappingURL=app.js.map