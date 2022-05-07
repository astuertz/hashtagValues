// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Genders = {
  "MALE": "MALE",
  "FEMALE": "FEMALE",
  "TRANSWOMAN": "TRANSWOMAN",
  "TRANSMAN": "TRANSMAN",
  "OTHER": "OTHER"
};

const { Match, User, Swipe, Values } = initSchema(schema);

export {
  Match,
  User,
  Genders,
  Swipe,
  Values
};