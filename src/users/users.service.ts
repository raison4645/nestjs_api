import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users = [
    {
      "id": 1,
      "name": "Plato",
      "email": "plato@cs.com",
      "role": "ENGINEER"
    },
    {
      "id": 2,
      "name": "Aristotle",
      "email": "aristotle@cs.com",
      "role": "ADMIN"
    },
    {
      "id": 3,
      "name": "Socrates",
      "email": "socrates@cs.com",
      "role": "INTERN"
    },
    {
      "id": 4,
      "name": "Confucius",
      "email": "confucius@cs.com",
      "role": "ENGINEER"
    },
    {
      "id": 5,
      "name": "Descartes",
      "email": "descartes@cs.com",
      "role": "ADMIN"
    },
    {
      "id": 6,
      "name": "Kant",
      "email": "kant@cs.com",
      "role": "INTERN"
    }
  ]

  findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
    if (role) {
      return this.users.filter(user => user.role === role)
    }
    return this.users
  }

  findOne(id: number) {
    const user = this.users.find(user => user.id === id)
    return user
  }

  create(createUserDto: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id = a.id)
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...createUserDto
    }
    this.users.push(newUser)
    return newUser
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    this.users = this.users.map(user => {
      if (user.id === id){
        return {...user, ...updateUserDto}
      }
      return user
    })

    return this.findOne(id)
  }
  delete(id: number) {
    const removedUser = this.findOne(id)
    this.users.filter(user => user.id !== id)
    return removedUser
  }
}
