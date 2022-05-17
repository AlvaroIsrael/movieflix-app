import UserToken from '@modules/users/infra/typeorm/schemas/UserToken';

export default interface IUserTokensRepository {
  generate(user_id: string): Promise<UserToken>;

  findByToken(token: string): Promise<UserToken | undefined>;
}
