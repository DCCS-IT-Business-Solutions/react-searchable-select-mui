import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SearchableSelect, IKeyValuePair } from "../src/SearchableSelect";
import { Button } from "@material-ui/core";

function generateOptions() {
  const options = [];

  for (let i = 1; i <= 100; i++) {
    options.push({ key: i, value: `Entry ${i}` });
  }
  return options as IKeyValuePair[];
}

const SearchableSelectWrapper = () => {
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
        { name: 1, property: "1" },
        { name: 2, property: "2" },
        { name: 3, property: "3" }
      ]}
      keyPropFn={(option: any) => option.name}
      valuePropFn={(option: any) => option.property}
    />
  );
};

const SearchableSelectWrapper2 = () => {
  const [value, setValue] = React.useState<number>(21);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: number }>
  ) => {
    setValue(event.target.value);
  };

  return (
    <React.Fragment>
      <SearchableSelect
        label="Searchable Select"
        value={value}
        onChange={handleChange}
        options={generateOptions()}
      />
    </React.Fragment>
  );
};

const SearchableSelectWrapper3 = () => {
  const [value, setValue] = React.useState([]);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: [] }>
  ) => {
    setValue(event.target.value);
  };

  return (
    <SearchableSelect
      label="Searchable Select"
      value={value}
      onChange={handleChange}
      maxVisibleOptions={50}
      options={generateOptions()}
    />
  );
};

const SearchableSelectWrapper4 = () => {
  const [value, setValue] = React.useState([]);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: [] }>
  ) => {
    setValue(event.target.value);
  };

  return (
    <SearchableSelect
      label="Searchable Select"
      value={value}
      onChange={handleChange}
      showAll={true}
      options={generateOptions()}
    />
  );
};

const SearchableSelectWrapper5 = () => {
  const [value, setValue] = React.useState<unknown>();

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setValue(event.target.value);
  };

  return (
    <SearchableSelect
      label="Searchable Select"
      hideRemoveSelection={true}
      value={value}
      onChange={handleChange}
      options={[
        { name: 1, property: "1" },
        { name: 2, property: "2" },
        { name: 3, property: "3" }
      ]}
      keyPropFn={(option: any) => option.name}
      valuePropFn={(option: any) => option.property}
    />
  );
};

const SearchableSelectWrapper6 = () => {
  const [value, setValue] = React.useState<unknown>();

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    setValue(event.target.value);
  };

  return (
    <SearchableSelect
      label="Searchable Select"
      hideRemoveSelection={true}
      value={value}
      grouped={true}
      onChange={handleChange}
      options={[
        {
          title: 'Group 1',
          data: [
            { name: 1, property: "1" },
            { name: 2, property: "2" },
            { name: 3, property: "3" }
          ]
        },
        {
          title: 'Group 2',
          data: [
            { name: 4, property: "4" },
            { name: 5, property: "5" },
            { name: 6, property: "6" }
          ]
        },
        {
          title: 'Group 3',
          data: [
            { name: 7, property: "7" },
            { name: 8, property: "8" },
            { name: 9, property: "9" }
          ]
        },
      ]}
      keyPropFn={(option: any) => option.name}
      valuePropFn={(option: any) => option.property}
    />
  );
};

storiesOf("Searchable Select", module).add("Examples", () => {
  return (
    <div>
      <br></br>
      Grouped Selections:
      <br></br>
      <SearchableSelectWrapper6 />
      <br></br>
      No remove selection option:
      <br></br>
      <SearchableSelectWrapper5 />
      <br></br>
      Custom Props:
      <br></br>
      <SearchableSelectWrapper />
      <br></br>
      Standard: (shows 20 options by default)
      <br></br>
      Initial Value is set to 21
      <br></br>
      <SearchableSelectWrapper2 />
      <br></br>
      With maxVisibleOptions set to 50:
      <br></br>
      <SearchableSelectWrapper3 />
      <br></br>
      With showAll set to true
      <br></br>
      <SearchableSelectWrapper4 />
      <br></br>
      It's not advised to render all options if it exceeds ~20-50 Items.
      MUI-MenuItems are very slow
    </div>
  );
});
