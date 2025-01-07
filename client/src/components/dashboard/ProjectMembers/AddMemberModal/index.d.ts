import { FC } from "react";
import { Role, AddMemberFormData } from "@/types/dashboard";
interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: AddMemberFormData) => Promise<void>;
    roles: Role[];
    onSearch: (query: string) => Promise<string[]>;
}
export declare const AddMemberModal: FC<AddMemberModalProps>;
export {};
