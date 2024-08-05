import type { PayloadAction } from '@reduxjs/toolkit'

import { createAppSlice } from '../../app/createAppSlice'
export interface IUser {
  id: number
  username: string
  email: string
  created_at?: string
  updated_at?: string
}
export interface IUserForm extends Omit<IUser, 'id'> {
  password: string
}
export const initUser: IUserForm = {
  username: '',
  email: '',
  password: '',
}

type AuthState = {
  user: IUser | null
}

export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    user: null,
  } as AuthState,
  reducers: {
    setUser: (
      state,
      { payload: { user } }: PayloadAction<{ user: IUser | null }>,
    ) => {
      state.user = user
    },
  },
  selectors: {
    selectCurrentUser: auth => auth.user,
  },
})

export const {
  setUser,
} = authSlice.actions
export const {
  selectCurrentUser,
} = authSlice.selectors
