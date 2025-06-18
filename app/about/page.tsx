// app/donate/page.tsx
import AboutSectionFour from "@/components/AboutSectionFour";
import AboutSectionOne from "@/components/AboutSectionOne";
import AboutSectionThree from "@/components/AboutSectionThree";
import AboutSectionTwo from "@/components/AboutSectionTwo";

export default function AboutPage() {
  return (
    <div className="sm:space-y-4">
      <AboutSectionOne />
      <AboutSectionTwo />
      <section className="md:py-8 md:px-12 max-w-5xl mx-auto text-lg md:text-4xl md:text-center  ">
        Our Mission is to raise and develop generations of{" "}
        <span className="text-chart-2 ">transformational leaders</span>,
        equipped to bring systemic and sustainable change, to every sphere of
        society.
      </section>
      <AboutSectionThree />

      <section className="md:py-8 md:px-8 max-w-8xl mx-auto text-lg md:text-3xl md:text-center  ">
        We teach you the necessary skills and qualities to effectively lead and
        manage people, organizations, and systems. <span className="text-purple-700">Leaders</span> must possess strong
        communication, decision-making, and{" "}
        <span className="text-chart-2">problem-solving skills</span>, as well as
        the ability to inspire and motivate others.
      </section>

      <AboutSectionFour />
    </div>
  );
}
