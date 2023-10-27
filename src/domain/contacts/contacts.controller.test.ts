import { getModelToken } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { Connection, Model, connect } from 'mongoose';

import { MongoMemoryServer } from 'mongodb-memory-server';

import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';

import { Contact, ContactSchema } from './schemas/contact.schema';
import { Image, ImageSchema } from 'domain/images/schemas/image.schema';

import { ContactStubDto } from './dto/contact-stub.dto';

describe('Contacts Controller', () => {
  let model: Model<Contact>;
  let controller: ContactsController;
  let service: ContactsService;
  let mongod: MongoMemoryServer;
  let mongoConnection: Connection;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    mongoConnection = (await connect(uri)).connection;
    model = mongoConnection.model(Contact.name, ContactSchema);
    mongoConnection.model(Image.name, ImageSchema);
  });

  afterAll(async () => {
    await mongoConnection.dropDatabase();
    await mongoConnection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    const contactModule: TestingModule = await Test.createTestingModule({
      imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
      controllers: [ContactsController],
      providers: [
        { provide: getModelToken(Contact.name), useValue: model },
        ContactsService
      ]
    }).compile();

    service = contactModule.get<ContactsService>(ContactsService);
    controller = contactModule.get<ContactsController>(ContactsController);
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
    describe('POST createContact', () => {
      it('should return created Contact', async () => {
        const { area, phones, subways, googleMapLink, googlePluginLink } =
          ContactStubDto();

        const createdArticle = await controller.createContact(ContactStubDto());
        expect(createdArticle.area).toBe(area);
        expect(createdArticle.googleMapLink).toBe(googleMapLink);
        expect(createdArticle.googlePluginLink).toBe(googlePluginLink);
        expect(createdArticle.phones.length).toBe(phones.length);
        expect(createdArticle.subways.length).toBe(subways.length);
      });
    });

    describe('GET findActiveContacts', () => {
      it('should return 2 created active Contacts', async () => {
        await new model({ ...ContactStubDto() }).save();
        await new model({ ...ContactStubDto() }).save();
        const articles = await controller.findActiveContacts();
        expect(articles.length).toBe(2);
      });
    });
  });
});
