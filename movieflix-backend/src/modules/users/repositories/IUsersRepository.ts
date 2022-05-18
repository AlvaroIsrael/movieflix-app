import User from '@modules/users/infra/typeorm/schemas/User';
import ICreateUser from '@modules/users/dtos/ICreateUser';
import IFindAllProviders from '@modules/users/dtos/IFindAllProviders';

export default interface IUsersRepository {
  create(data: ICreateUser): Promise<User>;

  save(user: User): Promise<User>;

  findById(id: string): Promise<User | undefined>;

  findByEmail(email: string): Promise<User | undefined>;

  findAllProviders(data: IFindAllProviders): Promise<User[]>;
}
