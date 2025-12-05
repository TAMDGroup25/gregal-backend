import type { Schema, Struct } from '@strapi/strapi';

export interface SharedFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    displayName: 'feature';
  };
  attributes: {
    airConditioning: Schema.Attribute.String;
    alarm: Schema.Attribute.String;
    balcony: Schema.Attribute.String;
    bathrooms: Schema.Attribute.String;
    bedrooms: Schema.Attribute.String;
    elevator: Schema.Attribute.String;
    fireplace: Schema.Attribute.String;
    furnished: Schema.Attribute.String;
    garage: Schema.Attribute.String;
    garden: Schema.Attribute.String;
    heating: Schema.Attribute.String;
    internet: Schema.Attribute.String;
    laundry: Schema.Attribute.String;
    parking: Schema.Attribute.String;
    pool: Schema.Attribute.String;
    rooms: Schema.Attribute.String;
    storage: Schema.Attribute.String;
    surface: Schema.Attribute.String;
    terrace: Schema.Attribute.String;
  };
}

export interface SharedMedia extends Struct.ComponentSchema {
  collectionName: 'components_shared_media';
  info: {
    displayName: 'Media';
    icon: 'file-video';
  };
  attributes: {
    file: Schema.Attribute.Media<'images' | 'files' | 'videos', true>;
  };
}

export interface SharedQuote extends Struct.ComponentSchema {
  collectionName: 'components_shared_quotes';
  info: {
    displayName: 'Quote';
    icon: 'indent';
  };
  attributes: {
    body: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SharedRichText extends Struct.ComponentSchema {
  collectionName: 'components_shared_rich_texts';
  info: {
    description: '';
    displayName: 'Rich text';
    icon: 'align-justify';
  };
  attributes: {
    body: Schema.Attribute.RichText;
  };
}

export interface SharedSeo extends Struct.ComponentSchema {
  collectionName: 'components_shared_seos';
  info: {
    description: '';
    displayName: 'Seo';
    icon: 'allergies';
    name: 'Seo';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text & Schema.Attribute.Required;
    metaTitle: Schema.Attribute.String & Schema.Attribute.Required;
    shareImage: Schema.Attribute.Media<'images'>;
  };
}

export interface SharedSlider extends Struct.ComponentSchema {
  collectionName: 'components_shared_sliders';
  info: {
    description: '';
    displayName: 'Slider';
    icon: 'address-book';
  };
  attributes: {
    files: Schema.Attribute.Media<'images', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.feature': SharedFeature;
      'shared.media': SharedMedia;
      'shared.quote': SharedQuote;
      'shared.rich-text': SharedRichText;
      'shared.seo': SharedSeo;
      'shared.slider': SharedSlider;
    }
  }
}
