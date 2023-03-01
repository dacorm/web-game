export type TThemeMessage = {
  msgId: number
  text: string
  authorId: number
  createdAt: Date
  login: string
  avatar: string | null
}

export type TTheme = {
  themeId: number
  userId: number
  themeName: string
  messages: TThemeMessage[]
} | null
