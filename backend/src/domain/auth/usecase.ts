import { User } from "./model";
import { Repository } from "./repository";
import {} from "@infrastructure";
import * as dto from "./dto";
import { wrapper, authentication } from "@infrastructure";

export class UseCase {
  private Repository: Repository;

  constructor(repository: Repository) {
    this.Repository = repository;
  }

  async login(request: dto.LoginRequest): Promise<dto.BaseLoginResponse> {
    const user = new User();
    user.username = request.username;
    user.password = request.password;

    let data = await this.Repository.login(request.username);

    if (data == null) {
      return wrapper.error(404, "username notfound");
    }

    if (!authentication.verifyPassword(request.password, data.password)) {
      return wrapper.error(403, "username or password wrong");
    }
    let token = authentication.generateToken(data);

    const response: dto.LoginResponse = {
      token: token,
    };

    return wrapper.success(200, response);
  }

  async register(
    request: dto.RegisterRequest,
  ): Promise<dto.BaseRegisterResponse> {
    const user = new User();
    user.username = request.username;
    user.password = authentication.hashPassword(request.password);

    let data = await this.Repository.register(user);

    if (data == null) {
      return wrapper.error(500, "failed register");
    }

    let token = authentication.generateToken(data);

    const response: dto.RegisterResponse = {
      token: token,
    };

    return wrapper.success(200, response);
  }
}
