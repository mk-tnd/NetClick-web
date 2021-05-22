import { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextProvider({ children }) {
  const [user, setUser] = useState({});
  const [packageId, setPackageId] = useState("");
  const [packages, setPackages] = useState([]);
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
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
