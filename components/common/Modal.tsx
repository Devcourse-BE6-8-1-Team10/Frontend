export function Modal({
  children,
  onClose,
}: {
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      {/* 바깥 클릭시 닫기 */}
      <div className="absolute inset-0" onClick={onClose} />
      {/* 모달 내용 */}
      <div className="relative">{children}</div>
    </div>
  );
}
