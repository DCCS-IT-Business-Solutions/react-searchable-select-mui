import * as React from "react";
import Select, { SelectProps } from "@material-ui/core/Select";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { FormHelperText, ListItem } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { FormHelperTextProps } from "@material-ui/core/FormHelperText";
import { HighlightQuery as highlightQuery } from "@dccs/utils";

export interface IKeyValuePair {
  key: any;
  value: string;
}

interface IBaseProps {
  label?: string;
  searchFieldPlaceholder?: string;
  removeSelectionText?: string;
  helperText?: string;
  formControlProps?: FormControlProps;
  formHelperTextProps?: FormHelperTextProps;
}

interface IDefaultKeyValuePair extends IBaseProps {
  options: IKeyValuePair[];
}

interface ICustomKeyValuePair extends IBaseProps {
  keyPropFn: (option: IKeyValuePair | any) => any;
  valuePropFn: (option: IKeyValuePair | any) => string;
  options: any[];
}

export type SearchableSelectProps = (
  | IDefaultKeyValuePair
  | ICustomKeyValuePair) &
  SelectProps;

interface IClickAwayListenerWrapperProps {
  searchFieldPlaceholder: string | undefined;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

class ClickAwayListenerWrapper extends React.Component<
  IClickAwayListenerWrapperProps
> {
  render() {
    const { searchFieldPlaceholder, setQuery } = this.props;

    return (
      <ClickAwayListener onClickAway={() => null}>
        <ListItem>
          <TextField
            fullWidth
            placeholder={searchFieldPlaceholder || "Search..."}
            onChange={e => {
              setQuery(e.target.value);
            }}
            onKeyDown={e => {
              // Prevent MUI-Autoselect while typing
              e.stopPropagation();
            }}
          />
        </ListItem>
      </ClickAwayListener>
    );
  }
}

export function SearchableSelect(props: SearchableSelectProps) {
  const [query, setQuery] = React.useState("");

  const {
    label,
    error,
    searchFieldPlaceholder,
    removeSelectionText,
    value,
    onChange,
    helperText,
    options,
    formControlProps,
    formHelperTextProps,
    ...others
  } = props;

  // Customprops
  let { keyPropFn, valuePropFn } = props as (ICustomKeyValuePair & SelectProps);

  // Remove keyPropFn and valuePropFn to not get passed down to the select component
  delete (others as any).keyPropFn;
  delete (others as any).valuePropFn;

  // Customprops Undefined? Use defaults
  if (!keyPropFn && !valuePropFn) {
    keyPropFn = (option: IKeyValuePair) => option.key;
    valuePropFn = (option: IKeyValuePair) => option.value;
  }

  const defaultProps = {
    style: { minWidth: "240px" }
  };

  return (
    <FormControl margin="normal" {...formControlProps}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        {...defaultProps}
        // Material UI Bug:
        // => || ""  is needed for the label to work properly.
        value={value || ""}
        onChange={onChange}
        error={error}
        MenuProps={{
          onEnter: () => {
            setQuery("");
          },
          onExit: () => {
            setQuery("");
          },
          disableAutoFocusItem: true,
          MenuListProps: {
            disableListWrap: true
          }
        }}
        {...others}
      >
        <ClickAwayListenerWrapper
          searchFieldPlaceholder={searchFieldPlaceholder}
          setQuery={setQuery}
        />
        <MenuItem>{removeSelectionText || "Remove selection"}</MenuItem>
        {options &&
          options.filter &&
          options
            .filter((option: IKeyValuePair | any) => {
              return (
                !valuePropFn(option) ||
                (valuePropFn(option) &&
                  valuePropFn(option).toLowerCase &&
                  valuePropFn(option)
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) !== -1)
              );
            })
            .map((option: IKeyValuePair | any) => (
              <MenuItem key={keyPropFn(option)} value={keyPropFn(option)}>
                {highlightQuery(valuePropFn(option), query)}
              </MenuItem>
            ))}
      </Select>
      <FormHelperText error={error} {...formHelperTextProps}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}
