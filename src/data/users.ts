
export interface User {
  id: number;
  email: string;
  password?: string; // Optional for Google users
  name: string;
  createdAt: string;
  googleId?: string; // New field for Google authentication
  picture?: string; // Profile picture URL from Google
  authProvider: 'email' | 'google';
}

// Initial users for demonstration
let users: User[] = [
  {
    id: 1,
    email: "user@example.com",
    password: "password123", // This would be hashed in a real app
    name: "Demo User",
    createdAt: "2025-04-10",
    authProvider: 'email'
  }
];

export const getUsers = () => users;

export const getUserById = (id: number) => {
  return users.find(user => user.id === id);
};

export const getUserByEmail = (email: string) => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const getUserByGoogleId = (googleId: string) => {
  return users.find(user => user.googleId === googleId);
};

export const createUser = (userData: Omit<User, "id" | "createdAt" | "authProvider">) => {
  const newUser: User = {
    ...userData,
    id: users.length + 1,
    createdAt: new Date().toISOString().split('T')[0],
    authProvider: 'email'
  };
  
  users = [...users, newUser];
  return newUser;
};

export interface GoogleUserData {
  email: string;
  name: string;
  googleId: string;
  picture?: string;
}

export const createOrGetGoogleUser = (userData: GoogleUserData): User | null => {
  // First check if we already have a user with this Google ID
  let existingUser = getUserByGoogleId(userData.googleId);
  
  // If not found by Google ID, try finding by email
  if (!existingUser) {
    existingUser = getUserByEmail(userData.email);
  }
  
  // If user exists, update their Google ID if needed
  if (existingUser) {
    // If the user was previously created with email/password but is now using Google
    if (!existingUser.googleId) {
      existingUser.googleId = userData.googleId;
      existingUser.picture = userData.picture;
      existingUser.authProvider = 'google';
    }
    return existingUser;
  }
  
  // Create new user if not found
  const newUser: User = {
    id: users.length + 1,
    email: userData.email,
    name: userData.name,
    googleId: userData.googleId,
    picture: userData.picture,
    createdAt: new Date().toISOString().split('T')[0],
    authProvider: 'google'
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
