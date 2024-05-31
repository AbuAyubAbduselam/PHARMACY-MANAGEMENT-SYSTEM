const FormRow = ({
  type,
  name,
  labelText,
  defaultValue,
  onChange,
  min,
  maxLength,
  visibility,
  style,
}) => {
  const parseLabelText = (text) => {
    const parts = text.split(/(<no-transform>.*?<\/no-transform>)/g);
    return parts.map((part, index) => {
      if (
        part.startsWith("<no-transform>") &&
        part.endsWith("</no-transform>")
      ) {
        return (
          <span key={index} style={{ textTransform: "none" }}>
            {part.replace("<no-transform>", "").replace("</no-transform>", "")}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {parseLabelText(labelText || name)}
      </label>
      <input
        type={type}
        min={min}
        maxLength={maxLength}
        name={name}
        className="form-input"
        id={name}
        style={style}
        defaultValue={defaultValue || ""}
        onChange={onChange}
        visibility={visibility}
        required
      />
    </div>
  );
};
export default FormRow;
