// "use client";
// import React, { useState, useEffect } from "react";

// export const ClientOnlyWrapper = ({ children }: { children: React.ReactNode }) => {
//   const [hasMounted, setHasMounted] = useState(false);

//   useEffect(() => {
//     setHasMounted(true);
//   }, []);

//   if (!hasMounted) return null;

//   return <>{children}</>;
// };