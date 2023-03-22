export interface ModalProps {
  children: React.ReactNode
  title: string
  isShow: boolean
  onClose?: () => void
}
