export type TrackType = {
  _id: number;
  name: string;
  author: string;
  release_date: string;
  genre: string[];
  time: number;
  album: string;
  logo: null;
  track_file: string;
  stared_user: string[];
};

export interface FilterItemProps {
  title: string;
  isActive: boolean;
  activeFilter?: number | null;
  onClick: () => void;
}
