import {ExclamationTriangleIcon} from '@heroicons/react/24/outline'
import {useNavigate} from 'react-router-dom'

import {useAppDispatch} from '../../../app/hooks'
import {Button} from '../../../components/common/Button'
import {Card} from '../../../components/common/Card/Card'
import {Form} from '../../../components/common/Forms/Form'
import {FormInput} from '../../../components/common/Forms/FormInput'
import {useForm} from '../../../hooks/useForm'
import AuthFooter from '../../../layouts/AuthLayout/AuthFooter'
import {rtkError} from '../../../utils/utils'
import {
    loginSchema,
    useLazyGetProfileQuery,
    useLoginMutation,
} from '../authApiSlice'
import {setUser} from '../authSlice'


const PageLogin = () => {
    const [login, {isLoading, isError, error}] = useLoginMutation()
    const [getProfile] = useLazyGetProfileQuery()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const form = useForm({
        schema: loginSchema,
    })

    const handleLoginFormSubmit = async () => {
        try {
            const formData = form.getValues()
            await login(formData)
            handleSuccess()
        } catch (err) {
            console.error('Error:', err)
        }
    }

    const handleSuccess = () => {
        getProfile().then((userData) => {
            if (userData.status === 'fulfilled') {
                dispatch(setUser({
                    user: {
                        id: userData.data.id,
                        username: userData.data.username,
                        email: userData.data.email
                    }
                }))
                navigate('/')
            }
        })
    }
    return (
        <div className='flex w-full flex-col justify-between'>
            <Card className='w-full h-fit lg:w-[100%] px-5 py-16 md:px-20'>
                <div>
                    <h2 className=' text-3xl leading-9 tracking-tight text-gray-800'>
                        Sign in to your account
                    </h2>
                </div>
                <div className='mt-6'>
                    <div>
                        <Form
                            form={form}
                            noValidate
                            onSubmit={handleLoginFormSubmit}
                            className='space-y-6'
                        >
                            <FormInput
                                label='Username'
                                id='username'
                                type='text'
                                required
                                {...form.register('username')}
                            />
                            <FormInput
                                label='Password'
                                id='password'
                                type='password'
                                required
                                {...form.register('password')}
                            />
                            {isError && (
                                <p className='text-danger text-sm mt-1 font-semibold'>
                                    <ExclamationTriangleIcon
                                        height={13}
                                        className={'inline mr-1'}
                                    />
                                    {rtkError(error)}
                                </p>
                            )}

                            <div className={'flex flex-col gap-4'}>
                                <Button
                                    className=' flex w-full justify-center rounded-md bg-secondary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary'
                                    size={'xl'}
                                    disabled={isLoading}
                                    htmlType='submit'
                                >
                                    {isLoading ? 'Loading...' : 'Continue'}
                                </Button>
                                <span className='text-xs font-light text-gray-500 leading-6'>
                  By clicking Continue, you agree to the Terms of Service, Terms of Use and have read and acknowledge
                  our Privacy Statement.
                </span>
                            </div>
                        </Form>
                    </div>
                </div>
            </Card>
            <AuthFooter withDetails/>
        </div>
    )
}

export default PageLogin
