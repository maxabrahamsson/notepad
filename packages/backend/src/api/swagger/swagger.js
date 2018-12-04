// @flow
export type Note = { message: string };
export type NotesResponse = Array<Note>;
export type Response = { code: number, type: string, message: string };
export type ErrorResponse = { message: string };
