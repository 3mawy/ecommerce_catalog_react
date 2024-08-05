import {
    Action,
    combineSlices,
    configureStore,
    isRejectedWithValue,
    Middleware,
    PayloadAction,
    SerializedError,
    ThunkAction,
} from '@reduxjs/toolkit'
import {FetchBaseQueryError, setupListeners} from '@reduxjs/toolkit/query'
import {persistReducer, persistStore} from 'redux-persist'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
} from 'redux-persist/es/constants'
import storage from 'redux-persist/lib/storage'

import {IResponseError} from '../configs/client'
import {apiSlice} from '../features/apiSlice'
import {
    authSlice,
    setUser,
} from '../features/auth/authSlice'
import {
    filterSlice,
} from '../features/filter/filterSlice'
import {paginationSlice} from '../features/pagination/paginationSlice'
import toast from '../utils/toast'
import {
    hasUnauthenticatedErrorMessage,
    rtkError,
} from '../utils/utils'

const authPersistConfig = {
    key: 'auth',
    storage,
}
const filtersPersistConfig = {
    key: 'filters',
    storage,
}

const persistedAuthReducer = persistReducer(
    authPersistConfig,
    authSlice.reducer,
)
const persistedFiltersReducer = persistReducer(
    filtersPersistConfig,
    filterSlice.reducer,
)


const rootReducer = combineSlices({
    api: apiSlice.reducer,
    auth: persistedAuthReducer,
    filters: persistedFiltersReducer,
    pagination: paginationSlice.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
    const store = configureStore({
        reducer: rootReducer,
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                },
            }).concat(
                apiSlice.middleware,
                handleUnauthenticatedMiddleware,
                rtkQueryErrorMiddleware,
            ),
        preloadedState,
    })
    setupListeners(store.dispatch)
    return store
}

let unauthenticatedErrorDisplayed = false

const handleUnauthenticatedMiddleware: Middleware =
    ({dispatch}) =>
        next =>
            (action: unknown) => {
                if (
                    hasUnauthenticatedErrorMessage(action as PayloadAction<IResponseError>)
                ) {
                    if (!unauthenticatedErrorDisplayed) {
                        dispatch(setUser({user: null}))
                        unauthenticatedErrorDisplayed = true
                    }
                }
                return next(action)
            }


export const rtkQueryErrorMiddleware: Middleware = () => {
    let errorIds = new Set<string>() // Initialize set to store unique error identifiers
    return next => action => {
        if (isRejectedWithValue(action)) {
            const error = action.payload as FetchBaseQueryError | SerializedError
            const errorId = JSON.stringify(error) // Unique identifier for the error

            if (!errorIds.has(errorId)) {
                toast.error({
                    title: 'Error',
                    description: rtkError(error) || 'An error occurred',
                })
                errorIds.add(errorId)
            }
        } else {
            errorIds = new Set<string>()
        }
        return next(action)
    }
}

export const store = makeStore()
export const persistor = persistStore(store)

export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
    ThunkReturnType,
    RootState,
    unknown,
    Action
>
