import Button from "@/src/components/common/Button";
import { Settings } from "lucide-react";

export default function SettingsPanel() {
  return (
    <section className="bg-white shadow p-6 rounded">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">설정</h2>
        <Button
          icon={Settings}
          text="설정 초기화"
          onClick={() => {
            console.log("설정 초기화");
          }}
          className="border-amber-600 text-amber-600 hover:bg-amber-50"
        />
      </div>

      <ul className="space-y-6">
        <li className="flex items-center justify-between">
          <p className="text-gray-600">추가 설정 기능을 여기에 구현하세요.</p>
        </li>
      </ul>
    </section>
  );
}
