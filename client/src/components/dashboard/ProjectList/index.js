import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "@components/common/Button";
import { ProjectCreateModal } from "@components/dashboard/ProjectList/ProjectCreateModal/";
export const ProjectList = ({ projects, selectProject, handleCreateProject }) => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const openCreateModal = () => setIsCreateModalOpen(true);
    const closeCreateModal = () => setIsCreateModalOpen(false);
    const handleCreateProjectWrapper = async (data) => {
        await handleCreateProject(data);
        closeCreateModal();
    };
    return (_jsxs("div", { className: "w-1/4 h-screen p-4 bg-gray-100", children: [_jsxs("div", { className: "flex justify-between items-center mb-4", children: [_jsx("h2", { className: "text-xl font-bold", children: "Projects" }), _jsx(Button, { onClick: openCreateModal, className: "btn-primary", label: "Create a New Project" })] }), _jsx("ul", { className: "space-y-4", children: projects.map((role) => (_jsxs("li", { className: "p-4 border border-gray-300 rounded-lg shadow-sm hover:shadow-md transition-shadow", children: [_jsx("p", { className: "text-lg font-semibold text-gray-800 mb-2", children: role.role_description }), _jsx("ul", { className: "ml-4 space-y-2", children: role.data.map((project) => (_jsx("li", { className: "p-3 cursor-pointer text-gray-700 bg-gray-200 border-gray-500 rounded-lg shadow-sm hover:text-blue-600 hover:font-medium transition-colors", onClick: () => selectProject(project), children: project.name }, project.id))) })] }, role.role_id))) }), _jsx(ProjectCreateModal, { isOpen: isCreateModalOpen, onClose: closeCreateModal, onSubmit: handleCreateProjectWrapper })] }));
};
