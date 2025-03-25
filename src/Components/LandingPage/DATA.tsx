import { IconBriefcase, IconMapPin, IconPremiumRights, IconRecharging, IconSearch } from "@tabler/icons-react";
import { Certificate } from "crypto";
import { join } from "path";
import { title } from "process";

export const comp = ["Google","Amazon","Figma","Netflix","Meta","Spotify","Oracle","Walmart"];

export const jobCategory=[
    {   "name":"Digital Marketing",
        "desc":"Digital Marketing Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    },
    {   "name":"Arts & Design",
        "desc":"Arts & Design Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    },
    {   "name":"Content Writing",
        "desc":"Content Writing Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    },
    {   "name":"Customer Support",
        "desc":"Customer Support Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    },
    {   "name":"Data Entry",
        "desc":"Data Entry Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    },
    {   "name":"Digital Marketing",
        "desc":"Digital Marketing Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    },
    {   "name":"Finance",
        "desc":"Finance Field Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    },
    {   "name":"Human Resource",
        "desc":"Human Resource Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    },
    {   "name":"Sales",
        "desc":"Sales Field Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    },
    {   "name":"UI-UX Designer",
        "desc":"UI-UX Designer Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    },
    {   "name":"Web Developer",
        "desc":"Web Developer Is one of the best in industry",
        "jobs":"1k+ New Jobs Posted"
    }
]

export const Work=[
    {
        "name":"Build Your Resume",
        "desc":"Create a standout Resume With Us"
    },
    {
        "name":"Apply For Job",
        "desc":"Find And Apply For Job that match Your Skills"
    },
    {
        "name":"Get Hired",
        "desc":"Connect With Employers And Start Your Job."
    }
]

export const testimonials=[
    {
        "name":"Shiba Pandey",
        "tetimonial":"This job Portal Finds Jobs Easily And Quick To all Seekers",
        "rating": 5
    },
    {
        "name":"Shiba Pandey",
        "tetimonial":"This job Portal Finds Jobs Easily And Quick To all Seekers",
        "rating": 5
    },
    {
        "name":"Shiba Pandey",
        "tetimonial":"This job Portal Finds Jobs Easily And Quick To all Seekers",
        "rating": 4.5 
    },
    {
        "name":"Shiba Pandey",
        "tetimonial":"This job Portal Finds Jobs Easily And Quick To all Seekers",
        "rating": 5
    }
]
export const footerLinks = [
    {
        title: "Product", links:["Find Job", "Find Company", "Find Employee"] 
    },
    {
        title: "Company", links:["About Us", "Contact Us", "Privacy Policy", "Terms & Conditions"] 
    },
    {
        title: "Support", links:["Help & Support", "Feedback", "FAQs"] 
    }

]





export const dropdownData = [
  { title: "Job Title", icon: IconSearch, options: ['Designer', 'Developer', 'Product Manager', 'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support'] },
  { title: "Location", icon: IconMapPin, options: ['Delhi', 'New York', 'San Francisco', 'London', 'Berlin', 'Tokyo', 'Sydney', 'Toronto'] },
  { title: "Experience", icon: IconBriefcase, options: ['Entry Level', 'Intermediate', 'Expert'] },
  { title: "Job Type", icon: IconRecharging, options: ['Full Time', 'Part Time', 'Contract', 'Freelance', 'Internship'] }
]

export const jobList=[
    {
        jobTitle: "Product Designer",
        company: "Meta",
        applicants: 25,
        experience: "Entry Level",
        jobType: "Full-Time",
        location: "New York",
        package: "32 LPA",
        postedDaysAgo: 12,
        description: "Meta is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment. "
    },
    {
        jobTitle: "UI-UX Designer",
        company: "Google",
        applicants: 15,
        experience: "Entry Level",
        jobType: "Full-Time",
        location: "Philipines",
        package: "12 LPA",
        postedDaysAgo: 12,
        description: "Google is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment. "

    },
    {
        jobTitle: "Full-Stack Developer",
        company: "Instagram",
        applicants: 10,
        experience: "Entry Level",
        jobType: "Full-Time",
        location: "LasVegas",
        package: "12 LPA",
        postedDaysAgo: 12,
        description: "Instagram is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment. "
    },
    {
        jobTitle: "Software Developer",
        company: "Amazon",
        applicants: 10,
        experience: "Entry Level",
        jobType: "Full-Time",
        location: "India",
        package: "22 LPA",
        postedDaysAgo: 10,
        description: "Amazon is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment. "
    },

    {
        jobTitle: "Software Tester",
        company: "Apple",
        applicants: 45,
        experience: "Entry Level",
        jobType: "Full-Time",
        location: "Pune",
        package: "25 LPA",
        postedDaysAgo: 10,
        description: "Apple is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment. "
    },
    {
        jobTitle: "Fronted Developer",
        company: "TCS",
        applicants: 50,
        experience: "Entry Level",
        jobType: "Full-Time",
        location: "Pune",
        package: "25 LPA",
        postedDaysAgo: 10,
        description: "TCS is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment. "
    },
    {
        jobTitle: "Backend Developer",
        company: "TCS",
        applicants: 50,
        experience: "Entry Level",
        jobType: "Full-Time",
        location: "Pune",
        package: "25 LPA",
        postedDaysAgo: 10,
        description: "TCS is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment. "
    },
    {
        jobTitle: "Backend Developer",
        company: "TCS",
        applicants: 50,
        experience: "Entry Level",
        jobType: "Full-Time",
        location: "Pune",
        package: "25 LPA",
        postedDaysAgo: 10,
        description: "TCS is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment. "
    },
    {
        jobTitle: "Backend Developer",
        company: "TCS",
        applicants: 50,
        experience: "Entry Level",
        jobType: "Full-Time",
        location: "Pune",
        package: "25 LPA",
        postedDaysAgo: 10,
        description: "TCS is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment. "
    },
    {
        jobTitle: "Backend Developer",
        company: "TCS",
        applicants: 50,
        experience: "Entry Level",
        jobType: "Full-Time",
        location: "Pune",
        package: "25 LPA",
        postedDaysAgo: 10,
        description: "TCS is seeking a Product Designer to join our team. You'll be working on designing user-centric interfaces for our blockchain wallet platform. This is an excellent opportunity for entry-level designers to grow their skills in a dynamic environment. "
    },

];
export const searchFields = [
    {
        title: "Job Title", icon: IconSearch, options: ['Designer', 'Developer', 'Product Manager',
            'Marketing Specialist', 'Data Analyst', 'Sales Executive', 'Content Writer', 'Customer Support']
    },  
    {
        title: "Location", icon: IconMapPin, options: ['Delhi', 'New York', 'San Francisco', 'London', 'Berlin',
            'Tokio', 'Sydney', 'Toronto']
    },
    {
        title: "Skills", icon: IconRecharging, options: ["HTML", "CSS", "JavaScript", "React", "Angular", "Node.js", "Python",
            "Java", "Ruby", "PHP", "SQL", "MongoDB", "Post", "greSQL", "Git", "API Development", "Testing and Debugging", "Agile Methodologies",
            "DevOps", "AWS", "Azure", "Google Cloud"]
    }
];
export const talent = [
    {
        name: "Jarrod Wood",
        role: "Software Engineer",
        company: "Google",
        topSkills: ["React", "SpringBoot", "MongoDB"],
        about: "As a Software Engineer at Google, I specialize in building scalable and high-performance applications. My expertise lies in integrating front-end and back-end technologies to deliver seamless user experiences. With a strong foundation in React and SpringBoot, and a focus on MongoDB for database solutions, I am passionate about leveraging the latest technologies to solve complex problems and drive innovation. My goal is to create impactful software that enhances productivity and meets user needs effectively.",
        expectedCtc: "48-60LPA",
        location: "San Francisco, United States",
        image: "avatar"
    },
    {
        name: "Alice Johnson",
        role: "Frontend Developer",
        company: "Facebook",
        topSkills: ["HTML", "CSS", "JavaScript"],
        about: "As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.",
        expectedCtc: "40-55LPA",
        location: "San Francisco, United States",
        image: "avatar1"
    },
    {
        name: "Bob Smith",
        role: "Backend Developer",
        company: "Amazon",
        topSkills: ["NoadJs", "Express", "MySQL"],
        about: "As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.",
        expectedCtc: "40-55LPA",
        location: "San Francisco, United States",
        image: "avatar1"
    },
    {
        name: "Ravi",
        role: "Backend Developer",
        company: "TCS",
        topSkills: ["NoadJs", "Express", "MySQL"],
        about: "As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.",
        expectedCtc: "45-60LPA",
        location: "San Francisco, United States",
        image: "avatar"
    },
    {
        name: "Ravi",
        role: "Backend Developer",
        company: "TCS",
        topSkills: ["NoadJs", "Express", "MySQL"],
        about: "As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.",
        expectedCtc: "45-60LPA",
        location: "San Francisco, United States",
        image: "avatar"
    },
    {
        name: "Ravi",
        role: "Backend Developer",
        company: "TCS",
        topSkills: ["NoadJs", "Express", "MySQL"],
        about: "As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.",
        expectedCtc: "45-60LPA",
        location: "San Francisco, United States",
        image: "avatar"
    },
    {
        name: "Ravi",
        role: "Backend Developer",
        company: "TCS",
        topSkills: ["NoadJs", "Express", "MySQL"],
        about: "As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.",
        expectedCtc: "45-60LPA",
        location: "San Francisco, United States",
        image: "avatar"
    },
    {
        name: "Ravi",
        role: "Backend Developer",
        company: "TCS",
        topSkills: ["NoadJs", "Express", "MySQL"],
        about: "As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.",
        expectedCtc: "45-60LPA",
        location: "San Francisco, United States",
        image: "avatar"
    },
    {
        name: "Tom Moddy",
        role: "Backend Developer",
        company: "TCS",
        topSkills: ["NoadJs", "Express", "MySQL"],
        about: "As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.",
        expectedCtc: "45-60LPA",
        location: "San Francisco, United States",
        image: "avatar"
    }
];

export const profile = [
    {
        name: "Jarrod Wood",
        role: "Software Engineer",
        company: "Google",
        location: "San Francisco, United States",
        about: "As a Frontend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience. I am dedicated to staying current with the latest trends and best practices in web development to ensure optimal performance and accessibility. I thrive in collaborative environments where I can contribute to innovative projects and deliver solutions that meet user expectations.",
        skills: ["NoadJs", "Express", "MySQL"],
        experience: [
            {
                title:"Software Developer",
                company:"Google",
                location:"India",
                startDate:"Jun 2024 ",
                enddate:"Present",
                description:"As a Backend Developer at Facebook, I focus on creating visually appealing and highly interactive web applications. My expertise in HTML, CSS, and JavaScript allows me to build responsive and user-friendly interfaces that enhance user experience."
            }
        ],
        certificate: [
            {
                name:"Cloud Architect",
                issuer:"Amazon",
                issueDate:"Feb 2024",
                CertificateID:"GAHDD54B"
            },
            {
                name:"Java Experts ",
                issuer:"Google",
                issueDate:"Feb 2024",
                CertificateID:"GAHDGHDD54B"
            },
            {
                name:"DevOps",
                issuer:"Amazon",
                issueDate:"Feb 2023",
                CertificateID:"GAHD2D54B"
            },

        ]
    }
]

export const fields=[
    {
        label:"Job Title", placeholder:"Enter Job Title", options:['Designer','Developer','Product Manager','Marketing','Data Analyst','Sales Executive']
    },
    {
        label:"Company", placeholder:"Enter Company Name", options:['Google','Meta','Amazon','Microsoft','Netflix','Adobe','Apple','Spotify']
    },
    {
        label:"Experience", placeholder:"Enter Experience Level", options:['Entry Level','Intermediate','Expert']
    },
    {
        label:"Job Type", placeholder:"Enter Job Type", options:['Full Time','Part Time', 'Contract','Freelance','Internship']
    },
    {
        label:"location", placeholder:"Enter Job Location", options:['Delhi','Pune','Hydrabad','Banglore','Mumbai','Solapur']
    },
    {
        label:"Salary", placeholder:"Enter Salary", options:['10LPA','20LPA','30LPA','3.5LPA','4.4LPA']
    },
]

export const content=
    '<h4> About The Job</h4><p>Write Description Here...</p><h4>Responsibilities</h4><ul><li>Add responsibilities here....</li></ul><h4>Qualifications and skill Set</h4><ul><li>Add Required qualifications and skill set here....</li></ul>';


  export  const card=[
        {name : "Location", icon: IconMapPin, value: "New York" ,id:"location"},
        {name : "Experience", icon: IconBriefcase, value: "Expert",id:"experience" },
        {name : "Salary", icon: IconPremiumRights, value: "48-LPA", id:"packageOffered"},
        {name : "Job Type", icon: IconRecharging, value: "Full Time",id:"jobType"},
  ]
      export  const skillset=['React', 'Spring Boot', 'Java', 'Python', 'Node. js', 'MongoDB', 'Express','Django' , 'PostgreSQL ' ];
       export const descri="<h4>About The Job</h4><p> We are looking for a skilled Frontend Developer to join our team. You will be responsible for developing and maintaining user-facing features, ensuring high performance and responsiveness, and collaborating with designers and backend developers.</p><h4>Responsibilities:</h4><ul><li>Develop and maintain web applications using React.js and other modern frameworks.</li><li>Ensure the technical feasibility of UI/UX designs.</li><li>Optimize applications for maximum speed and scalability.</li><li>Collaborate with backend developers and designers to improve usability.</li><li>Maintain and improve website performance and accessibility.</li><li>Write clean, maintainable, and efficient code following best practices.</li>  <li>Participate in code reviews and provide constructive feedback.</li></ul><h4>Qualifications:</h4><ul> <li>Bachelor’s degree in Computer Science, Information Technology, or a related field.</li><li>Proven experience as a Frontend Developer or similar role.</li><li>Strong proficiency in HTML, CSS, JavaScript, and modern JavaScript frameworks like React.js.</li><li>Experience with state management libraries such as Redux or Context API.</li><li>Familiarity with RESTful APIs and asynchronous request handling.</li><li>Understanding of responsive and mobile-first design principles.</li><li>Knowledge of version control systems like Git.</li><li>Strongproblem-solving skills and attention to detail.</li><li>Excellent communication and teamwork skills.</li></ul>";
  

       export const companyData={
        Name: "Amazon",
        Overview: "Amazon is a multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
        Industry: "E-commerce, Cloud Computing, AI, Digital Streaming",
        Website: "https://www.amazon.com",
        Size: "1,500,000+ employees",
        Headquarters: "Seattle, Washington, United States",
        Specialties: [
        "E-commerce",
        "Cloud Computing",
        "Artificial Intelligence",
        "Digital Streaming",
        "Logistics",
        "Consumer Electronics"
    ]
}

export const similar=[
    {
        names: "Meta",
        employess:"58600"
    },
    {
        names: "TCS",
        employess:"8600"
    },
    {
        names: "Apple",
        employess:"56000"
    },
    {
        names: "Google",
        employess:"158600"
    },
    {
        names: "Instagram",
        employess:"58600"
    },
    {
        names: "Amazon",
        employess:"58600"
    },
    {
        names: "Meta",
        employess:"58600"
    },
    {
        names: "TCS",
        employess:"8600"
    },
    {
        names: "Apple",
        employess:"56000"
    }


] 

export const activeJobs = [
    {
      jobTitle: "Software Engineer",
      jobLocation: "New York, NY",
      posted: "2 days ago"
    },
    {
      jobTitle: "Marketing Specialist",
      jobLocation: "San Francisco, CA",
      posted: "5 days ago"
    },
    {
      jobTitle: "Product Manager",
      jobLocation: "Remote",
      posted: "8 days ago"
    },
    {
      jobTitle: "Data Analyst",
      jobLocation: "Austin, TX",
      posted: "1 day ago"
    },
    {
      jobTitle: "UI/UX Designer",
      jobLocation: "Los Angeles, CA",
      posted: "6 days ago"
    },
    {
      jobTitle: "Cybersecurity Analyst",
      jobLocation: "Washington, D.C.",
      posted: "3 days ago"
    },
    {
      jobTitle: "HR Coordinator",
      jobLocation: "Chicago, IL",
      posted: "10 days ago"
    },
    {
      jobTitle: "Financial Analyst",
      jobLocation: "Boston, MA",
      posted: "4 days ago"
    },
    {
      jobTitle: "Customer Support Specialist",
      jobLocation: "Remote",
      posted: "7 days ago"
    },
    {
      jobTitle: "DevOps Engineer",
      jobLocation: "Seattle, WA",
      posted: "9 days ago"
    }
  ]

 export const drafts=[
    {
        jobTitle: "Customer Support Specialist",
        jobLocation: "Remote",
        posted: "7 days ago"
      },
      {
        jobTitle: "DevOps Engineer",
        jobLocation: "Seattle, WA",
        posted: "9 days ago"
      },
      {
        jobTitle: "Network Engineer",
        jobLocation: "Dallas, TX",
        posted: "12 days ago"
      },
      {
        jobTitle: "Project Manager",
        jobLocation: "Denver, CO",
        posted: "14 days ago"
      },
      {
        jobTitle: "Backend Developer",
        jobLocation: "Atlanta, GA",
        posted: "11 days ago"
      },
      {
        jobTitle: "Sales Representative",
        jobLocation: "Houston, TX",
        posted: "15 days ago"
      },
      {
        jobTitle: "Quality Assurance Engineer",
        jobLocation: "San Diego, CA",
        posted: "13 days ago"
      },
      {
        jobTitle: "Technical Writer",
        jobLocation: "Phoenix, AZ",
        posted: "16 days ago"
      },
      {
        jobTitle: "IT Support Specialist",
        jobLocation: "Philadelphia, PA",
        posted: "18 days ago"
      },
      {
        jobTitle: "Machine Learning Engineer",
        jobLocation: "Miami, FL",
        posted: "20 days ago"
      },
      {
        jobTitle: "Operations Manager",
        jobLocation: "Las Vegas, NV",
        posted: "19 days ago"
      },
      {
        jobTitle: "Full Stack Developer",
        jobLocation: "Portland, OR",
        posted: "17 days ago"
      }
 ] 
  export const fieldss=[
    {
      label: "Job Title",
      placeholder: "Enter job title",
      options: [
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "UI/UX Designer",
        "DevOps Engineer",
        "Software Engineer",
        "QA Engineer",
        "Data Scientist",
        "Machine Learning Engineer"
      ],
      
        leftSection:IconBriefcase
      },
      {label: "Company",
        placeholder: "Enter Company Name",
        options: [
          'Google',
        'Microsoft',
        'Apple',
        'Amazon',
        'Facebook',
        'IBM',
        'Oracle',
        'Intel',
        'Salesforce',
        'Cisco'
        ],
        
          leftSection:IconBriefcase
        },
        {label: "Location",
            placeholder: "Enter Job Location",
            options: [
              'New York',
        'San Francisco',
        'Seattle',
        'Los Angeles',
        'Chicago',
        'Austin',
        'Boston',
        'Denver',
        'Atlanta',
        'Toronto'
            ],
           
              leftSection:IconMapPin
            }
  ]
  
  