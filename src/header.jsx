import React from "react";

export default function Header() {
  return (
    <header className="bg-blue-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        <img
          src="/logo-iit-mandi.png"
          alt="IIT Mandi Logo"
          className="h-14 w-auto"
        />
        <div>
          <h1 className="text-2xl font-semibold">Smart Parking System</h1>
          <div className="text-sm font-light">
            CS 303 – Software Engineering | Dr. Varun Dutt | IIT Mandi
          </div>
        </div>
      </div>
    </header>
  );
}
