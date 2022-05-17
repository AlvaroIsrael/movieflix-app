import User from '@modules/users/infra/typeorm/schemas/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDto from '@modules/users/dtos/ICreateUserDto';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

const ObjectId = require('mongodb').ObjectId;

class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.users.find(user => user.email === email);
  }

  public async findById(id: string): Promise<User | undefined> {
    return await this.users.find(user => new ObjectId(user.id).toString() === new ObjectId(id).toString());
  }

  public async create({ name, email, password }: ICreateUserDto): Promise<User> {
    const user = new User();

    Object.assign(user, { id: new ObjectId(), name, email, password });

    this.users.push(user);

    return user;
  }

  public async findAllProviders({ except_user_id }: IFindAllProvidersDTO): Promise<User[]> {
    let { users } = this;

    if (except_user_id) {
      users = this.users.filter(user => new ObjectId(user.id).toString() !== new ObjectId(except_user_id).toString());
    }

    return users;
  }

  public async save(user: User): Promise<User> {
    const userIndex = this.users.findIndex(userIndex => new ObjectId(userIndex.id).toString() === new ObjectId(user.id).toString());

    this.users[userIndex] = user;

    return user;
  }
}

export default UsersRepository;
