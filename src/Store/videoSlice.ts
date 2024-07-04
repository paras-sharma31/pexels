import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoFile {
    id: number;
    link: string;
    quality: string;
    file_type: string;
    width: number;
    height: number;
}

interface Video {
    id: number;
    image: string;
    video_files: VideoFile[];
}

interface VideoState {
    search: string;
    data: Video[];
    categoryVideos: Video[];
    videoModal: Video[];
    page: number;
    hasMore: boolean;
    loading: boolean;
    error: string | null;
}

const initialState: VideoState = {
    search: '',
    data: [],
    categoryVideos: [],
    videoModal: [],
    page: 1,
    hasMore: true,
    loading: false,
    error: null,
};

const API_KEY = '02wi5tyrD8RwVUUbF67fgSewQhDKkBV2GCModFOl7J8TMepj7D1n1BbP';

export const fetchPopularVideos = createAsyncThunk('videos/fetchPopularVideos', async (page: number) => {
    const response = await fetch(`https://api.pexels.com/videos/popular?&page=${page}per_page`, {
        headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    console.log(result, 'result')
    return { videos: result.videos, page };
});

export const fetchSearchVideos = createAsyncThunk(
    'videos/fetchVideos',
    async ({ query, page }: { query: string; page: number }) => {
        const response = await fetch(`https://api.pexels.com/videos/search?query=${query}&per_page=6&page=${page}`, {
            headers: {
                'Authorization': API_KEY,
                'Content-Type': 'application/json',
            },
        });
        const result = await response.json();
        return { videos: result.videos, page };
    }
);

export const fetchSingleVideo = createAsyncThunk('videos/fetchSignleVideo', async (id: number) => {
    const response = await fetch(`https://api.pexels.com/videos/videos/${id}`, {
        headers: {
            'Authorizaion': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    return result;
})

const videoSlice = createSlice({
    name: 'videos',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload.trim().toLowerCase();
            state.page = 1;
            state.data = [];
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPopularVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPopularVideos.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, ...action.payload.videos];
                state.page = action.payload.page + 1;
                if (action.payload.videos.length === 0) {
                    state.hasMore = false;
                }
            })
            .addCase(fetchPopularVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })

            //search
            .addCase(fetchSearchVideos.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchSearchVideos.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.page === 1) {
                    state.categoryVideos = (action.payload.videos);
                } else {
                    state.categoryVideos = [...state.categoryVideos, ...action.payload.videos]
                }
                state.page = action.payload.page;
                if (action.payload.videos === 0) {
                    state.hasMore = false;
                }

            })
            .addCase(fetchSearchVideos.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Something went wrong';
            })

            .addCase(fetchSingleVideo.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSingleVideo.fulfilled, (state, action) => {
                state.loading = false;
                state.videoModal = [action.payload];
            })


    },
});

export const { setSearch } = videoSlice.actions;
export default videoSlice.reducer;
