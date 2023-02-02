const ErrorFallback = ({ error, resetErrorBoundary } : any) => (
    <div role="alert">
        <p>Something went wrong:</p>
        <pre>{error.message}</pre>
        <button type="button" onClick={resetErrorBoundary}>Try again</button>
    </div>
);

export default ErrorFallback;
