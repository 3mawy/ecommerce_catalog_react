import {z} from 'zod'

import {apiSlice} from '../apiSlice'
import {IUser} from './authSlice'

export const loginSchema = z.object({
    username: z.string(),
    password: z
        .string()
        .min(8, { message: 'Your password must be at least 8 characters.' }),
})

type LoginRequest = z.infer<typeof loginSchema>;

interface LoginResponse {
    refresh: string
    access: string
}

interface RegisterRequest {
    email: string
    username: string
    password: string
    password_confirmation: string
}

interface RegisterResponse {
    username: string
    email: string
}

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (credentials) => ({
                url: '/login/',
                method: 'POST',
                body: {
                    username: credentials.username,
                    password: credentials.password,
                },
            }),
        }),
        signup: builder.mutation<RegisterResponse, RegisterRequest>({
            query: (body) => ({
                url: '/register/',
                method: 'POST',
                body: {
                    username: body.username,
                    email: body.email,
                    password: body.password,
                    password_confirmation: body.password_confirmation,
                },
            }),
        }),
        getProfile: builder.query<IUser, void>({
            query: () => ({
                url: 'profile',
                providesTags: ['Profile'],
            }),
        }),

    }),
})
export const {
    useLazyGetProfileQuery,
    useLoginMutation,
} = authApiSlice
