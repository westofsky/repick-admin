"use client";
import {
  updateOrderState,
  getRequestReturn,
  updateProductReturn,
} from "@/api/request";
import { useState, useEffect } from "react";

export default function ReExDropdown({
  item,
  setItems,
  page,
  size,
  onStateChange,
}: any) {
  const [currentState, setCurrentState] = useState(
    item.state === "반송 미요청" || item.state === "반송 요청"
      ? "반송 전"
      : item.state
  );

  const handleStateChange = async (newState: string) => {
    try {
      // 상태 변환 로직
      const apiState = newState === "반송 전" ? "반송 요청" : newState;

      // 상태 업데이트 요청
      await updateProductReturn(apiState, item.productId);

      // 변경된 상태를 로컬 상태에 반영
      setCurrentState(newState);

      // 부모 컴포넌트의 데이터를 새로 가져오도록 요청
      if (onStateChange) {
        onStateChange();
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <div className="absolute" onClick={(e) => e.stopPropagation()}>
        <div className="text-13pxr text-text-sub font-medium leading-19pxr w-171pxr border-1pxr border-solid border-circle-gray rounded-5pxr  bg-white mt-6pxr">
          {["반송 전", "반송 완료"].map((state) => (
            <li
              key={state}
              className={`w-171pxr h-36pxr pt-8pxr pl-17pxr pb-8pxr hover:bg-circle-gray ${
                currentState === state ? "font-bold" : ""
              }`}
              onClick={() => handleStateChange(state)}
            >
              {state}
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}
