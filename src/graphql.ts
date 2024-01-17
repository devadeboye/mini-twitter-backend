
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface SignupInput {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
}

export interface SigninInput {
    username: string;
    password: string;
}

export interface SigninResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: Nullable<string>;
    dob: string;
}

export interface IMutation {
    signup(user: SignupInput): Nullable<User> | Promise<Nullable<User>>;
    signin(credentials?: Nullable<SigninInput>): Nullable<SigninResponse> | Promise<Nullable<SigninResponse>>;
    removeUser(id: number): Nullable<UserSearchResponse> | Promise<Nullable<UserSearchResponse>>;
}

export interface Comment {
    id: number;
    content: string;
    image?: Nullable<string>;
    likes?: Nullable<number>;
    retweet?: Nullable<number>;
    post: number;
    author: number;
}

export interface Post {
    id: number;
    content: string;
    image?: Nullable<string>;
    likes?: Nullable<number>;
    retweet?: Nullable<number>;
    comments?: Nullable<Nullable<Comment>[]>;
    author: number;
}

export interface User {
    id: number;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: Nullable<string>;
    dob: string;
}

export interface UserSearchResponse {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: Nullable<string>;
    dob: string;
}

export interface IQuery {
    getUser(id: number): Nullable<UserSearchResponse> | Promise<Nullable<UserSearchResponse>>;
    getUserByUsernameOrEmail(identifier: string): Nullable<UserSearchResponse> | Promise<Nullable<UserSearchResponse>>;
}

type Nullable<T> = T | null;
