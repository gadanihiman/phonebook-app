export interface ContactProps {
  id: string;
  name: string;
  phoneNumbers: string[];
  isFavorite: boolean;
  addToFavorites: (id: string) => void;
  removeFromFavorites: (id: string) => void;
  onDelete: () => void;
}
