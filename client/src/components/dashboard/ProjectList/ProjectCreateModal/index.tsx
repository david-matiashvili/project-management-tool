import React, {FC} from "react";
import {useForm} from "react-hook-form";
import {ProjectFormData} from "@/types/dashboard/index";
import {FormModal} from "@components/common/FormModal/index";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectFormData) => Promise<void>;
}

export const ProjectCreateModal: FC<ModalProps> = ({isOpen, onClose, onSubmit}) => {
    const {register, handleSubmit, formState: {errors}} = useForm<ProjectFormData>();

    if (!isOpen) return null;

    return (
        <FormModal isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit(onSubmit)} title={"Create a new project"}>
            <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Project Name</label>
                <input
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("name", {required: "Project name is required"})}
                />
                {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>
            <div className="mb-4">
                <label htmlFor="description"
                       className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                    id="description"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("description")}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="board_name" className="block text-sm font-medium text-gray-700">Board
                    Name</label>
                <input
                    id="board_name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    {...register("board_name")}
                />
            </div>
        </FormModal>
    )
        ;
};