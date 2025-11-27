import React, { useMemo, useState } from "react";
import patternsData from "./data/patterns.json";
import recommendationsData from "./data/recommendations.json";
import { Pattern, Recommendation } from "./types";
import styles from "./styles.module.css";

const getRecommendationLink = (id: string): React.JSX.Element => {
  const rec = (recommendationsData as Recommendation[]).find(r => r.id === id);
  if (!rec) return <div key={id} className={styles.recItem}>{id}</div>;

  return (
    <div key={id} className={styles.recItem}>
      <a href={rec.link} target="_blank" rel="noopener noreferrer">{rec.id}</a>
    </div>
  );
};

const renderPillar = (pillar: string[]) => {
  if (!pillar || pillar.length === 0) return <div></div>;
  return pillar.map((id) => getRecommendationLink(id));
};

const pillarKeyToField: { [key: string]: keyof Pattern } = {
  reliability: "reliability",
  security: "security",
  cost: "cost",
  operational: "operational",
  performance: "performance",
};

const Patterns: React.FC = () => {
  const patterns: Pattern[] = patternsData;

  const [search, setSearch] = useState<string>("");
  const [selectedPillars, setSelectedPillars] = useState<Record<string, boolean>>({
    reliability: false,
    security: false,
    cost: false,
    operational: false,
    performance: false,
  });

  const anyPillarSelected = Object.values(selectedPillars).some(Boolean);

  const filteredPatterns = useMemo(() => {
    const q = search.trim().toLowerCase();

    return patterns.filter((p) => {
      if (q) {
        const hay = (p.name + " " + p.summary).toLowerCase();
        if (!hay.includes(q)) return false;
      }

      if (anyPillarSelected) {
        const matchesPillar = Object.keys(selectedPillars).some((pillarKey) => {
          if (!selectedPillars[pillarKey]) return false;
          const field = pillarKeyToField[pillarKey];
          const arr = p[field] as string[];
          return Array.isArray(arr) && arr.length > 0;
        });

        if (!matchesPillar) return false;
      }

      return true;
    });
  }, [patterns, search, selectedPillars, anyPillarSelected]);

  const togglePillar = (pill: string) => {
    setSelectedPillars(prev => ({ ...prev, [pill]: !prev[pill] }));
  };

  const clearFilters = () => {
    setSearch("");
    setSelectedPillars({ reliability: false, security: false, cost: false, operational: false, performance: false });
  };

  return (
    <div className={styles.centerWrap}>
      <div className={styles.controls}>
        <div className={styles.topRow}>
          <input
            aria-label="Search patterns"
            placeholder="Search patterns by name or summary..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={styles.searchInput}
          />
          <button onClick={clearFilters} className={styles.clearButton}>Clear</button>
        </div>

        <div className={styles.pillarRow}>
          {Object.keys(pillarKeyToField).map((key) => (
            <label key={key} className={styles.pillarLabel}>
              <input type="checkbox" checked={!!selectedPillars[key]} onChange={() => togglePillar(key)} />
              <span>{key}</span>
            </label>
          ))}
        </div>

        <div className={styles.count}>
          <strong>{filteredPatterns.length}</strong> pattern(s) shown
        </div>
      </div>
      <div className={styles.tableWrap}>
        <table className={styles.patternsTable}>
          <thead>
            <tr>
              <th className={styles.patternCol}>Pattern</th>
              <th>Reliability</th>
              <th>Security</th>
              <th>Cost Optimization</th>
              <th>Operational Excellence</th>
              <th>Performance Efficiency</th>
            </tr>
          </thead>
          <tbody>
            {filteredPatterns.length === 0 ? (
              <tr>
                <td colSpan={6} className={styles.noResults}>No patterns match the current filters.</td>
              </tr>
            ) : (
              filteredPatterns.map((p, idx) => (
                <tr key={idx}>
                  <td className={styles.patternCol}>
                    <a className={styles.patternLink} href={p.link} target="_blank" rel="noopener noreferrer">{idx + 1}. {p.name}</a><br />
                    <div className={styles.patternSummary}>{p.summary}</div>
                    <div className={styles.patternTradeoffs}><b>Tradeoffs:</b> {p.remarks}</div>
                  </td>
                  <td>{renderPillar(p.reliability)}</td>
                  <td>{renderPillar(p.security)}</td>
                  <td>{renderPillar(p.cost)}</td>
                  <td>{renderPillar(p.operational)}</td>
                  <td>{renderPillar(p.performance)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Patterns;
