export type AddToClipboardModalState = {
  open: boolean;
  item: {
    name: string;
    image?: string;
    comments?: string;
  } | null;
};
