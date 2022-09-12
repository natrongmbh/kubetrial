import { LockClosedIcon } from '@heroicons/react/solid'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { useUserContext } from '../../contexts/userContext'
import { AlertType, DefaultAlertMessage } from '../alerts/Alerts'
import Button, { ButtonType } from '../general/Button'

export default function LoginForm() {

    const { loginUser }: any = useUserContext();
    const router = useRouter();

    const [username, setUsername] = useState(Cookies.get('username') || '');
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        if (username && password) {
            try {
                await loginUser(username, password, remember);
                router.push('/overview')
            } catch (error: any) {
                // if connection error
                if (error.response.data !== undefined) {
                    DefaultAlertMessage('Login failed', error.response.data, AlertType.Error)
                } else {
                    DefaultAlertMessage('Connection error', error.message, AlertType.Error)
                }
            }
        } else {
            DefaultAlertMessage('Error', 'Please fill in a valid E-Mail and Password', AlertType.Error)
        }
    }


    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <div
                            className="h-32 w-32 relative m-auto mb-5"
                        >
                            <Image
                                className="pointer-events-none"
                                src="/images/logo/kubetrial_logo_color.png"
                                alt="KubeTrial Logo"
                                objectFit="contain"
                                layout="fill"
                                priority={true}
                            />
                        </div>
                        <h2 className="mt-6 text-center text-3xl tracking-tight font-GilroyBold text-primary">
                            KubeTrial
                        </h2>
                        <p className="mt-2 text-center text-sm text-gray-600">
                            A Kubernetes Application Trial Management Tool
                        </p>
                    </div>
                    <div className="mt-8 space-y-6">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="text"
                                    value={username}
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmit(e)
                                        }
                                    }}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            handleSubmit(e)
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                                    onChange={(e) => setRemember(e.target.checked)}
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="/trialcode" className="font-medium text-primary hover:text-primary">
                                    Got a trial code?
                                </a>
                            </div>
                        </div>

                        <div>
                            <Button
                                buttonText='Log In'
                                buttonType={ButtonType.Primary}
                                buttonIcon={<LockClosedIcon className='w-5 h-5' />}
                                widthString='w-full'
                                onClick={handleSubmit}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
