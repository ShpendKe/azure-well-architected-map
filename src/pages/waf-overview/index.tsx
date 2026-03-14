import React from "react";
import WafOverview from "./waf-overview";
import Layout from "@theme/Layout";

const WafOverviewPage: React.FC = () => {
  return (
    <Layout
      title="WAF Pillars Overview – Azure Well Architected Map"
      description="Visual overview of all five Azure Well-Architected Framework pillars and their recommendations"
    >
      <WafOverview />
    </Layout>
  );
};

export default WafOverviewPage;
