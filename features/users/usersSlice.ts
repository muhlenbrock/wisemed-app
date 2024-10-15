import { RootState } from '@/store/store';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const API_URL = 'https://jsonplaceholder.typicode.com/';
  const response = await axios.get(API_URL + '/users');
  return response.data;
});

const initialState = {
  userList: {
    data: [] as UserInfo[],
    loading: false,
    error: null as string | null
  }
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.userList.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.userList.data.push(...action.payload);
        state.userList.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.userList.loading = false;
        state.userList.error = action.error.message ?? 'Unknown Error';
      });
  }
});

export default userSlice.reducer;

export const userListData = (state: RootState) => state.user.userList.data;
export const userListLoading = (state: RootState) => state.user.userList.loading;
