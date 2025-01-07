import React, {FC} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Modal} from "@components/common/Modal/index";
import {Button} from "@components/common/Button/index";
import {Input} from "@components/common/Input/index";
import {TextArea} from "@components/common/TextArea/index";
import {Select} from "@components/common/Select/index";

import {ProjectMember, TaskFormData, TaskStatus} from "@/types/dashboard/index";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => Promise<any>;
    taskStatuses: TaskStatus[];
    projectMembers: ProjectMember[];
}

export const TaskCreateModal: FC<ModalProps> = ({isOpen, onClose, onSubmit, projectMembers, taskStatuses}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<TaskFormData>();

    const handleFormSubmit: SubmitHandler<TaskFormData> = async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Task"
        >
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <Input
                    label="Title"
                    type="text"
                    name="title"
                    register={register("title", {required: "Title is required"})}
                    error={errors.title}
                />
                <TextArea
                    label="Body"
                    name="body"
                    register={register("body", {required: "Body is required"})}
                    error={errors.body}
                />
                <Select
                    label="Status ID"
                    name="statusId"
                    options={
                        [
                            {value: "", label: "Status"},
                            ...(taskStatuses.map((status) => {
                                return {value: String(status.id), label: status.title}
                            }))
                        ]
                    }
                    register={register("statusId", {required: "Status ID is required"})}
                    error={errors.statusId}
                />

                {/*taskStatuses*/}

                <Select
                    label="Assigned To"
                    name="assignedTo"
                    options={
                        [
                            {value: "", label: "Assigned to"},
                            ...(projectMembers.map((member) => {
                                return {value: String(member.id), label: member.name}
                            }))
                        ]
                    }
                    register={register("assignedTo", {required: "Assigned To is required"})}
                    error={errors.assignedTo}
                />

                <Input
                    label="Deadline"
                    type="date"
                    name="deadline"
                    register={register("deadline", {required: "Deadline is required"})}
                    error={errors.deadline}
                />
                <Select
                    label="Priority"
                    name="priority"
                    options={[
                        {value: "", label: "Select Priority"},
                        {value: "1", label: "High"},
                        {value: "2", label: "Medium"},
                        {value: "3", label: "Low"},
                    ]}
                    register={register("priority", {required: "Priority is required"})}
                    error={errors.priority}
                />
                <div className="flex justify-end">
                    <Button
                        type="submit"
                        className="btn-primary"
                        label="Create Task"
                    />
                </div>
            </form>
        </Modal>
    );
};
