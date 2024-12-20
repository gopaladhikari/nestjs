import {
	IsString,
	IsEmail,
	IsEnum,
	IsNotEmpty,
} from "class-validator";

export class CreateUserDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsEmail()
	email: string;

	@IsEnum(["ADMIN", "ENGINEER", "INTERN"], {
		message:
			"Role must be one of the following values: ADMIN, ENGINEER, INTERN",
	})
	role: "ADMIN" | "ENGINEER" | "INTERN";
}
