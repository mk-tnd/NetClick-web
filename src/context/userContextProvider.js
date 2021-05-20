import { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [packageId, setPackageId] = useState("");
  const [packages, setPackages] = useState([]);
  return (
    <UserContext.Provider
      value={{
        packages,
        setPackages,
        packageId,
        setPackageId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
