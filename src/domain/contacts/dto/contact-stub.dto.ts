import { CreateContactDto } from './create-contact.dto';

export const ContactStubDto = (): CreateContactDto => {
  return {
    isActive: true,
    area: 'Голосіївський',
    address: 'Саперно-Слобідська, 10',
    comment: 'Вхід через супермаркет ВЕЛМАРТ',
    subways: ['Мінська', 'Оболонь'],
    phones: ['+38 050 227 27 28', '+38 050 227 27 30'],
    workingTime: '10:00 - 19:30',
    workingDate: 'нд - вихідний',
    googleMapLink: 'https://maps.app.goo.gl/1pi9sxQl',
    googlePluginLink: 'https://www.google.com/maps/embed?plugin....'
  };
};
