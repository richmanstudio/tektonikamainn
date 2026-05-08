
type TeamMemberCardProps = {
  name: string;
  role: string;
  photo: string;
};

export default function TeamMemberCard({ name, role, photo }: TeamMemberCardProps) {
  return (
    <div className="text-center">
      <img
        src={photo}
        alt={name}
        className="w-40 h-40 object-cover rounded-full mx-auto mb-4 shadow-lg"
      />
      <h3 className="text-xl font-medium">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );
}
