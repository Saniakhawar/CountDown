import { differenceInSeconds } from "date-fns";
import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.greenBright.bold("\n\t\t       Welcome to CountDown Timer App created by Sania\n"));

const res = await inquirer.prompt([
    {
        type: "number",
        name: "userInput",
        message: chalk.blue.bold("Please enter the Amount of second"),
        validate: (input) => {
            if (isNaN(input)) {
                return chalk.red.bold("Please enter a valid number");
            } else if (input > 60) {
                return chalk.red.bold("Seconds must be less than or equal to 60");
            } else {
                return true;
            }
        }
    }
]);

let input = res.userInput;
function startTime(val: number) {
    const inTime = new Date().setSeconds(new Date().getSeconds() + val);
    const intervalTime = new Date(inTime);
    setInterval(() => {
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);

        if (timeDiff <= 0) {
            console.log(chalk.red.bold("Timer has expired"));
            process.exit();
        }

        const minute = Math.floor((timeDiff % 3600) / 60); 
        const seconds = Math.floor(timeDiff % 60);
        console.log(`${minute.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`);
    }, 1000);
}

startTime(input);

