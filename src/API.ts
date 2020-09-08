/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateWorkoutInput = {
  id?: string | null,
  name: string,
  description?: string | null,
  light?: number | null,
  medium?: number | null,
  heavy?: number | null,
};

export type ModelWorkoutConditionInput = {
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  light?: ModelIntInput | null,
  medium?: ModelIntInput | null,
  heavy?: ModelIntInput | null,
  and?: Array< ModelWorkoutConditionInput | null > | null,
  or?: Array< ModelWorkoutConditionInput | null > | null,
  not?: ModelWorkoutConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateWorkoutInput = {
  id: string,
  name?: string | null,
  description?: string | null,
  light?: number | null,
  medium?: number | null,
  heavy?: number | null,
};

export type DeleteWorkoutInput = {
  id?: string | null,
};

export type ModelWorkoutFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  description?: ModelStringInput | null,
  light?: ModelIntInput | null,
  medium?: ModelIntInput | null,
  heavy?: ModelIntInput | null,
  and?: Array< ModelWorkoutFilterInput | null > | null,
  or?: Array< ModelWorkoutFilterInput | null > | null,
  not?: ModelWorkoutFilterInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type CreateWorkoutMutationVariables = {
  input: CreateWorkoutInput,
  condition?: ModelWorkoutConditionInput | null,
};

export type CreateWorkoutMutation = {
  createWorkout:  {
    __typename: "Workout",
    id: string,
    name: string,
    description: string | null,
    light: number | null,
    medium: number | null,
    heavy: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateWorkoutMutationVariables = {
  input: UpdateWorkoutInput,
  condition?: ModelWorkoutConditionInput | null,
};

export type UpdateWorkoutMutation = {
  updateWorkout:  {
    __typename: "Workout",
    id: string,
    name: string,
    description: string | null,
    light: number | null,
    medium: number | null,
    heavy: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteWorkoutMutationVariables = {
  input: DeleteWorkoutInput,
  condition?: ModelWorkoutConditionInput | null,
};

export type DeleteWorkoutMutation = {
  deleteWorkout:  {
    __typename: "Workout",
    id: string,
    name: string,
    description: string | null,
    light: number | null,
    medium: number | null,
    heavy: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type GetWorkoutQueryVariables = {
  id: string,
};

export type GetWorkoutQuery = {
  getWorkout:  {
    __typename: "Workout",
    id: string,
    name: string,
    description: string | null,
    light: number | null,
    medium: number | null,
    heavy: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListWorkoutsQueryVariables = {
  filter?: ModelWorkoutFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListWorkoutsQuery = {
  listWorkouts:  {
    __typename: "ModelWorkoutConnection",
    items:  Array< {
      __typename: "Workout",
      id: string,
      name: string,
      description: string | null,
      light: number | null,
      medium: number | null,
      heavy: number | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateWorkoutSubscription = {
  onCreateWorkout:  {
    __typename: "Workout",
    id: string,
    name: string,
    description: string | null,
    light: number | null,
    medium: number | null,
    heavy: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateWorkoutSubscription = {
  onUpdateWorkout:  {
    __typename: "Workout",
    id: string,
    name: string,
    description: string | null,
    light: number | null,
    medium: number | null,
    heavy: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteWorkoutSubscription = {
  onDeleteWorkout:  {
    __typename: "Workout",
    id: string,
    name: string,
    description: string | null,
    light: number | null,
    medium: number | null,
    heavy: number | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};
