import * as React from "react";
import Select, { SelectProps } from "@material-ui/core/Select";
import FormControl, { FormControlProps } from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { FormHelperText, ListItem, ListSubheader } from "@material-ui/core";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import { FormHelperTextProps } from "@material-ui/core/FormHelperText";
import { HighlightQuery as highlightQuery } from "@dccs/utils";

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

export type SearchableSelectProps = (
  | IDefaultKeyValuePair
  | ICustomKeyValuePair) &
  SelectProps;

interface IClickAwayListenerWrapperProps {
  searchFieldPlaceholder: string | undefined;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

// Needed because otherwise MUI-Select passes down props to the ClickAwayListeneder
// This Component ignores those props
// Additionally it has to be a React.Component instead of a functional component
// Since functional components can't have a "ref"
class SearchFieldWrapper extends React.Component<
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
    hideRemoveSelection,
    value,
    onChange,
    helperText,
    options,
    grouped = false,
    formControlProps,
    formHelperTextProps,
    showAll,
    maxVisibleOptions,
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

  function renderFilteredOptions() {
    let filteredOptions = 
    options &&
    options.filter &&
    options.filter((option: IKeyValuePair | any) => {
      return (
        !valuePropFn(option) ||
        (valuePropFn(option) &&
          valuePropFn(option)
            .toString()
            .toLowerCase()
            .indexOf(query.toLowerCase()) !== -1)
      );
    });
    if (!showAll) {
      filteredOptions = filteredOptions.slice(0, maxVisibleOptions || 20);

      const selectedOption = options.find(
        option => value === keyPropFn(option)
      );

      if (selectedOption) {
        if (filteredOptions.indexOf(selectedOption) === -1) {
          filteredOptions.push(selectedOption);
        }
      }
    }

    return filteredOptions.map((option: IKeyValuePair | any) => {
      const searchVal = valuePropFn(option).toString();
      return (
        <MenuItem key={keyPropFn(option)} value={keyPropFn(option)}>
          {highlightQuery(searchVal, query)}
        </MenuItem>
      );
    });
  }

  function renderGroupedOptions() {
    const mapableOptions = [...options] as any
    const filteredOptions = 
    mapableOptions &&
    mapableOptions.map &&
    mapableOptions.map((group: IGroupStruct | any) => {
      return ({
        title: group.title,
        data: group.data.filter((option: IKeyValuePair | any) => {
          return (
            !valuePropFn(option) ||
            (valuePropFn(option) &&
              valuePropFn(option)
                .toString()
                .toLowerCase()
                .indexOf(query.toLowerCase()) !== -1)
          );
        })
      })
    });
    return filteredOptions.map((group: IGroupStruct | any, index: any) => (
      [
        <ListSubheader key={group.title} style={{ background: '#fff' }}>{group.title}</ListSubheader>,
          group.data.map((option: IKeyValuePair | any) => {
            const searchVal = valuePropFn(option).toString();
            return (
              <MenuItem key={keyPropFn(option)} value={keyPropFn(option)}>
                {highlightQuery(searchVal, query)}
              </MenuItem>
            );
          })
      ]
    ));
  }

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
        <SearchFieldWrapper
          searchFieldPlaceholder={searchFieldPlaceholder}
          setQuery={setQuery}
        />
        {!hideRemoveSelection && <MenuItem>{removeSelectionText || "Remove selection"}</MenuItem>}
        {grouped ? renderGroupedOptions() : renderFilteredOptions()}
      </Select>
      <FormHelperText error={error} {...formHelperTextProps}>
        {helperText}
      </FormHelperText>
    </FormControl>
  );
}
