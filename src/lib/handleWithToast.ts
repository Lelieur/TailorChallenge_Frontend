import { sileo } from "sileo";

export type SileoPromiseOptions = Parameters<typeof sileo.promise>[1];
export type FormValues = Record<string, string>;
type HandleSubmitWithToastParams<T extends string> = {
  event: React.SubmitEvent<HTMLFormElement>;
  apiCall: (formData: FormData) => Promise<T>;
  isSubmitting: (state: boolean) => void;
  navigate: (to: string) => void;
  success: string;
  values?: FormValues;
};

type HandleWithToastParams<T extends string> = {
  action: (data: string) => Promise<T>;
  data: string;
  navigate: (to: string) => void;
  success: string;
  updateState?: (state: boolean) => void;
};

export function buildFormData(values: FormValues): FormData {
  const formData = new FormData();
  for (const [key, value] of Object.entries(values)) {
    formData.set(key, value);
  }
  return formData;
}

export async function handleSubmitWithToast<T extends string>({
  event,
  apiCall,
  isSubmitting,
  navigate,
  success,
  values,
}: HandleSubmitWithToastParams<T>): Promise<void> {
  event.preventDefault();
  isSubmitting(true);
  const formData = values ? buildFormData(values) : new FormData(event.currentTarget);
  try {
    const target = await sileo.promise(apiCall(formData), {
      loading: {
        title: "Estamos trabajando...",
        fill: "white",
        styles: { title: "black" },
      },
      success: { title: success, fill: "black", styles: { title: "text-green-500!" } },
      error: (err) => ({
        title: "Error en registro",
        description: err instanceof Error ? err.message : "Ha ocurrido un error inesperado.",
        fill: "black",
        styles: {
          title: "text-red-500!",
          description: "text-white/75!",
        },
      }),
    });
    navigate(target);
  } finally {
    isSubmitting(false);
  }
}

export async function handleWithToast<T extends string>({
  action,
  data,
  navigate,
  success,
  updateState,
}: HandleWithToastParams<T>): Promise<void> {
  updateState && updateState(true);
  try {
    const target = await sileo.promise(action(data), {
      loading: {
        title: "Estamos trabajando...",
        fill: "white",
        styles: { title: "black" },
      },
      success: { title: success, fill: "black", styles: { title: "text-green-500!" } },
      error: (err) => ({
        title: "Error en registro",
        description: err instanceof Error ? err.message : "Ha ocurrido un error inesperado.",
        fill: "black",
        styles: {
          title: "text-red-500!",
          description: "text-white/75!",
        },
      }),
    });
    navigate(target);
  } finally {
    updateState && updateState(false);
  }
}
