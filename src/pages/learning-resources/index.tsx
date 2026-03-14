import React from "react";
import LearningResources from "./learning-resources";
import Layout from "@theme/Layout";

const LearningResourcesPage: React.FC = () => {
  return (
    <Layout
      title="Learning Resources – Azure Well Architected Map"
      description="Curated learning resources to understand and apply the Azure Well-Architected Framework"
    >
      <LearningResources />
    </Layout>
  );
};

export default LearningResourcesPage;
