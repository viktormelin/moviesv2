import type { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

interface Results {
	adult: boolean;
	backdrop_path: string;
	genre_ids: string[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
}

interface MovieResponse {
	page: number;
	results: Results[];
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	const currentDate = dayjs();
	const modifiedDate = currentDate.subtract(1, 'month').format('YYYY-MM-DD');
	const formattedCurrentDate = currentDate.format('YYYY-MM-DD');

	const response = await fetch(
		`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY_V3}&language=en-US&primary_release_date.gte=${modifiedDate}&primary_release_date.lte=${formattedCurrentDate}`
	);

	if (response.status === 200) {
		const json = (await response.json()) as MovieResponse;
		res.status(200).json(json);
	}
};

export default handler;
