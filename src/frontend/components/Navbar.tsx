import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { BeakerIcon, BellIcon, CodeIcon, DesktopComputerIcon, MenuIcon, StarIcon, TemplateIcon, UserIcon, XIcon } from '@heroicons/react/outline'
import { PlusSmIcon } from '@heroicons/react/solid'
import { classNames } from '../lib/design'
import { useUserContext } from '../contexts/userContext'
import { useRouter } from 'next/router'
import Image from 'next/image'

export default function Navbar() {

    const { user, loading }: any = useUserContext();

    const router = useRouter();

    let navigation = [
        { name: 'Overview', href: '/overview', current: router.pathname === '/overview', icon: <TemplateIcon className="h-5 w-5 inline" /> },
        { name: 'Trials', href: '/trials', current: router.pathname === '/trials', icon: <BeakerIcon className="h-5 w-5 inline" /> },
        { name: 'Apps', href: '/apps', current: router.pathname === '/apps', icon: <CodeIcon className="h-5 w-5 inline" /> },
    ]
    
    const userNavigation = [
        { name: 'Settings', href: '/settings' },
        { name: 'Sign out', href: '/logout' },
    ]

    return (
        <Disclosure as="nav" className="bg-white sm:absolute fixed top-0 w-full sm:shadow-sm shadow-lg z-40">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16">
                            <div className="flex">
                                <div className="-ml-2 mr-2 flex items-center md:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">Open main menu</span>
                                        {open ? (
                                            <XIcon className="block h-6 w-6" aria-hidden="true" />
                                        ) : (
                                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                                        )}
                                    </Disclosure.Button>
                                </div>
                                <div className="flex-shrink-0 flex items-center">
                                    <div
                                        className="block lg:hidden h-10 w-10 top-2 relative m-auto mb-5"
                                    >
                                        <Image
                                            className=""
                                            src="/images/logo/kubetrial_logo_color.png"
                                            alt="Workflow"
                                            objectFit="contain"
                                            layout="fill"
                                            priority={true}
                                        />
                                    </div>
                                    <div
                                        className="hidden lg:block h-10 w-10 top-2 relative m-auto mb-5"
                                    >
                                        <Image
                                            className=""
                                            src="/images/logo/kubetrial_logo_color.png"
                                            alt="Workflow"
                                            objectFit="contain"
                                            layout="fill"
                                            priority={true}
                                        />
                                    </div>
                                    <span
                                        className="ml-3 text-xl font-GilroyBold tracking-tight text-primary"
                                    >
                                        KubeTrial
                                    </span>
                                </div>
                                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                                    {navigation.map((item) => (
                                        <a
                                            key={item.name}
                                            href={item.href}
                                            className={classNames(
                                                item.current ? 'bg-gradient-to-r from-primary to-primary-dark text-white' : 'text-black hover:bg-gray-700 hover:text-white',
                                                'px-3 py-2 rounded-md text-sm font-GilroyMedium'
                                            )}
                                            aria-current={item.current ? 'page' : undefined}
                                        >
                                            {item.icon} {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="ml-3 relative">
                                        <div>
                                            <Menu.Button className=" flex text-sm rounded-full ">
                                                <span className="sr-only">Open user menu</span>
                                                <UserIcon className="h-6 w-6" aria-hidden="true" />
                                            </Menu.Button>
                                        </div>
                                        <Transition
                                            as={Fragment}
                                            enter="transition ease-out duration-200"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg  bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                {userNavigation.map((item) => (
                                                    <Menu.Item key={item.name}>
                                                        {({ active }) => (
                                                            <a
                                                                href={item.href}
                                                                className={classNames(
                                                                    active ? 'bg-gray-100' : '',
                                                                    'block px-4 py-2 text-sm text-gray-700'
                                                                )}
                                                            >
                                                                {item.name}
                                                            </a>
                                                        )}
                                                    </Menu.Item>
                                                ))}
                                            </Menu.Items>
                                        </Transition>
                                    </Menu>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Disclosure.Panel className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navigation.map((item) => (
                                <Disclosure.Button
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-black text-white' : 'text-black hover:bg-gray-700 hover:text-white',
                                        'block px-3 py-2 rounded-md text-base font-GilroyMedium shadow-sm border-black border-2'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.icon} {item.name}
                                </Disclosure.Button>
                            ))}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="flex items-center px-5 sm:px-6">
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={user.avatar_url} alt="" />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-GilroyMedium text-black">{user.name}</div>
                                    {/* <div className="text-sm font-GilroyMedium text-gray-500">{user.email}</div> */}
                                </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1 sm:px-3">
                                {userNavigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className="block px-3 py-2 rounded-md text-base font-GilroyMedium text-black shadow-sm border-black border-2"
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                            </div>
                        </div>
                    </Disclosure.Panel>
                </>
            )}
        </Disclosure>
    )
}