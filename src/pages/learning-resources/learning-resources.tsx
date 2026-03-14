import React from "react";
import resources from "./data/resources.json";
import styles from "./styles.module.css";

interface ResourceItem {
  title: string;
  description: string;
  url: string;
  type: string;
  badge: string;
}

interface ResourceCategory {
  category: string;
  icon: string;
  items: ResourceItem[];
}

const badgeColors: Record<string, string> = {
  "Free": "#27ae60",
  "AZ-305": "#8e44ad",
  "AZ-400": "#8e44ad",
  "Docs": "#2980b9",
  "Tool": "#e67e22",
  "GitHub": "#24292f",
  "Blog": "#e74c3c",
  "Resource": "#2980b9",
  "Reliability": "#e74c3c",
  "Security": "#e67e22",
  "Cost": "#27ae60",
  "Operations": "#8e44ad",
  "Performance": "#2980b9",
};

const categories: ResourceCategory[] = resources;

const LearningResources: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1 className={styles.heading}>Learning Resources</h1>
        <p className={styles.subheading}>
          A curated collection of resources to help you learn, understand, and apply the Azure Well-Architected Framework in your projects.
        </p>
      </div>

      {categories.map((cat) => (
        <section key={cat.category} className={styles.section}>
          <h2 className={styles.categoryTitle}>
            <span>{cat.icon}</span> {cat.category}
          </h2>
          <div className={styles.grid}>
            {cat.items.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.card}
              >
                <div className={styles.cardTop}>
                  <span
                    className={styles.badge}
                    style={{ background: badgeColors[item.badge] ?? "#438a8b" }}
                  >
                    {item.badge}
                  </span>
                </div>
                <h3 className={styles.cardTitle}>{item.title}</h3>
                <p className={styles.cardDesc}>{item.description}</p>
                <span className={styles.cardCta}>Explore →</span>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default LearningResources;
