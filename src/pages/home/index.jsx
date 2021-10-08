import { Card } from "./Card";
import imgSrc from "./scene.jpg";

const Home = () => {
  const fakeData = [...Array(5)].map((_, index) => ({
    content: "",
    id: index,
    title: `TTT${index}`,
    info: "Lian",
    desc: "2020-10-04",
    src: imgSrc
  }));
  return (
    <div className="space-y-3">
      {fakeData.map(it => (
        <Card
          key={it.id}
          title={it.title}
          info={it.info}
          desc={it.desc}
          src={it.src}
        >
          {it.content}
        </Card>
      ))}
    </div>
  );
};
export default Home;
