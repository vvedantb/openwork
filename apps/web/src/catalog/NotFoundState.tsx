import { Link } from "@tanstack/react-router";

interface NotFoundStateProps {
  /** Singular noun, e.g. "deck". */
  noun: string;
  id: string;
  /** Catalog to send the reader back to. */
  backTo: "/slides" | "/reports" | "/posters";
}

/** Shown when a `/<kind>/<id>` route has no registry entry for `id`. */
export function NotFoundState({ noun, id, backTo }: NotFoundStateProps) {
  return (
    <section className="page">
      <div className="empty-state">
        <h3>Not found</h3>
        <p>
          There is no {noun} called <code>{id}</code>.
        </p>
        <Link to={backTo} className="btn primary">
          Back to catalog
        </Link>
      </div>
    </section>
  );
}
