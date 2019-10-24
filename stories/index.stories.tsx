import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SearchableSelect, IKeyValuePair } from "../src/SearchableSelect";

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
        { name: 1, property: "Entry 1" },
        { name: 2, property: "Entry 2" },
        { name: 3, property: "Entry 3" }
      ]}
      keyPropFn={(option: any) => option.name}
      valuePropFn={(option: any) => option.property}
    />
  );
};

const SearchableSelectWrapper2 = () => {
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
      options={generateOptions()}
    />
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

storiesOf("Searchable Select", module).add("Examples", () => {
  return (
    <div>
      Custom Props:
      <br></br>
      <SearchableSelectWrapper />
      <br></br>
      Standard: (shows 20 options by default)
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
