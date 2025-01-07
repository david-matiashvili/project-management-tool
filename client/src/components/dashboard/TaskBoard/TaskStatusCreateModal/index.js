import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { Button } from "@components/common/Button/index";
import { Modal } from "@components/common/Modal/index";
import { Input } from "@components/common/Input/index";
export const TaskStatusCreateModal = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    };
    if (!isOpen)
        return null;
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Create Task Status", children: _jsxs("form", { onSubmit: handleSubmit(handleFormSubmit), className: "space-y-4", children: [_jsx(Input, { label: "Title", name: "title", register: { ...register("title", { required: "Title is required" }) }, type: "text", error: errors.title, placeholder: "Task Status Title" }), _jsx(Input, { label: "Color", name: "color", register: { ...register("color", { required: "Color is required" }) }, type: "color", error: errors.color, placeholder: "Task Status Title" }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", className: "btn-primary", label: "Create Task Status" }) })] }) }));
};
