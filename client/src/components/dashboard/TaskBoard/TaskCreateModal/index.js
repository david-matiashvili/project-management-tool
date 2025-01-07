import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { Modal } from "@components/common/Modal/index.js";
import { Button } from "@components/common/Button/index.js";
import { Input } from "@components/common/Input/index.js";
import { TextArea } from "@components/common/TextArea/index.js";
import { Select } from "@components/common/Select/index.js";
export const TaskCreateModal = ({ isOpen, onClose, onSubmit, projectMembers, taskStatuses }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    };
    if (!isOpen)
        return null;
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Create Task", children: _jsxs("form", { onSubmit: handleSubmit(handleFormSubmit), className: "space-y-4", children: [_jsx(Input, { label: "Title", type: "text", name: "title", register: register("title", { required: "Title is required" }), error: errors.title }), _jsx(TextArea, { label: "Body", name: "body", register: register("body", { required: "Body is required" }), error: errors.body }), _jsx(Select, { label: "Status ID", name: "statusId", options: [
                        { value: "", label: "Status" },
                        ...(taskStatuses.map((status) => {
                            return { value: String(status.id), label: status.title };
                        }))
                    ], register: register("statusId", { required: "Status ID is required" }), error: errors.statusId }), _jsx(Select, { label: "Assigned To", name: "assignedTo", options: [
                        { value: "", label: "Assigned to" },
                        ...(projectMembers.map((member) => {
                            return { value: String(member.id), label: member.name };
                        }))
                    ], register: register("assignedTo", { required: "Assigned To is required" }), error: errors.assignedTo }), _jsx(Input, { label: "Deadline", type: "date", name: "deadline", register: register("deadline", { required: "Deadline is required" }), error: errors.deadline }), _jsx(Select, { label: "Priority", name: "priority", options: [
                        { value: "", label: "Select Priority" },
                        { value: "1", label: "High" },
                        { value: "2", label: "Medium" },
                        { value: "3", label: "Low" },
                    ], register: register("priority", { required: "Priority is required" }), error: errors.priority }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", className: "btn-primary", label: "Create Task" }) })] }) }));
};
