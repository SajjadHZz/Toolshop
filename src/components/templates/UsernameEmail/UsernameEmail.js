"use client";

import { useSelector } from "react-redux";

export default function UsernameEmail() {
  const user = useSelector((state) => state.user);
  return (
    <>
      {user.loading ? (
        <>
          <div className="bg-gray-100/20 skeleton w-40 h-2 mb-4"></div>
          <div className="bg-gray-100/20 skeleton w-20 h-1"></div>
        </>
      ) : (
        <>
          <h4 className="font-bold leading-loose text-xl">{user.username || user.email.split("@")[0]}</h4>
          <p className="text-xs text-text/60">{user.email}</p>
        </>
      )}
    </>
  );
}
