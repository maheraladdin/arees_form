"use client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export const Provider = ({ children }: { children: React.ReactNode }) => {
    return (
        <QueryClientProvider client={new QueryClient()}>
            {children}
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}