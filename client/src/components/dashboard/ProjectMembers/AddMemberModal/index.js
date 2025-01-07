import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "@components/common/Modal";
import { Button } from "@components/common/Button";
import { Input } from "@components/common/Input";
import { Select } from "@components/common/Select";
export const AddMemberModal = ({ isOpen, onClose, onSubmit, roles, onSearch }) => {
    const { register, handleSubmit, formState: { errors }, reset, watch, setValue, } = useForm();
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isResultPicked, setIsResultPicked] = useState(false);
    const [showSelected, setShowSelected] = useState(false);
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
            }
            catch (error) {
                console.error("Error fetching search results:", error);
            }
            finally {
                setIsLoading(false);
            }
        }, 500); // Debounce delay
        return () => clearTimeout(timer); // Cleanup debounce timer
    }, [query, onSearch]);
    const handleFormSubmit = async (data) => {
        await onSubmit(data);
        reset();
        onClose();
    };
    if (!isOpen)
        return null;
    return (_jsx(Modal, { isOpen: isOpen, onClose: onClose, title: "Add New Member", children: _jsxs("form", { onSubmit: handleSubmit(handleFormSubmit), className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Input, { label: "Email", type: "text", name: "email", register: register("email", { required: "Email is required" }), error: errors.email, placeholder: "Enter email" }), _jsxs("div", { className: "relative", children: [isLoading && _jsx("p", { className: "text-sm text-gray-500", children: "Searching..." }), !isLoading && results.length > 0 && (_jsx("ul", { className: "absolute w-full bg-white border border-gray-300 rounded-lg shadow-md max-h-40 overflow-y-auto", children: results.map((result, index) => (_jsx("li", { className: "px-4 py-2 cursor-pointer hover:bg-blue-100", onClick: () => {
                                            setValue("email", result); // Set selected email in the input
                                            setIsResultPicked(true);
                                            setResults([]); // Clear results
                                        }, children: result }, index))) })), !isLoading && query && results.length === 0 && (showSelected ?
                                    (_jsx("p", { className: "text-sm text-green-500", children: "Selected" })) :
                                    (_jsx("p", { className: "text-sm text-gray-500", children: "No result found" })))] })] }), _jsx(Select, { label: "Role", name: "role", options: [
                        { value: "", label: "Select Role" },
                        ...roles.map((role) => ({
                            value: `${role.id}`,
                            label: role.name,
                        })),
                    ], register: register("role", { required: "Role is required" }), error: errors.role }), _jsx("div", { className: "flex justify-end", children: _jsx(Button, { type: "submit", className: "btn-primary w-full", label: "Add Member" }) })] }) }));
};
