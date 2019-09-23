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
        { id: 1, value: "Entry 1" },
        { id: 2, value: "Entry 2" },
        { id: 3, value: "Entry 3" }
      ]}
    />
  );
};

storiesOf("Searchable Select", module).add("Examples", () => {
  return (
    <div>
      <SearchableSelectWrapper />
    </div>
  );
});
