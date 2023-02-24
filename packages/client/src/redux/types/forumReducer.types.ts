export enum ForumActionTypes {
  SET_THEMES='SET_THEMES'
}
export interface IForum {
  themeId: number,
  createdById: number,
  countMsg: number,
  themeName: string,
}
export interface forumState {
  themes : IForum[]
}

export type TsetThemeList = {
  type: ForumActionTypes.SET_THEMES,
  payload: IForum[],
}
