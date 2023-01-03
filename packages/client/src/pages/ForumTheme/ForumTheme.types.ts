export type TThemeMessage = {
  msgId: number
  text: string
  authorId: number
  date: Date
}

export type TTheme = {
  themeId: number
  userId: number
  themeName: string
  messages: TThemeMessage[]
} | null
