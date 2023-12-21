import { config } from "~/config";
import { useMetadata } from "~/hooks/useMetadata";
import { api } from "~/utils/api";
import { type ProjectMetadata } from "../types";

export function useProjectById(id: string) {
  return api.projects.get.useQuery({ id }, { enabled: Boolean(id) });
}

const seed = 0;
// const seed = Math.random();
export function useProjects() {
  return api.projects.query.useInfiniteQuery(
    { limit: config.pageSize, seed },
    {
      getNextPageParam: (_, pages) => pages.length + 1,
    },
  );
}

export function useProjectMetadata(metadataPtr?: string) {
  return useMetadata<ProjectMetadata>(metadataPtr);
}

export function useProjectCount() {
  return api.projects.count.useQuery();
}