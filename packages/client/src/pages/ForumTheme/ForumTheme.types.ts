export type TTheme = {
  id_theme: number
  id_user: number
  theme_name: string
  messages: TThemeMessage[]
} | null

export type TThemeMessage = {
  id_msg: number
  text: string
  author_id: number
  date: Date
}
