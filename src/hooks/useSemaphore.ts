/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SemaphoreEthers } from "@semaphore-protocol/data";
import * as dotenv from "dotenv";
import { BigNumber, utils } from "ethers";
import getNextConfig from "next/config";
import { useCallback, useState } from "react";
import type { SemaphoreContextType } from "../context/SemaphoreContext";

dotenv.config();

const { publicRuntimeConfig: env } = getNextConfig();

const ethereumNetwork =
  env.DEFAULT_NETWORK === "localhost"
    ? "http://localhost:8545"
    : env.DEFAULT_NETWORK;

export default function useSemaphore(): SemaphoreContextType {
  const [_users, setUsers] = useState<any[]>([]);
  const [_vote, setVote] = useState<string[]>([]);

  const refreshUsers = useCallback(async (): Promise<void> => {
    const semaphore = new SemaphoreEthers(ethereumNetwork, {
      address: env.SEMAPHORE_CONTRACT_ADDRESS,
    });

    const members = await semaphore.getGroupMembers(env.GROUP_ID);

    setUsers(members);
  }, []);

  const addUser = useCallback(
    (user: any) => {
      setUsers([..._users, user]);
    },
    [_users],
  );

  const refreshVote = useCallback(async (): Promise<void> => {
    const semaphore = new SemaphoreEthers(ethereumNetwork, {
      address: env.SEMAPHORE_CONTRACT_ADDRESS,
    });

    const proofs = await semaphore.getGroupVerifiedProofs(env.GROUP_ID);

    setVote(
      proofs.map(({ signal }: any) =>
        utils.parseBytes32String(BigNumber.from(signal).toHexString()),
      ),
    );
  }, []);

  const addVote = useCallback(
    (vote: string) => {
      setVote([..._vote, vote]);
    },
    [_vote],
  );

  return {
    _users,
    _vote,
    refreshUsers,
    addUser,
    refreshVote,
    addVote,
  };
}
