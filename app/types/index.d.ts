declare global {
  interface Window {
    turnstile: {
      render: (
        element: HTMLDivElement | null,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback": () => void;
          action?: string;
          theme?: "light" | "dark" | "auto";
          language?: string;
        },
      ) => string; // The widget ID is returned by render

      remove: (widgetId: HTMLDivElement) => void; // Removes the widget

      reset: (widgetId?: HTMLDivElement) => void; // Optionally resets the widget
    };
  }
}

export {};
