export type ModalProps = {
  close: () => void;
  onSuccess: () => Promise<void>;
  opened?: boolean;
};

export type CreateOneModal = React.ComponentType<ModalProps>;

export type UpdateOneModal = React.ComponentType<
  ModalProps & {
    id: string;
  }
>;

export type DeleteOneModal = React.ComponentType<
  ModalProps & {
    id: string;
  }
>;
