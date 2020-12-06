const compareMovieAsc = (a, b) => {
    if (a.title < b.title) return -1;
    if (a.title > b.title) return 1;
    return 0;
}

const compareMovieDesc = (a, b) => {
    if (a.title < b.title) return 1;
    if (a.title > b.title) return -1;
    return 0;
}

const compareMovieByPopularity = (a, b) => {
    if (a.popularity < b.popularity) return -1;
    if (a.popularity > b.popularity) return 1;
    return 0;
}

const sortMoviesByAtoZ = (movies) => {
    return [...movies.sort(compareMovieAsc)];
}

const sortMoviesByZtoA = (movies) => {
    return [...movies.sort(compareMovieDesc)];
}

const sortMoviesByPopularity = (movies) => {
    return [...movies.sort(compareMovieByPopularity)];
}

export { sortMoviesByAtoZ, sortMoviesByZtoA, sortMoviesByPopularity }