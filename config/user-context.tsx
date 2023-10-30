import { createContext, useState } from "react";

const UserType = createContext({
  userId: "",
  setUserId: (userId: string) => {},
});

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [userId, setUserId] = useState("");

  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };
