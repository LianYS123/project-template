import { Typography } from "antd";

export const Card = ({ src, children, title, desc, info }) => {
  return (
    <section className="shadow-sm cursor-pointer px-4 py-3 flex rounded">
      <div className="flex flex-col justify-between">
        <div className="space-y-1 group">
          <h3 className="text-lg font-bold group-hover:underline">{title}</h3>
          <div className="flex">
            <p className="text-base max-h-24 overflow-hidden font-normal group-hover:underline mr-1 md:mr-4">
              {children}
            </p>
            <img
              src={src}
              alt="scene"
              className="object-cover rounded w-24 h-16 md:w-48 md:h-32"
            />
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
