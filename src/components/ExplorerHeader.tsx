import React from 'react';

export default function ExplorerHeader({
  title,
  handleBackButton,
}: {
  title: string;
  handleBackButton: () => void;
}) {
  return (
    <div className="p-4 h-[60px] w-full flex flex-row items-center justify-start border-b border-b-[#777777] gap-2 bg-[#38383A]">
      <button
        onClick={handleBackButton}
        className="border font-bold rounded-sm px-2 hover:brightness-90"
      >
        &lt;
      </button>
      <span className="font-semibold">{title}</span>
    </div>
  );
}
