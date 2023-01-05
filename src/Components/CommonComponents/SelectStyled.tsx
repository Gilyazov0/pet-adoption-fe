import Select from "react-select";
import "../../style/Select.css";

const SelectStyled: React.FC<{
  options: { value: string; label: string }[];
  onChange: Function;
  defaultValue?: { value: string; label: string };
}> = ({ options, onChange, defaultValue }) => {
  const style = {
    menu: (baseStyles: any) => {
      return {
        ...baseStyles,
        background: "white",
        borderColor: "#523634",
        color: "#301b28",
      };
    },

    control: (baseStyles: any) => {
      return {
        ...baseStyles,
        background: "white",
        borderColor: "#523634",
        color: "#301b28",
        minWidth: "8rem",
        boxShadow: "0 0 0 1px #301b28",

        ":hover": {
          borderColor: "#523634",
        },
      };
    },
    option: () => {
      return {
        ":hover": {
          background: "#b6452c",
        },
      };
    },
  };

  return (
    <Select
      options={options}
      defaultValue={defaultValue ? defaultValue : options[0]}
      styles={style}
      classNamePrefix="react-select"
      onChange={(e) => {
        if (e) onChange(e?.value);
      }}
    />
  );
};

export default SelectStyled;
