import { Typography } from "antd";

export const Card = ({ src, children, title, desc, info }) => {
  return (
    <section className="shadow-sm cursor-pointer px-4 py-3 flex rounded">
      <div className="flex flex-col justify-between">
        <div className="space-y-1 group">
          <h3 className="text-lg font-bold group-hover:underline">{title}</h3>
          <div className="flex h-16 md:h-24">
            <p className="text-sm h-full md:text-base overflow-hidden font-normal group-hover:underline mr-1 md:mr-4">
              {children}
            </p>
            <div className="h-full w-24 flex-shrink-0 md:w-40">
              <img
                src={src}
                alt="scene"
                className="object-cover rounded w-full h-full"
              />
            </div>
          </div>
        </div>
        <div className="font-semibold">
          <div className="text-gray-500 font-thin space-x-2">
            <span className="text-green-600 text-base sm:text-lg font-light hover:underline">
              {info}
            </span>
            <span>{desc}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
