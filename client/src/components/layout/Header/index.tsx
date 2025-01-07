import {FC} from "react";
import {useAuth} from "@/context/auth";
import {Button} from "@components/common/Button";
import {ProjectRequests} from "@components/dashboard/ProjectRequests"

export const Header: FC = () => {
    const {logout} = useAuth();

    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <h1 className="text-xl font-bold">Project Management Tool</h1>
            <div className="flex justify-end gap-10 ">
                <ProjectRequests/>
                <Button
                    onClick={logout}
                    label="Logout"
                    className="bg-red-500 hover:bg-red-600"
                />
            </div>
        </header>
    )
};