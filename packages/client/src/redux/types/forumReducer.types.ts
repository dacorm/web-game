export enum ForumActionTypes {
  SET_THEMES='SET_THEMES',
  SET_COUNT_THEMES='SET_COUNT_THEMES'
}
export interface IForum {
  themeId: number,
  createdById: number,
  countMsg: number,
  themeName: string,
}
export interface forumState {
  themes : IForum[]
  countThemes: number
}

export type TsetThemeList = {
  type: ForumActionTypes.SET_THEMES,
  payload: IForum[],
}
