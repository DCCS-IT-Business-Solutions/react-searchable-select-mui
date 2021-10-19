/// <reference types="react" />
import { SelectProps } from "@material-ui/core/Select";
import { FormControlProps } from "@material-ui/core/FormControl";
import { FormHelperTextProps } from "@material-ui/core/FormHelperText";
export interface IKeyValuePair {
    key: any;
    value: string;
}
export interface IGroupStruct {
    title: string;
    data: any[];
}
interface IBaseProps {
    label?: string;
    searchFieldPlaceholder?: string;
    hideRemoveSelection?: boolean;
    grouped?: boolean;
    removeSelectionText?: string;
    helperText?: string;
    formControlProps?: FormControlProps;
    formHelperTextProps?: FormHelperTextProps;
    maxVisibleOptions?: number;
    showAll?: boolean;
}
interface IDefaultKeyValuePair extends IBaseProps {
    options: IKeyValuePair[];
}
interface ICustomKeyValuePair extends IBaseProps {
    keyPropFn: (option: IKeyValuePair | any) => any;
    valuePropFn: (option: IKeyValuePair | any) => string | number;
    options: any[];
}
export declare type SearchableSelectProps = (IDefaultKeyValuePair | ICustomKeyValuePair) & SelectProps;
export declare function SearchableSelect(props: SearchableSelectProps): JSX.Element;
export {};
