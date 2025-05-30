import React from 'react';

import { ItemInterface } from "../interfaces/Item";

export default function Details({
  item,
  path,
}: {
  item: ItemInterface;
  path: string;
}) {
  function formatSize(size: number | null) {
    if (size == null) {
      return "";
    }
    if (size < 1024) {
      return `${size.toFixed(2)} KB`;
    }

    const megabytes = size / 1024;
    if (megabytes < 1024) {
      return `${megabytes.toFixed(2)} MB`;
    } else {
      const gigabytes = megabytes / 1024;
      return `${gigabytes.toFixed(2)} GB`;
    }
  }

  function formatDate(date: Date) {
    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    const strTime = hours + ":" + minutes + " " + ampm;
    return (
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear() +
      " " +
      strTime
    );
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gray-200/10 p-5 rounded-lg">
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="h-[80px] w-[80px] rounded-md bg-white" />
        <span className="font-bold">{item.name}</span>
      </div>
      {/* https://stackoverflow.com/a/77664947 -> Wrapping text */}
      <div className="w-full flex flex-col items-start justify-center break-all">
        <span>Type: {item.type}</span>
        <span>Size: {formatSize(item.size)}</span>
        <span>Path: {path}</span>
        <span>Created: {formatDate(new Date(item.created))}</span>
      </div>
    </div>
  );
}
