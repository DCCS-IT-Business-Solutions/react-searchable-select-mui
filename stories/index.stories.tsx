import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SearchableSelect } from "../src/SearchableSelect";

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
      options={[
        { key: 1, value: "Entry 1" },
        { key: 2, value: "Entry 2" },
        { key: 3, value: "Entry 3" }
      ]}
    />
  );
};

const SearchableSelectWrapper3 = () => {
  const [value, setValue] = React.useState([]);

  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: [] }>
  ) => {
    debugger;
    setValue(event.target.value);
  };

  return (
    <SearchableSelect
      label="Searchable Select"
      value={value}
      onChange={handleChange}
      multiple
      options={[
        { key: 1, value: "Entry 1" },
        { key: 2, value: "Entry 2" },
        { key: 3, value: "Entry 3" }
      ]}
    />
  );
};

// const SearchableSelectWrapper4 = () => {
//   const [value, setValue] = React.useState([]);

//   const handleChange = (
//     event: React.ChangeEvent<{ name?: string; value: [] }>
//   ) => {
//     debugger;
//     setValue(event.target.value);
//   };

//   return (
//     <SearchableSelect
//       label="Searchable Select"
//       value={value}
//       onChange={handleChange}
//       multiple
//       options={[
//         { key: 1, value: "Entry 1" },
//         { key: 2, value: "Entry 2" },
//         { key: 3, value: "Entry 3" }
//       ]}
//     />
//   );
// };

storiesOf("Searchable Select", module).add("Examples", () => {
  return (
    <div>
      <SearchableSelectWrapper />
      <br></br>
      <SearchableSelectWrapper2 />
    </div>
  );
});
