import { ConsoleLogger, Injectable } from "@nestjs/common";
import fs, { promises } from "fs";
import path from "path";

@Injectable()
export class MyLoggerService extends ConsoleLogger {
	async logToFile(message: string): Promise<void> {
		const formattedEntry = `
    ${Intl.DateTimeFormat("en-US", {
			dateStyle: "short",
			timeStyle: "medium",
		}).format(new Date())}\t ${message}           
		})}
    `;

		try {
			if (!fs.existsSync(path.join(__dirname, "..", "..", "logs")))
				await promises.mkdir(
					path.join(__dirname, "..", "..", "logs")
				);

			await promises.appendFile(
				path.join(__dirname, "..", "..", "logs"),
				"myLog.log",
				// @ts-expect-error no error
				formattedEntry
			);
		} catch (error) {
			console.error((error as Error).message);
		}
	}

	log(message: unknown, context?: unknown, ...rest: unknown[]): void {
		const entry = `${context}\t ${message}`;
		this.logToFile(entry);
		super.log(message, context, ...rest);
	}

	error(
		message: unknown,
		stack?: unknown,
		context?: unknown,
		...rest: unknown[]
	): void {
		const entry = `${context}\t ${message}`;
		this.logToFile(entry);
		super.error(message, stack, context, ...rest);
	}
}
