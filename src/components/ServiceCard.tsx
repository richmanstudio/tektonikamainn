

type ServiceCardProps = {
  title: string;
  desc: string;
};

export default function ServiceCard({ title, desc }: ServiceCardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow hover:shadow-md transition">
      <h3 className="text-2xl font-semibold mb-2">{title}</h3>
      <p className="leading-relaxed">{desc}</p>
    </div>
  );
}
