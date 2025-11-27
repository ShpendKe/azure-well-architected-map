import React from "react";
import Patterns from "./cloud-design-patterns/patterns";
import Layout from '@theme/Layout';

const CloudDesignPatterns: React.FC = () => {
  return (
    <Layout title="Azure Well Architected Map - Cloud Design Patterns" description="Cloud Design Patterns mapped to Azure Well Architected Framework">
      <Patterns />
    </Layout>
  );
};

export default CloudDesignPatterns;
