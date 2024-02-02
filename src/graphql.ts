
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum TweetType {
    Post = "Post",
    Comment = "Comment"
}

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

export interface NewTweet {
    content: string;
}

export interface NewImageInput {
    publicId?: Nullable<string>;
    version?: Nullable<number>;
    signature?: Nullable<string>;
    width?: Nullable<number>;
    height?: Nullable<number>;
    format: string;
    resourceType: string;
    createdAt: string;
    bytes: number;
    type?: Nullable<string>;
    url: string;
    secureUrl?: Nullable<string>;
}

export interface CreateTweetInput {
    tweet: NewTweet;
    image?: Nullable<NewImageInput>;
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
    deleteTweet(id: string): Nullable<DeleteTweetResponse> | Promise<Nullable<DeleteTweetResponse>>;
    createTweet(tweetDetails: CreateTweetInput): Tweet | Promise<Tweet>;
    removeUser(id: string): Nullable<UserSearchResponse> | Promise<Nullable<UserSearchResponse>>;
    followUser(user: string): Nullable<FollowUserResponse> | Promise<Nullable<FollowUserResponse>>;
}

export interface StoredFile {
    id: string;
    publicId?: Nullable<string>;
    version?: Nullable<number>;
    signature?: Nullable<string>;
    width?: Nullable<number>;
    height?: Nullable<number>;
    format: string;
    resourceType: string;
    createdAt: string;
    bytes: number;
    type?: Nullable<string>;
    url: string;
    secureUrl?: Nullable<string>;
}

export interface Tweet {
    id: string;
    content: string;
    likes: number;
    retweet: number;
    author: User;
    tweetType: TweetType;
    commentToTweet?: Nullable<Tweet>;
    numberOfComments: number;
    picture?: Nullable<StoredFile>;
}

export interface DeleteTweetResponse {
    success: boolean;
}

export interface ISubscription {
    tweetCreated(author: string): Nullable<Tweet> | Promise<Nullable<Tweet>>;
}

export interface IQuery {
    getTweets(): Nullable<Nullable<Tweet>[]> | Promise<Nullable<Nullable<Tweet>[]>>;
    getUser(id: string): Nullable<UserSearchResponse> | Promise<Nullable<UserSearchResponse>>;
    getUserByUsernameOrEmail(identifier: string): Nullable<UserSearchResponse> | Promise<Nullable<UserSearchResponse>>;
    getFollowers(user: string): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getFollowings(user: string): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
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

export interface UserNameOrEmailSearchResponse {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    profilePicture?: Nullable<string>;
    dob: string;
    followersCount: number;
    followingCount: number;
}

export interface FollowUserResponse {
    success: boolean;
}

type Nullable<T> = T | null;
