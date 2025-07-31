import reiaImg from "../assets/reia.png";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="flex flex-col md:flex-row items-center max-w-7xl py-4 px-4 mx-auto justify-between ">
      <div className="md:w-1/2 space-y-6  ">
        <h1 className="text-4xl md:text-5xl font-bold">
          Invest Smarter in Real Estate
        </h1>
        <p className="text-gray-600 text-lg">
          Analyze, compare, and project your property investments in Bengaluru
          with confidence.
        </p>
        <Link to="/signup">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg">
            Get Started
          </button>
        </Link>
      </div>
      <div className="md:w-1/2 mt-10 md:mt-0">
        <img src={reiaImg} alt="Real estate" className="w-full h-auto" />
      </div>
    </section>
  );
};

export default Hero;
