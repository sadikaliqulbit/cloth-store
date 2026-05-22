type InputFieldProps = {
  type?: string;
  placeholder: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputField({
  type = "text",
  placeholder,
  className = "",
  value,
  onChange,
}: InputFieldProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`checkout-input ${className}`}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputField;  