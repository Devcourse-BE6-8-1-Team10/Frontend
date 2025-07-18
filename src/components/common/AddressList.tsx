import React from "react";

export interface AddressItem {
  id: number;
  address: string;
  isDefault?: boolean;
}

interface AddressListProps {
  addresses: AddressItem[];
  current?: string;
  onSelect?: (address: string) => void;
  renderExtra?: (item: AddressItem) => React.ReactNode;
}

// AddressList: 주소 목록을 렌더링하는 공통 컴포넌트
const AddressList: React.FC<AddressListProps> = ({
  addresses,
  current,
  onSelect,
  renderExtra,
}) => {
  if (!addresses || addresses.length === 0) {
    return (
      <div className="text-gray-400 text-center py-4">
        등록된 주소가 없습니다.
      </div>
    );
  }
  return (
    <ul className="space-y-2 max-h-60 overflow-y-auto mb-4">
      {addresses.map((addr) => (
        <li
          key={addr.id}
          className={`border p-4 rounded cursor-pointer hover:bg-gray-50 flex items-center justify-between transition-colors duration-150 ${
            current === addr.address
              ? "border-amber-600 bg-amber-50"
              : "border-gray-300"
          }`}
          onClick={() => onSelect && onSelect(addr.address)}
        >
          <span className="text-lg">{addr.address}</span>
          <div className="flex items-center gap-2">
            {addr.isDefault && (
              <span className="ml-2 px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded">
                기본
              </span>
            )}
            {renderExtra && renderExtra(addr)}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AddressList;
