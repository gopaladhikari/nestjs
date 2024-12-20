import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { UsersService, type User } from "./users.service";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(+id);
	}

	@Post()
	create(@Body() user: User) {
		return this.usersService.create(user);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() user: User) {
		return this.usersService.update(+id, user);
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.usersService.delete(+id);
	}
}
