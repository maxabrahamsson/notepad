// @flow
export type Note = { message: string };
export type UpdateNote = { message: string, id: string };
export type NotesResponse = Array<Note>;
export type Response = { code: number, type: string, message: string };
export type TemplateResponse = { result: string };
