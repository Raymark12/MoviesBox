import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { Box, Heading, Text } from "@chakra-ui/react";
import { Provider } from "~/components/ui/provider";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Provider>
      <Outlet />
    </Provider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <Provider>
      <Box
        as="main"
        maxW="1200px"
        mx="auto"
        px="6"
        py="20"
        bg="bg.page"
        minH="50vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Heading as="h1" size="xl" color="text.primary" mb="4">
          {message}
        </Heading>
        <Text color="text.secondary" fontSize="md" mb="6">
          {details}
        </Text>
        {stack && (
          <Box
            as="pre"
            p="4"
            borderRadius="md"
            bg="bg.card"
            color="text.secondary"
            fontSize="sm"
            overflow="auto"
            maxW="100%"
            textAlign="left"
          >
            <code>{stack}</code>
          </Box>
        )}
      </Box>
    </Provider>
  );
}
