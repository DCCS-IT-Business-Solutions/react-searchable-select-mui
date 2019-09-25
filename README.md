# react-searchable-select-mui &middot; ![travis build](https://img.shields.io/travis/DCCS-IT-Business-Solutions/react-searchable-select-mui.svg) ![npm version](https://img.shields.io/npm/v/@dccs/react-searchable-select-mui.svg)

A simple custom select component including a searchfield.

Here is a Demo:[https://dccs-it-business-solutions.github.io/react-searchable-select-mui/](https://dccs-it-business-solutions.github.io/react-searchable-select-mui/)

## Installation

You should install [react-searchable-select-mui with npm or yarn](https://www.npmjs.com/package/@dccs/react-searchable-select-mui):

    npm install @dccs/react-searchable-select-mui

or

    yarn add @dccs/react-searchable-select-mui

This command will download and install react-searchable-select-mui

Peer Dependencies:

    npm install @material-ui/core

## How it works

<SearchableSelect> renders the following simplified structure:

```javascript
<FormControl>
  <InputLabel>Label</InputLabel>
  <Select>
    <TextField />
    <MenuItem>Remove Selection</MenuItem>
    <MenuItem>Option 1</MenuItem>
    <MenuItem>Option 2</MenuItem>
    <MenuItem>Option X</MenuItem>
  </Select>
  <FormHelperText />
</FormControl>
```

All Material UI-Select Props get passed to the <Select> Component [https://material-ui.com/api/select/](https://material-ui.com/api/select/)
Material UI-Select native is not supported!!!!

Additional Props:

| Name                   | Type                                          | Description                                                                                                                                                             |
| ---------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| label                  | `string`                                      | Label of the Select Component                                                                                                                                           |
| searchFieldPlaceholder | `string`                                      | Gets passed to the placeholder property of <TextField>. Default: "Search..."                                                                                            |
| removeSelectionText    | `string`                                      | Text für the Remove Selection MenuItem. Default: "Remove selection"                                                                                                     |
| options                | `KeyValuePair[] | any[]`                      | Options to render. By default it expects an array like this: [{key:1, value:"Entry 1"}, {key:2, value:"Entry 2"}].                                                      |
| keyPropFn              | `(option:KeyValuePair|any)=>any`              | Required function if you want to use a different property names for key and value. If you want to use id instead of key: keyPropFn={(option: any) => option.id}         |
| valuePropFn            | `(option:KeyValuePair|any)=>any`              | Required function if you want to use a different property names for key and value. If you want to use name instead of value: valuePropFn={(option: any) => option.name} |
| formControlProps       | https://material-ui.com/api/form-control/     | Props that get passed to the formcontrol component                                                                                                                      |
| formHelperTextProps    | https://material-ui.com/api/form-helper-text/ | Props that get passed to the FormHelperText component                                                                                                                   |

```javascript
const Example = () => {
  const [value, setValue] = React.useState<unknown>();

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setValue(event.target.value);
  };

  return (
    <SearchableSelect
      label="Searchable Select"
      value={value}
      onChange={handleChange}
      options={[
        { id: 1, value: "Entry 1" },
        { id: 2, value: "Entry 2" },
        { id: 3, value: "Entry 3" }
      ]}
    />
  );
};
```

With Custom Prop Names

```javascript
<SearchableSelect
  label="Searchable Select"
  value={value}
  onChange={handleChange}
  options={[
    { name: 1, property: "Entry 1" },
    { name: 2, property: "Entry 2" },
    { name: 3, property: "Entry 3" }
  ]}
  keyPropFn={(option: any) => option.name}
  valuePropFn={(option: any) => option.property}
/>
```

## Contributing

### License

@dccs/react-searchable-select-mui is [MIT licensed](https://github.com/facebook/react/blob/master/LICENSE)
