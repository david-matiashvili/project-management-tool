import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from "react-hook-form";
import { FormModal } from "@components/common/FormModal/index";
export const ProjectCreateModal = ({ isOpen, onClose, onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    if (!isOpen)
        return null;
    return (_jsxs(FormModal, { isOpen: isOpen, onClose: onClose, onSubmit: handleSubmit(onSubmit), title: "Create a new project", children: [_jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "name", className: "block text-sm font-medium text-gray-700", children: "Project Name" }), _jsx("input", { id: "name", className: "w-full p-2 border border-gray-300 rounded-md", ...register("name", { required: "Project name is required" }) }), errors.name && _jsx("span", { className: "text-red-500 text-sm", children: errors.name.message })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "description", className: "block text-sm font-medium text-gray-700", children: "Description" }), _jsx("textarea", { id: "description", className: "w-full p-2 border border-gray-300 rounded-md", ...register("description") })] }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { htmlFor: "board_name", className: "block text-sm font-medium text-gray-700", children: "Board Name" }), _jsx("input", { id: "board_name", className: "w-full p-2 border border-gray-300 rounded-md", ...register("board_name") })] })] }));
};
