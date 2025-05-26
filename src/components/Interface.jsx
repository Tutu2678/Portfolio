import HomeSection from "../pages/Home";
import AboutSection from "../pages/About";
import ProjectsSection from "../pages/ProjectsSection";
import ContactSection from "../pages/Contact";

const Interface = (props) => {
  const { onSectionChange } = props;
  return (
    <>
      <div className="flex flex-col items-center w-screen ">
        <HomeSection onSectionChange={onSectionChange} />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </div>
    </>
  );
};

export default Interface;
