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
