import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Photo {
    id: number | null,
    src: {
        original: string,
        portrait: string,
        large: string,
    };
    alt: string;
    photographer: string;
}

export interface ImagesSlice {
    search: string,
    data: Photo[],
    imageCategoryData: Photo[],
    imageModalBox: Photo[]
    page: number,
    hasMore: boolean,
    loading: boolean,
}

const initialState: ImagesSlice = {
    search: '',
    data: [],
    imageCategoryData: [],
    imageModalBox: [],
    page: 1,
    hasMore: true,
    loading: false,
};

const API_KEY = '02wi5tyrD8RwVUUbF67fgSewQhDKkBV2GCModFOl7J8TMepj7D1n1BbP';

//fetchdata main
export const fetchData = createAsyncThunk('data/fetch', async (page: number,) => {
    const response = await fetch(`https://api.pexels.com/v1/curated?page=${page}&per_page=6`, {
        headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return { photos: result.photos, page };
});

//search with image category
export const searchData = createAsyncThunk('pixel/search', async ({ query, page }: { query: string, page: number }) => {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=6&page=${page}`, {
        headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const result = await response.json();
    return { photos: result.photos, page };
});

//fetch single photo
export const fetchSinglePhoto = createAsyncThunk('pixel/photos', async (id: number) => {
    const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
        headers: {
            'Authorization': API_KEY,
            'Content-Type': 'application/json',
        },
    });
    const result = await response.json();
    return result;
});
const imagelSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload.trim().toLowerCase();
            state.imageCategoryData = [];
            state.page = 1;
            state.hasMore = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.loading = false;
                state.data = [...state.data, ...action.payload.photos];
                state.page = action.payload.page + 1;
                if (action.payload.photos.length === 0) {
                    state.hasMore = false;
                }
            })


            // search filter
            .addCase(searchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchData.fulfilled, (state, action) => {
                state.loading = false;
                if (action.payload.page === 1) {
                    state.imageCategoryData = action.payload.photos;
                } else {
                    state.imageCategoryData = [...state.imageCategoryData, ...action.payload.photos];
                }
                state.page = action.payload.page + 1;
                if (action.payload.photos.length === 0) {
                    state.hasMore = false;
                }
            })


            //fetch single photos
            .addCase(fetchSinglePhoto.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSinglePhoto.fulfilled, (state, action) => {
                state.loading = false;
                state.imageModalBox = [action.payload];
            })
    },
});

export const { setSearch } = imagelSlice.actions;
export default imagelSlice.reducer;
