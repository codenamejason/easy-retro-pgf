/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";

export type SemaphoreContextType = {
  _users: string[];
  _vote: string[];
  refreshUsers: () => Promise<void>;
  addUser: (user: string) => void;
  refreshVote: () => Promise<void>;
  addVote: (vote: string) => void;
};

export default React.createContext<SemaphoreContextType>({
  _users: [],
  _vote: [],
  refreshUsers: () => Promise.resolve(),
  addUser: () => {},
  refreshVote: () => Promise.resolve(),
  addVote: () => {},
});
