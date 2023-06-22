import { Component, ErrorInfo, ReactNode } from "react"
import DefaultErrorUI from "./DefaultErrorUI"

interface ErrorBoundaryProps {
    children?: ReactNode;
    errorUI?: ReactNode
}

interface State {
    hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, State> {
    public state: State = {
        hasError: false
    }

    public static getDerivedStateFromError(_: Error): State {
        return { hasError: true }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error("Uncaught error:", error, errorInfo)
    }

    public render() {
        if (this.state.hasError) {
            return this.props.errorUI ?? <DefaultErrorUI />
        }

        return this.props.children
    }
}

export default ErrorBoundary