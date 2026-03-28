import { useEffect, useState } from 'react';

export function ToastHost() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    let timerId;

    const handleToast = (event) => {
      setToast(event.detail);
      window.clearTimeout(timerId);
      timerId = window.setTimeout(() => {
        setToast(null);
      }, 1800);
    };

    window.addEventListener('app-toast', handleToast);

    return () => {
      window.removeEventListener('app-toast', handleToast);
      window.clearTimeout(timerId);
    };
  }, []);

  if (!toast) {
    return null;
  }

  return (
    <div
      className={`toast toast--${toast.type ?? 'success'}`}
      role="status"
      aria-live="polite"
    >
      {toast.message}
    </div>
  );
}
