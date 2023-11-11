import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model, connect } from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';

import { Brand, BrandSchema } from './schemas/brand.schema';
import { Image, ImageSchema } from '@domain/images/schemas/image.schema';

import { BrandStubDto } from './dto/brand-stub.dto';

describe('Brands Controller', () => {
  let model: Model<Brand>;
  let controller: BrandsController;
  let service: BrandsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    model = mongoConnection.model(Brand.name, BrandSchema);
    mongoConnection.model(Image.name, ImageSchema);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    const brandModule: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [BrandsController],
      providers: [
        { provide: getModelToken(Brand.name), useValue: model },
        BrandsService
      ]
    }).compile();

    service = brandModule.get<BrandsService>(BrandsService);
    controller = brandModule.get<BrandsController>(BrandsController);
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
    describe('POST createBrand', () => {
      it('should return created Brand', async () => {
        const createdArticle = await controller.createBrand(BrandStubDto());
        expect(createdArticle.slug).toBe(BrandStubDto().slug);
      });

      it('should return UnprocessableEntityException', async () => {
        await new model(BrandStubDto()).save();
        await expect(controller.createBrand(BrandStubDto())).rejects.toEqual(
          new UnprocessableEntityException({
            statusCode: 422,
            error: 'Bad Request',
            message: `Brand with slug "${BrandStubDto().slug}" already exists`
          })
        );
      });
    });

    describe('GET findBrandBySlug', () => {
      it('should return found Brand by slug', async () => {
        await new model(BrandStubDto()).save();
        const article = await controller.findBrandBySlug(BrandStubDto().slug);
        expect(article.slug).toBe(BrandStubDto().slug);
      });

      it('should return NotFoundException', async () => {
        await expect(
          controller.findBrandBySlug(BrandStubDto().slug)
        ).rejects.toEqual(
          new NotFoundException({
            statusCode: 404,
            error: 'Bad Request',
            message: `Brand with slug "${BrandStubDto().slug}" was not found`
          })
        );
      });
    });

    describe('GET findActiveBrands', () => {
      it('should return 2 created active Brands', async () => {
        await new model({ ...BrandStubDto(), slug: 'test1' }).save();
        await new model({ ...BrandStubDto(), slug: 'test2' }).save();
        const articles = await controller.findActiveBrands();
        expect(articles[0].slug).toBe('test1');
        expect(articles[1].slug).toBe('test2');
        expect(articles.length).toBe(2);
      });
    });
  });
});
