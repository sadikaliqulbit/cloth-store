type InputFieldProps = {
  type?: string;
  placeholder: string;
  className?: string;
  value?: string;
  name?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  type = "text",
  name = "text",
  placeholder,
  className = "",
  value,
  required,
  onChange,
}: InputFieldProps) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={`checkout-input ${className}`}
      value={value}
      required={required}
      onChange={onChange}
    />
  );
}

export default InputField;  