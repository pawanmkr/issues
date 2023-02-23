import chalk from "chalk";

const handleError = (error , message) => {
    console.log(chalk.bgRed.white(message));
    console.error(error);
}

export default handleError;