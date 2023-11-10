import { UnprocessableEntityException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getModelToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model, connect } from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

import { UsersController } from './users.controller';
import { UsersService } from './users.service';

import { User, UserSchema } from './schemas/user.schema';

import { UserStubDto } from './dto/user-stub.dto';

describe('Users Controller', () => {
  let model: Model<User>;
  let controller: UsersController;
  let service: UsersService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    model = mongoConnection.model(User.name, UserSchema);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    const userModule: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [UsersController],
      providers: [
        { provide: getModelToken(User.name), useValue: model },
        UsersService,
        ConfigService
      ]
    }).compile();

    service = userModule.get<UsersService>(UsersService);
    controller = userModule.get<UsersController>(UsersController);
  });

  afterEach(async () => {
    const collections = mongoConnection.collections;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany({});
    }
  });

  describe('Definition checks', () => {
    it('Service and Controller should be defined', () => {
      expect(controller).toBeDefined();
      expect(service).toBeDefined();
    });
  });

  describe('Controller Tests', () => {
    describe('POST createUser', () => {
      it('should return created User', async () => {
        const createdArticle = await controller.createUser(UserStubDto());

        expect(createdArticle?.login).toBe(UserStubDto().login.toLowerCase());
        expect(createdArticle?.password).toBe(undefined);
      });

      it('should return UnprocessableEntityException', async () => {
        await new model(UserStubDto()).save();
        await expect(controller.createUser(UserStubDto())).rejects.toEqual(
          new UnprocessableEntityException({
            statusCode: 422,
            error: 'Bad Request',
            message: `User already exists`
          })
        );
      });
    });
  });
});
