// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const Genders = {
  "MALE": "MALE",
  "FEMALE": "FEMALE"
};

const { Match, User } = initSchema(schema);

export {
  Match,
  User,
  Genders
};