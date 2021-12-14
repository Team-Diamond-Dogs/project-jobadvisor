export interface Job {
  id: string;
  type: string;
  attributes: Attributes3;
  links: Links;
}

interface Links {
  public_url: string;
}

interface Attributes3 {
  title: string;
  description_headline: string;
  description: string;
  projects: string;
  functions_headline: string;
  functions: string;
  benefits_headline: string;
  benefits: string;
  desirable_headline: string;
  desirable: string;
  remote: boolean;
  remote_modality: string;
  remote_zone: string;
  country: string;
  lang: string;
  category_name: string;
  perks: string[];
  min_salary?: any;
  max_salary?: any;
  published_at: number;
  response_time_in_days: Responsetimeindays;
  applications_count: number;
  tenant_city?: any;
  modality: Modality;
  seniority: Modality;
  tags: Tags;
  company: Company;
}

interface Company {
  data: Data2;
}

interface Data2 {
  id: string;
  type: string;
  attributes: Attributes2;
  relationships: Relationships;
}

interface Attributes2 {
  name: string;
  description: string;
  long_description: string;
  projects: string;
  benefits: string;
  web: string;
  twitter: string;
  github: string;
  facebook: string;
  angellist: string;
  country: string;
  response_time_in_days: Responsetimeindays2;
  logo: string;
}

interface Responsetimeindays2 {
  min: number;
  max: number;
}

interface Tags {
  data: Datum[];
}

interface Datum {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationships;
}

interface Relationships {
}

interface Attributes {
  name: string;
  keywords?: string;
}

interface Modality {
  data: Data;
}

interface Data {
  id: number;
  type: string;
}

interface Responsetimeindays {
  min?: any;
  max?: any;
}