import type { Hyper } from "hyper-connect";

import type { Note, NewNote } from "./models/note";
import type { User } from "./models/user";
import type { Post, NewPost } from "./models/post";
import type { Password } from "./models/password";
import type { NewPostImage, PostImage } from "./models/postImage";

export interface NoteServer {
  getNote({ id }: Pick<Note, "id">): Promise<Note | null>;
  getNotesByParent({ parent }: Pick<Note, "parent">): Promise<Array<Note>>;
  createNote({ body, title, parent }: NewNote): Promise<Note>;
  deleteNote({ id }: Pick<Note, "id">): Promise<void>;
}

export interface UserServer {
  getUserById: (id: User["id"]) => Promise<User | null>;
  getUserByEmail: (email: User["email"]) => Promise<User | null>;
  createUser: (
    email: User["email"],
    password: Password,
    role: User["role"],
    isAdmin: User["isAdmin"],
    username: User["username"]
  ) => Promise<User>;
  deleteUser: (email: User["email"]) => Promise<void>;
  verifyLogin: (email: User["email"], password: Password) => Promise<User>;
}

export interface PostServer {
  getPost({ id }: Pick<Post, "id">): Promise<Post | null>;
  getPostsList(): Promise<Array<Post> | null>;
  getPostsByParent({ parent }: Pick<Post, "parent">): Promise<Array<Post>>;
  getPostBySlug({ slug }: Pick<Post, "slug">): Promise<Post | null>;
  createPost({ body, title, parent }: NewPost): Promise<Post>;
  deletePost({ id }: Pick<Post, "id">): Promise<void>;
  // add a updatePost function that takes in the PostEdit type
}

export interface PostImageServer {
  getPostImage({ id }: Pick<PostImage, "id">): Promise<PostImage | null>;
  getPostImageByParent({ parent }: Pick<PostImage, "parent">): Promise<PostImage>;
  createPostImage({ parent, filename }: NewPostImage): Promise<PostImage>;
  deletePostImage({ id }: Pick<PostImage, "id">): Promise<void>;
}

export type ServerContext = {
  hyper: Hyper;
  UserServer: UserServer;
  NoteServer: NoteServer;
  PostServer: PostServer;
};
