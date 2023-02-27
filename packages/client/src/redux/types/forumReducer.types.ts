export enum ForumActionTypes {
  SET_THEMES='SET_THEMES',
  SET_COUNT_THEMES='SET_COUNT_THEMES',
  SET_CURRENT_MESSAGES='SET_CURRENT_MESSAGES',
  SET_CURRENT_THEME='SET_CURRENT_THEME'
}
export interface IForum {
  themeId: number,
  createdById: number,
  countMsg: number,
  themeName: string,
  createdAt?: Date
}
export interface IMes {
  msgId?: number,
  themeId: number,
  text: string,
  authorId: number
}

export interface forumState {
  themes : IForum[]
  countThemes: number
  currentMessages: IMes[]
  currentTheme: IForum| null
}

export type TsetThemeList = {
  type: ForumActionTypes.SET_THEMES,
  payload: IForum[],
}

export type TsetCountThemes = {
  type: ForumActionTypes.SET_COUNT_THEMES,
  payload: number,
}

export type TsetMessages = {
  type: ForumActionTypes.SET_CURRENT_MESSAGES,
  payload: IMes[],
}

export type TsetCurrentTheme = {
  type: ForumActionTypes.SET_CURRENT_THEME,
  payload: IForum,
}

export type TForumAction =
  | TsetThemeList
  | TsetCountThemes
  | TsetMessages
  | TsetCurrentTheme
