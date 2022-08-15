import { PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import AppsList from "../components/apps/AppsList";
import CreateAppsForm from "../components/apps/CreateAppForm";
import Button, { ButtonType } from "../components/general/Button";
import Modal from "../components/general/Modal";
import SlideOver from "../components/general/SlideOver";
import Title from "../components/general/Title";

const Apps = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <SlideOver
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Create App"
                description="Get started by creating an app and adding a HELM chart."
            >
                <CreateAppsForm
                    setIsOpen={setIsOpen}
                />
            </SlideOver>
            <div
                className="mb-10"
            >
                <Title>
                    Apps
                </Title>
                <p className="text-md mb-10 text-gray-600 sm:text-center px-2">
                    Apps depend on the Helm chart that you want to use. <br className="sm:block hidden"/>
                    You can define which values to use for the Trial Form.
                </p>
                <Button
                    buttonText="Create App"
                    onClick={() => setIsOpen(true)}
                    buttonType={ButtonType.PrimaryOutline}
                    buttonIcon={<PlusIcon className="w-5 h-5" />}
                />
            </div>

            <div
                className="sm:max-w-3xl max-w-full mx-auto "
            >
                <AppsList />
            </div>
        </div>
    );
}

export default Apps;