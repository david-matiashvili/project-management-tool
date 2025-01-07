import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@components/common/Modal/index";
import { Button } from "@components/common/Button/index";
import { Input } from "@components/common/Input/index";
import { TextArea } from "@components/common/TextArea/index";
import { Select } from "@components/common/Select/index";
import { convertDateToInput } from "@/helpers/convertDateToInput";
import { getTask } from "@api/task/index";
export const TaskInfoModal = ({ isOpen, onClose, onSubmit, onDelete, taskStatuses, projectMembers, userRole, taskId, selectedProjectId, }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    // const [taskInfo, setTaskInfo] = useState<Task | null>(null);
    const [creatorName, setCreatorName] = useState("");
    useEffect(() => {
        const handleGetTaskInfo = async () => {
            if (!taskId)
                return;
            const { data } = await getTask(selectedProjectId, taskId);
            if (data) {
                reset({ ...data, deadline: convertDateToInput(data.deadline) });
                // setTaskInfo(data);
                const creatorInfo = projectMembers.find((member) => {
                    if (member.id === data.creator) {
                        return true;
                    }
                });
                setCreatorName(creatorInfo?.name);
                return;
            }
            reset({}); // Reset the form with the taskInfo prop when the modal opens
        };
        handleGetTaskInfo();
    }, [isOpen, taskId, reset]);
    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    };
    const handleOnDelete = async (id) => {
        await onDelete(id);
        reset();
        onClose();
    };
    if (!isOpen)
        return null;
    return (_jsxs(Modal, { isOpen: isOpen, onClose: onClose, title: "Task Info", size: "large", children: [_jsxs("h3", { children: ["Created by: ", creatorName, " "] }), _jsxs("form", { onSubmit: handleSubmit(handleFormSubmit), className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(Input, { label: "Title", type: "text", name: "title", register: register("title", { required: "Title is required" }), error: errors.title, disabled: userRole === 'user' }), _jsx(TextArea, { label: "Body", name: "body", register: register("body", { required: "Body is required" }), error: errors.body, disabled: userRole === 'user' })] }), _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsx(Select, { label: "Status", name: "statusId", options: [
                                    { value: "", label: "Status" },
                                    ...(taskStatuses.map((status) => ({
                                        value: String(status.id),
                                        label: status.title
                                    })))
                                ], register: register("statusId", { required: "Status is required" }), error: errors.statusId, disabled: userRole === 'user' }), _jsx(Select, { label: "Assigned To", name: "assignedTo", options: [
                                    { value: "", label: "Assigned to" },
                                    ...(projectMembers.map((member) => ({
                                        value: String(member.id),
                                        label: member.name
                                    })))
                                ], register: register("assignedTo", { required: "Assigned To is required" }), error: errors.assignedTo, disabled: userRole === 'user' })] }), _jsxs("div", { className: "grid grid-cols-2 gap-6", children: [_jsx(Input, { label: "Deadline", type: "date", name: "deadline", register: register("deadline", { required: "Deadline is required" }), error: errors.deadline, disabled: userRole === 'user' }), _jsx(Select, { label: "Priority", name: "priority", options: [
                                    { value: "", label: "Select Priority" },
                                    { value: "1", label: "High" },
                                    { value: "2", label: "Medium" },
                                    { value: "3", label: "Low" },
                                ], register: register("priority", { required: "Priority is required" }), error: errors.priority, disabled: userRole === 'user' })] }), _jsxs("div", { className: "flex justify-between mt-6 space-x-4", children: [_jsx("div", { className: "flex justify-start items-center", children: _jsx(Button, { onClick: async () => {
                                        await handleOnDelete(taskId);
                                    }, className: "btn-danger", label: "Delete Task", type: "button" }) }), _jsxs("div", { className: "flex justify-end items-center", children: [_jsx(Button, { onClick: onClose, className: "btn-secondary", label: "Cancel" }), _jsx(Button, { type: "submit", className: "btn-primary", label: "Save Changes", disabled: userRole === 'user' })] })] })] })] }));
};
