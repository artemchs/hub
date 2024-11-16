export type CreateOneModal = React.ComponentType<{
  opened: boolean;
  close: () => void;
}>;

export type UpdateOneModal = React.ComponentType<{
  opened: boolean;
  close: () => void;
  id: string;
}>;

export type DeleteOneModal = React.ComponentType<{
  opened: boolean;
  close: () => void;
  id: string;
}>;
