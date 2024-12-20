import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	ParseIntPipe,
	ValidationPipe,
	Query,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import type { CreateUserDto } from "./dto/create-user.dto";

@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll(@Query("role") role: CreateUserDto["role"]) {
		return this.usersService.findAll(role);
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.usersService.findOne(id);
	}

	@Post()
	create(@Body(ValidationPipe) user: CreateUserDto) {
		return this.usersService.create(user);
	}

	@Patch(":id")
	update(
		@Param("id", ParseIntPipe) id: number,
		@Body(ValidationPipe) user: CreateUserDto
	) {
		return this.usersService.update(id, user);
	}

	@Delete(":id")
	delete(@Param("id", ParseIntPipe) id: number) {
		return this.usersService.delete(id);
	}
}
