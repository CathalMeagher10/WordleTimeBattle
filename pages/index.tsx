import type { NextPage } from "next";
import { QueryClientProvider, QueryClient } from "react-query";
import Home from "../components/Home";

const queryClient = new QueryClient();

const wrapper: NextPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  );
};
export default wrapper;
