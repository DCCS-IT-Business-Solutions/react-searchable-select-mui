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

## Contributing

### License

@dccs/react-searchable-select-mui is [MIT licensed](https://github.com/facebook/react/blob/master/LICENSE)
