import Hearder from "./_components/Header";

const Home = () => {
  return (
    <div>
      <Hearder />
      <div className="px-5 w-full h-screen">
        <h1 className="text-4xl font-bold">Welcome to DataVision</h1>
        <p>Your gateway to insightful data visualization with your business.</p>
      </div>
    </div>
  );
};

export default Home;
