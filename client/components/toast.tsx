import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from "lucide-react"
import { toast, type ToastOptions } from "react-toastify"
import { cn } from "@/lib/utils"

interface ToastProps {
  message: string
  description?: string
  type?: "success" | "error" | "info" | "warning"
}

const Toast = ({ message, description, type = "info" }: ToastProps) => {
  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    error: <AlertCircle className="h-5 w-5 text-red-500" />,
    info: <Info className="h-5 w-5 text-blue-500" />,
    warning: <AlertTriangle className="h-5 w-5 text-amber-500" />,
  }

  const backgrounds = {
    success: "bg-emerald-50 dark:bg-emerald-950/30",
    error: "bg-red-50 dark:bg-red-950/30",
    info: "bg-blue-50 dark:bg-blue-950/30",
    warning: "bg-amber-50 dark:bg-amber-950/30",
  }

  const borders = {
    success: "border-l-4 border-emerald-500",
    error: "border-l-4 border-red-500",
    info: "border-l-4 border-blue-500",
    warning: "border-l-4 border-amber-500",
  }

  return (
    <div
      className={cn(
        "w-full max-w-md bg-white dark:bg-slate-800 shadow-lg rounded-lg pointer-events-auto flex overflow-hidden",
        backgrounds[type],
        borders[type],
      )}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <div className="h-10 w-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center shadow-sm">
              {icons[type]}
            </div>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100">{message}</p>
            {description && <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{description}</p>}
          </div>
        </div>
      </div>
      <div className="flex border-l border-slate-200 dark:border-slate-700">
        <button
          onClick={() => toast.dismiss()}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-slate-400 hover:text-slate-500 dark:text-slate-500 dark:hover:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}

// Custom toast functions
export const showToast = (message: string, description?: string, type: ToastProps["type"] = "info") => {
  const options: ToastOptions = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    className: "p-0 bg-transparent",
  }

  toast(<Toast message={message} description={description} type={type} />, options)
}

// Convenience methods
export const showSuccess = (message: string, description?: string) => showToast(message, description, "success")
export const showError = (message: string, description?: string) => showToast(message, description, "error")
export const showInfo = (message: string, description?: string) => showToast(message, description, "info")
export const showWarning = (message: string, description?: string) => showToast(message, description, "warning")

