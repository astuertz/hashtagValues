import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER"
}



type MatchMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Match {
  readonly id: string;
  readonly User1?: User | null;
  readonly User2?: User | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  readonly matchUser1Id?: string | null;
  readonly matchUser2Id?: string | null;
  constructor(init: ModelInit<Match, MatchMetaData>);
  static copyOf(source: Match, mutator: (draft: MutableModel<Match, MatchMetaData>) => MutableModel<Match, MatchMetaData> | void): Match;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly image?: string | null;
  readonly bio: string;
  readonly gender: Genders | keyof typeof Genders;
  readonly lookingfor: Genders | keyof typeof Genders;
  readonly sub: string;
  readonly orientation: string;
  readonly relationshiptype: string;
  readonly relationshipstatus: string;
  readonly height?: string | null;
  readonly bodytype?: string | null;
  readonly ethnicity?: string | null;
  readonly religio?: string | null;
  readonly zodiac?: string | null;
  readonly political?: string | null;
  readonly employment?: string | null;
  readonly education?: string | null;
  readonly language?: string | null;
  readonly diet?: string | null;
  readonly smoking?: string | null;
  readonly drinking?: string | null;
  readonly druguse?: string | null;
  readonly kids?: string | null;
  readonly pets?: string | null;
  readonly typeofdating?: string | null;
  readonly hashtags?: (string | null)[] | null;
  readonly hashtagweight?: (number | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}