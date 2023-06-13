"use client";

export default function Error({ error, reset }) {
  return (
    <div className="errorDiv">
      <h2>Error</h2>
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}
