import { ChakraProvider } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export const Providers = ({ children }) => {
  return (
      <QueryClientProvider client={client}>
        <ChakraProvider>
          { children }
        </ChakraProvider>
      </QueryClientProvider>
    )
}