export default interface IEditRequest {
  tmdbId: number;
  backdropPath?: string;
  genre: string;
  director: string;
  title: string;
  overview: string;
  posterPath?: string;
  year: string;
  voteAverage: number;
  voteCount: number;
}
