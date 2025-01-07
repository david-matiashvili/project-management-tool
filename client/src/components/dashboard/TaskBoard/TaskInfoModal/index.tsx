import React, {FC, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Modal} from "@components/common/Modal/index";
import {Button} from "@components/common/Button/index";
import {Input} from "@components/common/Input/index";
import {TextArea} from "@components/common/TextArea/index";
import {Select} from "@components/common/Select/index";
import {convertDateToInput} from "@/helpers/convertDateToInput";

import {ProjectMember, TaskInfo, TaskFormData, TaskStatus} from "@/types/dashboard/index";
import {getTask} from "@api/task/index";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => Promise<any>;
    onDelete: (id: number | undefined) => Promise<void>;
    taskStatuses: TaskStatus[];
    projectMembers: ProjectMember[];
    userRole: string; // Role of the current user (e.g., 'manager', 'user')
    taskId?: number;
    selectedProjectId: number;
}

export const TaskInfoModal: FC<ModalProps> = ({
                                                  isOpen,
                                                  onClose,
                                                  onSubmit,
                                                  onDelete,
                                                  taskStatuses,
                                                  projectMembers,
                                                  userRole,
                                                  taskId,
                                                  selectedProjectId,
                                              }) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<TaskInfo>();
    // const [taskInfo, setTaskInfo] = useState<Task | null>(null);
    const [creatorName, setCreatorName] = useState<string | undefined>("");

    useEffect(() => {
        const handleGetTaskInfo: () => Promise<void> = async () => {
            if (!taskId) return;
            const {data} = await getTask(selectedProjectId, taskId);
            if (data) {
                reset({...data, deadline: convertDateToInput(data.deadline)});
                // setTaskInfo(data);
                const creatorInfo = projectMembers.find((member) => {
                        if (member.id === data.creator) {
                            return true;
                        }
                    }
                )
                setCreatorName(creatorInfo?.name)
                return;
            }
            reset({}); // Reset the form with the taskInfo prop when the modal opens
        }

        handleGetTaskInfo();

    }, [isOpen, taskId, reset]);

    const handleFormSubmit: SubmitHandler<TaskFormData> = async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    };

    const handleOnDelete: (id: number | undefined) => Promise<void> = async (id) => {
        await onDelete(id);
        reset();
        onClose();
    }

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Task Info"
            size="large"
        >
            <h3>Created by: {creatorName} </h3>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <div className="space-y-4">
                    <Input
                        label="Title"
                        type="text"
                        name="title"
                        register={register("title", {required: "Title is required"})}
                        error={errors.title}
                        disabled={userRole === 'user'} // Disable for users with 'user' role
                    />
                    <TextArea
                        label="Body"
                        name="body"
                        register={register("body", {required: "Body is required"})}
                        error={errors.body}
                        disabled={userRole === 'user'} // Disable for users with 'user' role
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <Select
                        label="Status"
                        name="statusId"
                        options={[
                            {value: "", label: "Status"},
                            ...(taskStatuses.map((status) => ({
                                value: String(status.id),
                                label: status.title
                            })))
                        ]}
                        register={register("statusId", {required: "Status is required"})}
                        error={errors.statusId}
                        disabled={userRole === 'user'} // Disable for users with 'user' role
                    />
                    <Select
                        label="Assigned To"
                        name="assignedTo"
                        options={[
                            {value: "", label: "Assigned to"},
                            ...(projectMembers.map((member) => ({
                                value: String(member.id),
                                label: member.name
                            })))
                        ]}
                        register={register("assignedTo", {required: "Assigned To is required"})}
                        error={errors.assignedTo}
                        disabled={userRole === 'user'} // Disable for users with 'user' role
                    />
                </div>

                <div className="grid grid-cols-2 gap-6">
                    <Input
                        label="Deadline"
                        type="date"
                        name="deadline"
                        register={register("deadline", {required: "Deadline is required"})}
                        error={errors.deadline}

                        disabled={userRole === 'user'} // Disable for users with 'user' role
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
                        disabled={userRole === 'user'} // Disable for users with 'user' role
                    />
                </div>

                <div className="flex justify-between mt-6 space-x-4">
                    <div className="flex justify-start items-center">
                        <Button
                            onClick={async () => {
                                await handleOnDelete(taskId);
                            }}
                            className="btn-danger"
                            label="Delete Task"
                            type="button"
                        />
                    </div>

                    <div className="flex justify-end items-center">
                        <Button
                            onClick={onClose}
                            className="btn-secondary"
                            label="Cancel"
                        />
                        <Button
                            type="submit"
                            className="btn-primary"
                            label="Save Changes"
                            disabled={userRole === 'user'} // Disable for users with 'user' role
                        />
                    </div>
                </div>
            </form>
        </Modal>
    );
};
