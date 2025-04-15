
export interface User {
  id: number;
  email: string;
  password: string; // In a real application, this should be hashed
  name: string;
  createdAt: string;
}

// Initial users for demonstration
let users: User[] = [
  {
    id: 1,
    email: "user@example.com",
    password: "password123", // This would be hashed in a real app
    name: "Demo User",
    createdAt: "2025-04-10"
  }
];

export const getUsers = () => users;

export const getUserById = (id: number) => {
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email: string) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const createUser = (userData: Omit<User, "id" | "createdAt">) => {
  const newUser: User = {
    ...userData,
    id: users.length + 1,
    createdAt: new Date().toISOString().split('T')[0]
  };
  
  users = [...users, newUser];
  return newUser;
};

export const authenticateUser = (email: string, password: string) => {
  const user = users.find(u => 
    u.email.toLowerCase() === email.toLowerCase() && 
    u.password === password
  );
  
  return user || null;
};
