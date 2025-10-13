import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserProfile, type UserDTO } from "../api/fetchUserProfile";
import { userLogout } from "../api/logout";
import { loginRequest } from "../api/loginRequest";

interface User {
  id: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (login: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const mapUserDTOtoUser = (data: UserDTO): User => {
  return {
    id: data.id,
    name: data.login,
  };
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const data = await fetchUserProfile();
      setUser(data ? mapUserDTOtoUser(data) : null);
    } catch {
      setUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = async (login: string, password: string): Promise<boolean> => {
    const res = await loginRequest(login, password);
    if (res.ok) {
      fetchUser();
      return true;
    }
    return false;
  };

  const logout = async () => {
    const req = await userLogout();
    if (req) setUser(null);
  };

  const refreshUser = async () => {
    await fetchUser();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        login,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
