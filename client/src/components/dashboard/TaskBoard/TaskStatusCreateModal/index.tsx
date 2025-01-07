import React, {FC} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Button} from "@components/common/Button/index";
import {Modal} from "@components/common/Modal/index";
import {Input} from "@components/common/Input/index";
import {TaskStatusFormData} from "@/types/dashboard/index"

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TaskStatusFormData) => Promise<any>;
}

export const TaskStatusCreateModal: FC<ModalProps> = ({isOpen, onClose, onSubmit}) => {
    const {register, handleSubmit, formState: {errors}, reset} = useForm<TaskStatusFormData>();

    const handleFormSubmit: SubmitHandler<TaskStatusFormData> = async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create Task Status">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">

                <Input label="Title" name="title" register={{...register("title", {required: "Title is required"})}}
                       type="text" error={errors.title} placeholder="Task Status Title"/>

                <Input label="Color" name="color" register={{...register("color", {required: "Color is required"})}}
                       type="color" error={errors.color} placeholder="Task Status Title"/>

                <div className="flex justify-end">
                    <Button type="submit" className="btn-primary" label="Create Task Status"/>
                </div>
            </form>
        </Modal>
    );
};
