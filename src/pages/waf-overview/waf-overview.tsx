import React, { useState } from "react";
import wafPillars from "./data/waf-pillars.json";
import styles from "./styles.module.css";

interface Recommendation {
  id: string;
  title: string;
  description: string;
  link: string;
}

interface WafPillar {
  key: string;
  code: string;
  title: string;
  emoji: string;
  color: string;
  description: string;
  link: string;
  recommendations: Recommendation[];
}

const pillars: WafPillar[] = wafPillars;

const WafOverview: React.FC = () => {
  const [activePillar, setActivePillar] = useState<string | null>(null);

  const displayed = activePillar
    ? pillars.filter((p) => p.key === activePillar)
    : pillars;

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1 className={styles.heading}>Azure Well-Architected Framework Overview</h1>
        <p className={styles.subheading}>
          The Azure Well-Architected Framework is a set of quality-driven tenets, architectural decision points, and review tools to help solution architects build a technical foundation for their workloads. It is structured around five pillars of architectural excellence.
        </p>
        <a
          href="https://learn.microsoft.com/en-us/azure/well-architected/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.docsLink}
        >
          Official Documentation →
        </a>
      </div>

      <div className={styles.pillarNav}>
        <button
          className={`${styles.navBtn} ${activePillar === null ? styles.navBtnActive : ""}`}
          onClick={() => setActivePillar(null)}
        >
          All Pillars
        </button>
        {pillars.map((p) => (
          <button
            key={p.key}
            className={`${styles.navBtn} ${activePillar === p.key ? styles.navBtnActive : ""}`}
            style={activePillar === p.key ? { background: p.color, borderColor: p.color } : {}}
            onClick={() => setActivePillar(activePillar === p.key ? null : p.key)}
          >
            {p.emoji} {p.title}
          </button>
        ))}
      </div>

      <div className={styles.pillarsGrid}>
        {displayed.map((pillar) => (
          <div key={pillar.key} className={styles.pillarCard} style={{ borderTopColor: pillar.color }}>
            <div className={styles.pillarHeader}>
              <span className={styles.pillarEmoji}>{pillar.emoji}</span>
              <div>
                <h2 className={styles.pillarTitle} style={{ color: pillar.color }}>
                  {pillar.title}
                </h2>
                <span className={styles.pillarCode}>{pillar.code}</span>
              </div>
              <a
                href={pillar.link}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.pillarLink}
                title={`Open ${pillar.title} documentation`}
              >
                ↗
              </a>
            </div>
            <p className={styles.pillarDesc}>{pillar.description}</p>
            <div className={styles.recList}>
              <h3 className={styles.recHeading}>Recommendations</h3>
              {pillar.recommendations.map((rec) => (
                <a
                  key={rec.id}
                  href={rec.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.recItem}
                  title={rec.description}
                >
                  <span className={styles.recId} style={{ background: pillar.color }}>{rec.id}</span>
                  <span className={styles.recTitle}>{rec.title}</span>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WafOverview;
