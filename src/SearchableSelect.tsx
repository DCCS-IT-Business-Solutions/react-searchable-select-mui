import * as React from "react";
import Select, { SelectProps } from "@material-ui/core/Select";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { FormHelperText, ListItem } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { FormHelperTextProps } from "@material-ui/core/FormHelperText";
import highlightQuery from "./highlightQuery";

interface IIdValuePair {
  id: any;
  value: string;
}

interface IBaseProps {
  // TODO: welchen Typ brauch ich für ein Array aus Objects das aus key + value besteht?
  label?: string;
  searchFieldPlaceholder?: string;
  removeSelectionText?: string;
  helperText?: string;
  formControlProps?: FormControlProps;
  formHelperTextProps?: FormHelperTextProps;
}

interface IDefaultIdValueArray extends IBaseProps {
  options: IIdValuePair[];
}

interface ICustomIdValueProps extends IBaseProps {
  keyPropFn: (option: any) => any;
  valuePropFn: (option: any) => string;
  options: any[];
}

export type SearchableSelectProps = (
  | IDefaultIdValueArray
  | ICustomIdValueProps) &
  SelectProps;

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
  let { keyPropFn, valuePropFn } = props as (ICustomIdValueProps & SelectProps);

  // Customprops Undefined? Use defaults
  if (!keyPropFn && !valuePropFn) {
    keyPropFn = (option: IIdValuePair) => option.id;
    valuePropFn = (option: IIdValuePair) => option.value;
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
        onChange={(e: any, child: any) => {
          setQuery("");
          return onChange ? onChange(e, child) : undefined;
        }}
        error={error}
        MenuProps={{
          disableAutoFocusItem: true,
          MenuListProps: {
            disableListWrap: true
          }
        }}
        {...others}
      >
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
        <MenuItem>{removeSelectionText || "Remove selection"}</MenuItem>
        {options &&
          options.filter &&
          options
            .filter((option: IIdValuePair | any) => {
              return (
                !valuePropFn(option) ||
                (valuePropFn(option) &&
                  valuePropFn(option).toLowerCase &&
                  valuePropFn(option)
                    .toLowerCase()
                    .indexOf(query.toLowerCase()) !== -1)
              );
            })
            .map((option: IIdValuePair | any) => (
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
