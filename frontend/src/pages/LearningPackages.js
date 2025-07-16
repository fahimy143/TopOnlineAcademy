import React, { useEffect, useState } from "react";
import styles from "../style/LearningPackages.module.css";

const LearningPackages = () => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/packages")
      .then((res) => res.json())
      .then((data) => setPackages(data))
      .catch((err) => console.error("Failed to load packages", err));
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Our Learning Packages</h2>
      <div className={styles.packagesGrid}>
        {packages.map((pkg) => (
          <div
            key={pkg.id}
            className={`${styles.packageCard} ${
              pkg.is_free ? styles.packageCardFree : ""
            }`}
          >
            <h3 className={styles.packageName}>{pkg.name}</h3>
            <p className={styles.packageDesc}>{pkg.description}</p>
            <p className={styles.packagePrice}>
              <strong>Price:</strong>{" "}
              {pkg.is_free ? "Free" : `$${Number(pkg.price).toFixed(2)}`}
            </p>
            <p className={styles.packageFeatures}>
              <strong>Features:</strong>
              <br />
              {pkg.features}
            </p>
            <button
              className={`${styles.buyButton} ${
                pkg.is_free ? styles.buyButtonFree : styles.buyButtonPaid
              }`}
              onClick={() =>
                alert(
                  pkg.is_free
                    ? "You selected the free plan!"
                    : "Purchase coming soon..."
                )
              }
            >
              {pkg.is_free ? "Choose Free Plan" : "Buy Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LearningPackages;
