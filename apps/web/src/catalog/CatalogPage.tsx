import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { WorkSummary } from "./types";

export interface CatalogItem extends WorkSummary {
  href: string;
  meta?: string;
}

interface CatalogPageProps {
  /** Plural noun shown in the heading and empty state, e.g. "reports". */
  noun: string;
  lede: ReactNode;
  items: CatalogItem[];
}

/** Listing page shared by `/slides`, `/reports` and `/posters`. */
export function CatalogPage({ noun, lede, items }: CatalogPageProps) {
  return (
    <section className="page">
      <div className="page-head">
        <div className="page-head-text stagger">
          <p className="eyebrow">Catalog</p>
          <h1 className="page-title">
            All <em>{noun}</em>
          </h1>
          <p className="hero-lede">{lede}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>Nothing here yet</h3>
          <p>No {noun} are registered in this deployment.</p>
        </div>
      ) : (
        <div className="deck-catalog deck-catalog-page">
          {items.map((item) => (
            <Link key={item.id} to={item.href} className="deck-card">
              <span className="deck-card-eyebrow">{item.id}</span>
              <span className="deck-card-title">{item.title}</span>
              <span className="deck-card-desc">{item.description}</span>
              {item.meta ? (
                <span className="deck-card-meta">{item.meta}</span>
              ) : null}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
