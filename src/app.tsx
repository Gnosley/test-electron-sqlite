import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

export function App() {
  const [counter, setCounter] = useState<{ loading: boolean; value?: number }>({
    loading: true,
  });
  useEffect(() => {
    setCounter({ loading: true });
    window._api
      .currentCount()
      .then((v) => setCounter({ value: v, loading: false }));
  }, []);

  const increment = () => {
    setCounter({ loading: true });
    window._api
      .increment()
      .then((v) => setCounter({ value: v, loading: false }));
  };

  const decrement = () => {
    setCounter({ loading: true });
    window._api
      .decrement()
      .then((v) => setCounter({ value: v, loading: false }));
  };
  const reset = () => {
    setCounter({ loading: true });
    window._api.reset().then((v) => setCounter({ value: v, loading: false }));
  };

  return (
    <>
      <h1>Test counter with react and sqlite</h1>
      {counter.loading && <p>Loading...</p>}
      {!counter.loading && (
        <p>
          Counter's value from sqlite is: <b>{counter.value}</b>
        </p>
      )}
      <button onClick={increment} disabled={counter.loading}>
        Increment
      </button>
      <button onClick={decrement} disabled={counter.loading}>
        Decrement
      </button>
      <button onClick={reset} disabled={counter.loading}>
        Reset
      </button>
    </>
  );
}

const div = document.getElementById("app");
const root = createRoot(div);
root.render(<App />);
