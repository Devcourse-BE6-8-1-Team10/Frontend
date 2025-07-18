import React, { useState } from "react";
import Button from "./Button";

interface AddressInputProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onCancel?: () => void;
  placeholder?: string;
}

// AddressInput: 새 주소를 입력받는 공통 컴포넌트
const AddressInput: React.FC<AddressInputProps> = ({
  value = "",
  onChange,
  onSubmit,
  onCancel,
  placeholder = "새 주소를 입력하세요",
}) => {
  const [input, setInput] = useState(value);

  // 외부 value prop이 바뀌면 input도 동기화
  React.useEffect(() => {
    setInput(value);
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    onChange && onChange(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      onSubmit && onSubmit(input.trim());
    }
  };

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="flex-1 p-3 border rounded"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
      />
      <Button
        text="등록"
        onClick={() => input.trim() && onSubmit && onSubmit(input.trim())}
        disabled={!input.trim()}
      />
      {onCancel && <Button text="취소" onClick={onCancel} />}
    </div>
  );
};

export default AddressInput;
