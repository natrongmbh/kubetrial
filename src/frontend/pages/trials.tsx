import { PlusIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Button, { ButtonType } from "../components/general/Button";
import SlideOver from "../components/general/SlideOver";
import Title from "../components/general/Title";
import CreateTrialsForm from "../components/trials/CreateTrialsForm";
import TrialsList from "../components/trials/TrialsList";

const Trial = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <SlideOver
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                title="Create Trial"
                description="Get started by creating an trial for your app."
            >
                <CreateTrialsForm
                    setIsOpen={setIsOpen}
                />
            </SlideOver>
            <div
                className="mb-10"
            >
                <Title>
                    Trials
                </Title>
                <p className="text-md mb-10 text-gray-600 sm:text-center px-2">
                    Trials are temporary deployments of your helm app. <br className="sm:block hidden"/>
                    You can create a trial for each app that you have created.
                </p>
                <Button
                    buttonText="Create Trial"
                    onClick={() => setIsOpen(true)}
                    buttonType={ButtonType.PrimaryOutline}
                    buttonIcon={<PlusIcon className="w-5 h-5" />}
                />
            </div>

            <div
                className="sm:max-w-3xl max-w-full mx-auto "
            >
                <TrialsList />
            </div>
        </div>
    );
}

export default Trial;