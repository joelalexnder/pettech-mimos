import Link from "next/link";

interface Props {
  title: string;
  description: string;
  image: string;
  href?: string;
}

export default function ImageCard({ title, description, image, href }: Props) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div
        className="h-52 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm mb-4">{description}</p>
        {href && (
          <Link
            href={href}
            className="text-sky-600 font-semibold hover:underline"
          >
            Ver más →
          </Link>
        )}
      </div>
    </div>
  );
}