
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
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: Nullable<string>;
    dob: string;
}

export interface IMutation {
    signup(user: SignupInput): Nullable<User> | Promise<Nullable<User>>;
    signin(credentials: SigninInput): Nullable<SigninResponse> | Promise<Nullable<SigninResponse>>;
    removeUser(id: string): Nullable<UserSearchResponse> | Promise<Nullable<UserSearchResponse>>;
    followUser(user: string): Nullable<FollowUserResponse> | Promise<Nullable<FollowUserResponse>>;
}

export interface Tweet {
    id: string;
    content: string;
    likes: number;
    retweet: number;
    author: User;
    tweetType: string;
    commentToTweet?: Nullable<Tweet>;
    numberOfComments: number;
}

export interface User {
    id: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: Nullable<string>;
    dob: string;
    followers: Nullable<User>[];
    following: Nullable<User>[];
    followersCount: number;
    followingCount: number;
}

export interface UserSearchResponse {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: Nullable<string>;
    dob: string;
    followers?: Nullable<Nullable<User>[]>;
    following?: Nullable<Nullable<User>[]>;
    followersCount: number;
    followingCount: number;
}

export interface FollowUserResponse {
    success: boolean;
}

export interface IQuery {
    getUser(id: string): Nullable<UserSearchResponse> | Promise<Nullable<UserSearchResponse>>;
    getUserByUsernameOrEmail(identifier: string): Nullable<UserSearchResponse> | Promise<Nullable<UserSearchResponse>>;
}

type Nullable<T> = T | null;
