import React, {FC, useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {Modal} from "@components/common/Modal/index";
import {Button} from "@components/common/Button/index";
import {Input} from "@components/common/Input/index";
import {TextArea} from "@components/common/TextArea/index";
import {Project, ProjectFormData} from "@/types/dashboard/index";

import {isRoleAccepted, ProtectedComponent} from "@/context/role"
import {ADMIN_ROLE} from "@/constants/roles_constants";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: ProjectFormData) => Promise<any>;
    onDelete: () => Promise<any>;
    selectedProject: Project;
}

export const ProjectSettingsModal: FC<ModalProps> = ({isOpen, onClose, onSubmit, onDelete, selectedProject}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm<ProjectFormData>();

    const isDisabled = !(isRoleAccepted(ADMIN_ROLE));

    useEffect(() => {
        const {id, ...dataWithoutId} = selectedProject;
        reset({...dataWithoutId});
    }, [selectedProject.id])

    const handleFormSubmit: SubmitHandler<ProjectFormData> = async (data) => {
        await onSubmit(data);
        onClose();
    };

    const handleOnDelete: () => Promise<void> = async () => {
        await onDelete();
        onClose();
    }

    if (!isOpen) return null;

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isRoleAccepted(ADMIN_ROLE) ? "Project Settings" : "Project Info"}
        >
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <Input
                    label="Project Name"
                    type="text"
                    name="name"
                    register={register("name", {required: "Project name is required"})}
                    error={errors.name}
                    disabled={isDisabled}
                />

                <TextArea
                    label="Description"
                    name="description"
                    register={register("description")}
                    disabled={isDisabled}
                />

                <Input
                    label="Board Name"
                    type="text"
                    name="board_name"
                    register={register("board_name")}
                    disabled={isDisabled}
                />

                <ProtectedComponent requiredRole={ADMIN_ROLE}>
                    <div className="flex justify-between mt-6">
                        <Button
                            type="button"
                            onClick={handleOnDelete}
                            className="btn-danger"
                            label="Delete Project"
                        />
                        <Button
                            type="submit"
                            className="btn-primary"
                            label="Save Changes"
                        />
                    </div>
                </ProtectedComponent>
            </form>
        </Modal>
    );
};
