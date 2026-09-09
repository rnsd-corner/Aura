export interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  durationSec: number;
  genre: string;
  coverUrl: string;
  releaseYear: number;
  catalogCode: string;
  format: string;
  bpm: number;
  key: string;
  audioFrequency?: number[];
  description?: string;
}

export interface Artist {
  id: string;
  name: string;
  genre: string;
  origin: string;
  bio: string;
  imageUrl: string;
  featuredTrackId: string;
  releasesCount: number;
  quote?: string;
  activeSince: string;
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  year: number;
  format: string;
  coverUrl: string;
  tracksCount: number;
  duration: string;
  catalogCode: string;
  description: string;
}

export interface Category {
  id: string;
  title: string;
  tag: string;
  description: string;
  accent?: string;
  imageUrl?: string;
  span?: string;
  vibeText?: string;
}

export interface Mood {
  id: string;
  title: string;
  tagline: string;
  tempo: string;
  associatedGenre: string;
  recommendedTrackId: string;
}
