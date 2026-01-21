//SSG
import Header from "../components/Header";

export default function Home() {
  return (
    <>
      <Header title="Home"/>
        <div className="">

          {/* First Section By Oni */}
          <section className="bg-white">
            <div className="flex justify-between px-5 mx-5 min-h-[80vh] items-center">
                  <div className="w-fit ml-5 p-7 ">
                  <h1 className="flex justify-center text-[rgb(13,13,13)] text-4xl font-bold w-1/2">Learn essential career and life skills</h1>
                  <p className="mt-10 text-lg text-[rgb(13,13,13)]">
                    Our platform offers a wide range of courses designed to help you develop the skills needed to succeed in today's competitive job market. Whether you're looking to improve your communication skills, learn project management, or enhance your technical abilities, we have something for everyone.
                  </p>
                  <p className="mt-10 text-lg text-gray-400">
                    Join us today and take the first step towards a brighter future!
                  </p>
                </div>
                <div className="ml-4 w-fit">
                  <img src="/manyJob.jpg" alt="many jobs" className="bg-transparent" />
                </div>
                </div>


                <div className="flex justify-between px-5 mx-5 min-h-[80vh] items-center">
                <div className="ml-4 w-fit">
                  <img src="/visuJob.jpg" alt="many jobs" className="bg-transparent" />
                </div>
                <div className="w-fit ml-5 p-7 ">
                  <h1 className="flex justify-center text-4xl font-bold w-1/2 text-[rgb(13,13,13)]"> Open Your Mind </h1>
                  <p className="mt-10 text-[rgb(13,13,13)] text-lg">
                    Our platform offers a wide range of courses designed to help you develop the skills needed to succeed in today's competitive job market. Whether you're looking to improve your communication skills, learn project management, or enhance your technical abilities, we have something for everyone.
                  </p>
                  <p className="mt-10 text-lg text-gray-400">
                    Unleash your potential and explore new opportunities with us!
                  </p>
                </div>
                
                </div>


                <div className="flex justify-between px-5 mx-5 min-h-[80vh] items-center">
                  <div className="w-fit ml-5 p-7 ">
                  <h1 className="flex justify-center text-4xl font-bold w-1/2 text-[rgb(13,13,13)]"> Visualize Your Success </h1>
                  <p className="mt-10 text-lg text-[rgb(13,13,13)]">
                    Our platform offers a wide range of courses designed to help you develop the skills needed to succeed in today's competitive job market. Whether you're looking to improve your communication skills, learn project management, or enhance your technical abilities, we have something for everyone.
                  </p>
                  <p className="mt-10 text-lg text-gray-400">
                    Join us today and take the first step towards a brighter future!
                  </p>
                </div>
                <div className="ml-4 w-fit bg-transparent">
                  <img src="/oneJob.jpg" alt="many jobs" className="" />
                </div>
                </div>
          </section>

          {/* Middle One by Arif */}
          <section className="bg-[#0a1a3a] text-white">
            {/* HERO */}
            <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-14 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                  Find the Right Job. <br />
                  <span className="text-cyan-400">Faster & Smarter.</span>
                </h1>
                <p className="text-lg text-gray-300 mb-8">
                  Discover opportunities, apply with ease, upload your CV,
                  and track your interview progress — all from one platform.
                </p>
                <div className="flex gap-4">
                  <button className="bg-cyan-400 text-black px-6 py-3 rounded-md font-semibold hover:bg-cyan-300">
                    Browse Jobs
                  </button>
                  <button className="border border-white px-6 py-3 rounded-md hover:bg-white hover:text-black">
                    Upload CV
                  </button>
                </div>
              </div>

              <div className="w-full h-80">
                <img
                  src="/jobs.jpg"
                  alt="Job Seeker Platform"
                  className="rounded-xl shadow-2xl w-full h-full object-cover"
                />
              </div>
            </div>
      
            {/* BENEFITS */}
            <div className="bg-white text-black py-20">
              <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl font-bold text-center mb-14">
                  Everything You Need as a Job Agency
                </h2>
      
                <div className="grid md:grid-cols-4 gap-8">
      
                  {[
                    {
                      img: "/search-jobs.png",
                      title: "Search Jobs",
                      desc: "Find jobs that match your skills and career goals.",
                    },
                    {
                      img: "/easy-apply-for-job.png",
                      title: "Easy Apply",
                      desc: "Apply to multiple jobs with just a few clicks.",
                    },
                    {
                      img: "/cv-management.png",
                      title: "CV Management",
                      desc: "Upload and manage your CV securely in one place.",
                    },
                    {
                      img: "/interview-updates.png",
                      title: "Interview Updates",
                      desc: "Track interview schedules and application status.",
                    },
                  ].map((feature) => (
                    <button
                      key={feature.title}
                      className="flex flex-col p-6 border rounded-lg text-center shadow-sm hover:shadow-lg transition hover:scale-105 focus:outline-none"
                    >
                      <div className="w-full h-40 flex items-center justify-center mb-4">
                        <img
                          src={feature.img}
                          alt={feature.title}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.desc}</p>
                    </button>
                  ))}
      
                </div>
              </div>
            </div>
      
            {/* CTA */}
            <div className="bg-black py-20">
              <div className="max-w-7xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">
                  Your Next Job Is Just One Click Away
                </h2>
                <p className="text-gray-400 mb-8">
                  Join thousands of job seekers building their careers with confidence.
                </p>
                <button className="bg-cyan-400 text-black px-8 py-3 rounded-md font-semibold hover:bg-cyan-300">
                  Create Free Account
                </button>
              </div>
            </div>
          </section>
        </div>
    </>
  );
}
