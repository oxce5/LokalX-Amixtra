export interface WorkCardProps {
  title: string;
  artist: string;
  imageUrl?: string;
}

export default function WorkCard({ title, artist, imageUrl }: WorkCardProps) {
  return (
    <div className="card shadow-sm">
      <div
        className="card-img-top"
        style={{
          height: "200px",
          backgroundColor: "#e9ecef",
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">{artist}</p>
      </div>
    </div>
  );
}
