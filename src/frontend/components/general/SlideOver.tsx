import { forwardRef, Fragment, useEffect, useImperativeHandle, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XIcon } from '@heroicons/react/outline'

const SlideOver = ({ children, title, description, isOpen, setIsOpen }: any) => {

    const [open, setOpen] = useState(false)

    useEffect(() => {
        setOpen(isOpen)
    }, [isOpen])



    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
                <div className="fixed inset-0" />

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                                    <div className="flex h-full flex-col bg-white shadow-xl rounded-tl-xl">
                                        {/* Header */}
                                        <div className=" bg-gradient-to-r from-primary to-primary-dark rounded-tl-xl px-4 py-6 sm:px-6 shadow-lg">
                                            <div className="flex items-start justify-between space-x-3">
                                                <div className="space-y-1">
                                                    <Dialog.Title className="text-lg font-medium text-white"> {title} </Dialog.Title>
                                                    <p className="text-sm text-gray-100">
                                                        {description}
                                                    </p>
                                                </div>
                                                <div className="flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="text-gray-50 hover:text-gray-100"
                                                        onClick={() => setIsOpen(false)}
                                                    >
                                                        <span className="sr-only">Close panel</span>
                                                        <XIcon className="h-6 w-6" aria-hidden="true" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="relative overflow-y-scroll flex-1 px-4 sm:px-6">
                                            <div className="absolute inset-0 px-4 py-5 sm:px-6">
                                                {children}
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    )

}
export default SlideOver;