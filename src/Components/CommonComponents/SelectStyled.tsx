import Select from "react-select";
import "../../style/Select.css";

const SelectStyled: React.FC<{
  options: { value: string; label: string }[];
  onChange: Function;
}> = ({ options, onChange }) => {
  const style = {
    menu: (baseStyles: any) => {
      return {
        ...baseStyles,
        background: "#ddc5a2",
        borderColor: "#301b28",
        color: "#301b28",
      };
    },

    control: (baseStyles: any) => {
      return {
        ...baseStyles,
        background: "#ddc5a2",
        borderColor: "#301b28",
        color: "#301b28",
        width: "8rem",
        fill: "red",
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
      defaultValue={options[0]}
      styles={style}
      classNamePrefix="react-select"
      onChange={(e) => {
        if (e) onChange(e?.value);
      }}
    />
  );
};

export default SelectStyled;
