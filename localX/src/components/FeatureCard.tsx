export interface FeatureCardProps {
  title: string;
  description?: string;
}

export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <div className="card text-center shadow-sm">
      <div className="card-body">
        <h3 className="card-title fw-bold">{title}</h3>
        {description && <p className="card-text text-muted">{description}</p>}
      </div>
    </div>
  );
}
