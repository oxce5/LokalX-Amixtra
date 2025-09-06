export interface StepCardProps {
  number: number;
  title: string;
  description: string;
}

export default function StepCard({ number, title, description }: StepCardProps) {
  return (
    <div className="card shadow-sm text-center h-100">
      <div className="card-body">
        <div className="display-6 fw-bold mb-2">{number.toString().padStart(2, "0")}</div>
        <h5 className="card-title mb-2">{title}</h5>
        <p className="card-text text-muted">{description}</p>
      </div>
    </div>
  );
}
