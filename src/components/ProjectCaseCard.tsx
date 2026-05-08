export type ProjectCase = {
  id: string;
  image: string;
  title: string;
  region: string;
  year: string;
  description: string;
  link: string;
};

type ProjectCaseCardProps = {
  project: ProjectCase;
};

export default function ProjectCaseCard({ project }: ProjectCaseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="h-48 overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transform hover:scale-105 transition"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-sm text-gray-500 mb-2">
          Регион: {project.region}, {project.year}
        </div>
        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
        <p className="text-gray-700 flex-1">{project.description}</p>
        <a
          href={project.link}
          className="mt-4 inline-block text-blue-600 hover:underline font-medium"
        >
          Подробнее →
        </a>
      </div>
    </div>
  );
}
