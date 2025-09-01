export type CustomModalProps = {
  title?: string;
  visible: boolean;
  children: React.ReactNode;
  handleClose: (visible: boolean) => void;
  onClose?: () => void;
};
