
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

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
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
}

export interface IQuery {
    user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

type Nullable<T> = T | null;
