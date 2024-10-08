import type { PayloadAction } from '@reduxjs/toolkit'

import { createAppSlice } from '../../app/createAppSlice'
export interface IUser {
  id: number
  username: string
  email: string
  created_at?: string
  updated_at?: string
}
// export interface IUserForm extends Omit<IUser, 'id'> {
//   password: string
// }
export const initUser: IUser = {
  id: 1,
  username: 'test',
  email: 'test@test.com',
}

type AuthState = {
  user: IUser | null
}
// Disabled auth. to regain it set user to null in initialState
export const authSlice = createAppSlice({
  name: 'auth',
  initialState: {
    user: initUser,
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
