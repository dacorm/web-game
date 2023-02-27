export type TThemeMessage = {
  msgId: number
  text: string
  authorId: number
  createdAt: Date
}

export type TTheme = {
  themeId: number
  userId: number
  themeName: string
  messages: TThemeMessage[]
} | null
