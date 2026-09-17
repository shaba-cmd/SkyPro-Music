export type TrackType = {
  album: string;
  author: string;
  duration_in_seconds: number;
  genre: string[];
  logo: null;
  name: string;
  release_date: string;
  staredUser: number[];
  track_file: string;
  _id: number;
};

export interface FilterItemProps {
  title: string;
  isActive: boolean;
  activeFilter?: number | null;
  onClick: () => void;
}
