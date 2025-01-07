import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@components/common/Modal/index";
import { Button } from "@components/common/Button/index";
import { Input } from "@components/common/Input/index";
import { TextArea } from "@components/common/TextArea/index";
import { isRoleAccepted, ProtectedComponent } from "@/context/role";
import { ADMIN_ROLE } from "@/constants/roles_constants";
export const ProjectSettingsModal = ({ isOpen, onClose, onSubmit, onDelete, selectedProject }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const isDisabled = !(isRoleAccepted(ADMIN_ROLE));
    useEffect(() => {
        const { id, ...dataWithoutId } = selectedProject;
        reset({ ...dataWithoutId });
    }, [selectedProject.id]);
    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        onClose();
    };
    const handleOnDelete = async () => {
        await onDelete();
        onClose();
    };
    if (!isOpen)
        return null;
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: isRoleAccepted(ADMIN_ROLE) ? "Project Settings" : "Project Info", children: _jsxs("form", { onSubmit: handleSubmit(handleFormSubmit), children: [_jsx(Input, { label: "Project Name", type: "text", name: "name", register: register("name", { required: "Project name is required" }), error: errors.name, disabled: isDisabled }), _jsx(TextArea, { label: "Description", name: "description", register: register("description"), disabled: isDisabled }), _jsx(Input, { label: "Board Name", type: "text", name: "board_name", register: register("board_name"), disabled: isDisabled }), _jsx(ProtectedComponent, { requiredRole: ADMIN_ROLE, children: _jsxs("div", { className: "flex justify-between mt-6", children: [_jsx(Button, { type: "button", onClick: handleOnDelete, className: "btn-danger", label: "Delete Project" }), _jsx(Button, { type: "submit", className: "btn-primary", label: "Save Changes" })] }) })] }) }));
};
