import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { extendTheme, NativeBaseProvider } from "native-base";
import { useState } from "react";
import { trpc } from "./client";
import Layout from "./components/Layout";

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      // change the ip address to whatever address the Metro server is running on
      // if you're using a Simulator 'localhost' should work fine
      links: [httpBatchLink({ url: "http://localhost:5001/trpc" })],
    })
  );

  // Define the config
  const config = {
    useSystemColorMode: false,
    initialColorMode: "light",
  };

  // extend the theme
  const customTheme = extendTheme({ config });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={customTheme}>
          <Layout />
        </NativeBaseProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
