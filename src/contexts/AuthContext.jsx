import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext();
const USERS_KEY = 'epicgames-users';
const SESSION_KEY = 'epicgames-session';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

const loadUsers = () => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const loadSession = () => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(loadUsers);
  const [currentUser, setCurrentUser] = useState(loadSession);

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    else localStorage.removeItem(SESSION_KEY);
  }, [currentUser]);

  const signup = (payload) => {
    const { email, password, displayName, firstName, lastName, country } = payload || {};
    if (!email || !password) throw new Error('E-posta ve şifre gerekli');
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('Bu e-posta ile kayıtlı kullanıcı zaten var');
    const user = {
      id: crypto.randomUUID(),
      email,
      password,
      displayName: displayName || firstName || 'Oyuncu',
      firstName: firstName || '',
      lastName: lastName || '',
      country: country || 'Türkiye',
    };
    setUsers((prev) => [...prev, user]);
    setCurrentUser(user);
    return user;
  };

  const login = (email, password) => {
    const user = users.find(
      (u) => u.email.toLowerCase() === (email || '').toLowerCase() && u.password === password
    );
    if (!user) throw new Error('E-posta veya şifre hatalı');
    setCurrentUser(user);
    return user;
  };

  const logout = () => setCurrentUser(null);

  const updateProfile = (payload) => {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...payload } : u))
    );
    setCurrentUser((prev) => (prev ? { ...prev, ...payload } : prev));
  };

  const value = useMemo(
    () => ({
      currentUser,
      users,
      signup,
      login,
      logout,
      updateProfile,
      isAuthenticated: !!currentUser,
    }),
    [currentUser, users]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

