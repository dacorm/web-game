export enum ForumActionTypes {
  SET_THEMES='SET_THEMES',
  SET_COUNT_THEMES='SET_COUNT_THEMES',
  SET_CURRENT_MESSAGES='SET_CURRENT_MESSAGES'
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
}

export type TsetThemeList = {
  type: ForumActionTypes.SET_THEMES,
  payload: IForum[],
}
