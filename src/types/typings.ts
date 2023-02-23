export interface MovieResponse {
  page: number;
  results: MovieDetails[] | MovieDetails;
  type: string;
}

export interface TVResponse {
  page: number;
  results: TVDetails[] | TVDetails;
  type: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ProdCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface ProdCountry {
  iso_3166_1: string;
  name: string;
}

interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Videos {
  results: [
    {
      iso_639_1: string;
      iso_3166_1: string;
      name: string;
      key: string;
      site: string;
      size: number;
      type: string;
      official: boolean;
      published_at: Date;
      id: string;
    }
  ];
}
export interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProdCompany[];
  production_countries: ProdCountry[];
  release_date: number;
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos?: Videos;
}

interface PersonDetails {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

interface Genre {
  id: number;
  name: string;
}

interface TVEpisodeDetails {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: number;
  season_number: number;
  still_path: string;
  vote_average: number;
  vote_count: number;
}

interface TVEpisodeSeason {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

interface Networks {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface TVDetails {
  backdrop_path: string;
  created_by: PersonDetails[];
  episode_run_time: number[];
  first_air_date: number;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: false;
  languages: string[];
  last_air_date: number;
  last_episode_to_air: TVEpisodeDetails;
  name: string;
  next_episode_to_air: string;
  networks: Networks[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProdCompany[];
  production_countries: ProdCountry[];
  seasons: TVEpisodeSeason[];
  spoken_languages: Language[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
  videos?: Videos;
}
