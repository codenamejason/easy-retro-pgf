import { type GetServerSideProps } from "next";

import { Layout } from "~/layouts/DefaultLayout";
import ListDetails from "~/features/lists/components/ListDetails";
import { useListById } from "~/features/lists/hooks/useLists";

export default function ListDetailsPage({ listId = "" }) {
  const list = useListById(listId);
  return (
    <Layout sidebar="left" title={list.data?.name} showBallot eligibilityCheck>
      <ListDetails attestation={list.data} />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query: { listId },
}) => ({ props: { listId } });
