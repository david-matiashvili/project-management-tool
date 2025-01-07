import React, {FC, useEffect, useState} from "react";
import {useForm, SubmitHandler} from "react-hook-form";
import {Modal} from "@components/common/Modal";
import {Button} from "@components/common/Button";
import {Input} from "@components/common/Input";
import {Select} from "@components/common/Select";
import {Role, AddMemberFormData} from "@/types/dashboard";


interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: AddMemberFormData) => Promise<void>;
    roles: Role[];
    onSearch: (query: string) => Promise<string[]>; // Callback for search
}


export const AddMemberModal: FC<AddMemberModalProps> = ({isOpen, onClose, onSubmit, roles, onSearch}) => {
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
        watch,
        setValue,
    } = useForm<AddMemberFormData>();

    const [results, setResults] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isResultPicked, setIsResultPicked] = useState<boolean>(false);
    const [showSelected, setShowSelected] = useState<boolean>(false);

    const query = watch("email"); // Watch the email input value

    useEffect(() => {
        const timer = setTimeout(async () => {

            if (!query || query.trim() === "") {
                setResults([]);
                return;
            }

            if (isResultPicked) {
                setIsResultPicked(false);
                setShowSelected(true);
                return;
            }

            try {
                setShowSelected(false);
                setIsLoading(true);
                const fetchedResults = await onSearch(query);
                setResults(fetchedResults);
            } catch (error) {
                console.error("Error fetching search results:", error);
            } finally {
                setIsLoading(false);
            }
        }, 500); // Debounce delay

        return () => clearTimeout(timer); // Cleanup debounce timer
    }, [query, onSearch]);

    const handleFormSubmit: SubmitHandler<AddMemberFormData> = async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    };

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add New Member">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
                <div className="space-y-2">
                    {/* Email Input with Search */}
                    <Input
                        label="Email"
                        type="text"
                        name="email"
                        register={register("email", {required: "Email is required"})}
                        error={errors.email}
                        placeholder="Enter email"
                    />
                    <div className="relative">
                        {isLoading && <p className="text-sm text-gray-500">Searching...</p>}
                        {!isLoading && results.length > 0 && (
                            <ul className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto">
                                {results.map((result, index) => (
                                    <li
                                        key={index}
                                        className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                                        onClick={() => {
                                            setValue("email", result); // Set selected email in the input
                                            setIsResultPicked(true);
                                            setResults([]); // Clear results
                                        }}
                                    >
                                        {result}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {!isLoading && query && results.length === 0 && (showSelected ?
                            (<p className="text-sm text-green-500">Selected</p>) :
                            (<p className="text-sm text-gray-500">No result found</p>))
                        }
                    </div>
                </div>

                {/* Role Selector */}
                <Select
                    label="Role"
                    name="role"
                    options={[
                        {value: "", label: "Select Role"},
                        ...roles.map((role) => ({
                            value: `${role.id}`,
                            label: role.name,
                        })),
                    ]}
                    register={register("role", {required: "Role is required"})}
                    error={errors.role}
                />

                <div className="flex justify-end">
                    <Button type="submit" className="btn-primary w-full" label="Add Member"/>
                </div>
            </form>
        </Modal>
    );
};
