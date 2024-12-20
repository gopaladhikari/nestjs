import { Injectable } from "@nestjs/common";

export type User = {
	id: number;
	name: string;
	email: string;
	role: "ADMIN" | "ENGINEER" | "INTERN";
};

@Injectable()
export class UsersService {
	private users: User[] = [
		{
			id: 1,
			name: "Leanne Graham",
			email: "Sincere@april.biz",
			role: "INTERN",
		},
		{
			id: 2,
			name: "Ervin Howell",
			email: "Shanna@melissa.tv",
			role: "INTERN",
		},
		{
			id: 3,
			name: "Clementine Bauch",
			email: "Nathan@yesenia.net",
			role: "ENGINEER",
		},
		{
			id: 4,
			name: "Patricia Lebsack",
			email: "Julianne.OConner@kory.org",
			role: "ENGINEER",
		},
		{
			id: 5,
			name: "Chelsey Dietrich",
			email: "Lucio_Hettinger@annie.ca",
			role: "ADMIN",
		},
	];

	findAll(role?: User["role"]) {
		if (role) return this.users.filter((user) => user.role === role);

		return this.users;
	}

	findOne(id: number) {
		return this.users.find((user) => user.id === id);
	}

	create(user: User) {
		const usersByHighestId = this.users.sort((a, b) => b.id - a.id);

		const newUser = {
			id: usersByHighestId[0].id + 1,
			...user,
		};

		this.users.push(newUser);

		return newUser;
	}

	update(id: number, user: User) {
		const index = this.users.findIndex((user) => user.id === id);

		if (index === -1) return "User not found";

		this.users[index] = {
			...this.users[index],
			...user,
		};

		const updatedUser = this.users[index];

		return updatedUser;
	}

	delete(id: number) {
		const index = this.users.findIndex((user) => user.id === id);

		if (index === -1) return "User not found";

		const deletedUser = this.users[index];

		this.users = this.users.filter((user) => user.id !== id);

		return deletedUser;
	}
}
