import { CreateBrandDto } from './create-brand.dto';

export const BrandStubDto = (): CreateBrandDto => {
  return {
    isActive: true,
    title: 'Apple',
    slug: 'apple',
    article: '<p>Some article about brand</p>',
    metadata: {
      title: 'seo title',
      description: 'seo description',
      keywords: 'key words seo'
    }
  };
};
