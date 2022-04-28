import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum Genders {
  MALE = "MALE",
  FEMALE = "FEMALE",
  TRANSWOMAN = "TRANSWOMAN",
  TRANSMAN = "TRANSMAN",
  OTHER = "OTHER"
}

export declare class Values {
  readonly label?: string | null;
  readonly name?: string | null;
  readonly weight?: number | null;
  constructor(init: ModelInit<Values>);
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
  readonly image?: (string | null)[] | null;
  readonly bio: string;
  readonly gender: Genders | keyof typeof Genders;
  readonly lookingfor: Genders[] | keyof typeof Genders;
  readonly sub: string;
  readonly height?: string | null;
  readonly bodytype?: string | null;
  readonly language: string;
  readonly kids: string;
  readonly hashtags?: (Values | null)[] | null;
  readonly values?: (Values | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}