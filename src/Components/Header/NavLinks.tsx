import { Link, useLocation } from "react-router-dom";

const NavLinks = ({ isVertical = false }) => {
  const links = [
    { name: "Find Jobs", url: "/find-jobs" },
    { name: "Find Talent", url: "/find-talent" },
    { name: "Post Job", url: "/post-job/0" },
    { name: "Posted Job", url: "/posted-job/0" },
    { name: "Job History", url: "/job-history" },
    { name: "SignUp", url: "/signup" },
    { name: "Job Matching", url: "/job-match" },
  ];

  const location = useLocation();

  return (
    <ul className={`flex ${isVertical ? 'flex-col items-start' : 'flex-row'} gap-5 text-mine-shaft-300 ${isVertical ? 'items-start' : 'items-center'}  overflow-x-auto scrollbar-hide md:overflow-x-visible`}>
      {links.map((link, index) => (
        <li
          key={index}
          className={`${
            location.pathname === link.url
              ? "border-bright-sun-400 text-bright-sun-400"
              : "border-transparent"
          } border-t-[3px] h-full flex items-center whitespace-nowrap ${isVertical ? 'w-full' : ''}`}
        >
          <Link to={link.url} className={isVertical ? 'block w-full py-2' : ''}>
            {link.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NavLinks;