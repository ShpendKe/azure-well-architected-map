import React from "react";
import DesignPatterns from "./cloud-design-patterns/design-patterns";
import Layout from '@theme/Layout';

const CloudDesignPatterns: React.FC = () => {
  return (
    <Layout title="Azure Well Architected Map - Cloud Design Patterns" description="Cloud Design Patterns mapped to Azure Well Architected Framework">
      <DesignPatterns />
    </Layout>
  );
};

export default CloudDesignPatterns;
