// This file defines a React component that provides authentication session context to the app

"use client"; // Marks this component as a Client Component (needed for hooks like useEffect)

import { SessionProvider } from "next-auth/react";
// Imports the SessionProvider from NextAuth.js to manage user authentication sessions

type Props = {
  children?: React.ReactNode;
  // Defines the type for props: 'children' can be any valid React nodes (components, text, HTML, etc.)
};

export const Provider = ({ children }: Props) => {
  // Defines a wrapper component called 'Provider' that takes children and wraps them with SessionProvider
  return <SessionProvider>{children}</SessionProvider>;
  // SessionProvider makes NextAuth session data available to all child components (via useSession() hook)
};
