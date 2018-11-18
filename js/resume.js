/*
The Idea: Make a dropdown menu of different jobs I'm applying for and have the
resume change to highlight different experience depending on the job role.

Excpected Action: clicking on the job title displays a dropdown of different
job roles. Clicking on the role updates the resume text to highlight different
strengths, and hides the dropdown menu.

Data architecture: a 2-dimensional dictionary (a dict of dicts) that stores 
the data according to 1. the job role and 2. the part of the resume. 
some data is further separated out into deeper layers of lists and dictionaries
as is appropriate. Content may be defined ouside of the main data object to
avoid a POD.
*/

/* START TEMPLATES */
/* 
rather than using a database, I've hardcoded the main data content. It can
be moved an external service at a later date, but this acheives the main goal.
*/

/* expertise templates */

const TPMExpertise = [
    "Adept at listening to and analyzing stakeholders' needs, and communicating with team members to deliver the best solution",
    "Consistently employs collaborative lean and agile methodologies to optimize workflows, provide top class customer service, and deliver breakthrough technologies to ensure optimal performance on complex projects and technical initiatives",
    "Skilled in communicating consistently with clients, discussing their specific design goals, presenting unique solutions, and modifying as necessary until achievement of full client approval and consensus",
    "Outstanding interpersonal and communication soft skills leveraged to train users, troubleshoot system issues, and ensure total stakeholder satisfaction while directing multiple tasks effectively to ensure on target completion of all deliverables"
]

const UXRExpertise = [
    "Adept at listening to and analyzing users' goals and needs, and communicating with team members to deliver the best solution",
    "Consistently employs collaborative lean and agile methodologies to optimize user experience, deliver breakthrough technologies, and ensure optimal performance on complex projects and technical initiatives",
    "Skilled in communicating consistently with clients, discussing their specific design goals, presenting unique solutions, and modifying as necessary until achievement of full client approval and consensus",
]

const CEExpertise = TPMExpertise;

const FSDExpertise = [
    "Adept at listening to and analyzing end user goals and needs, and communicating with team members to deliver the best solution",
    "Consistently employs collaborative lean and agile methodologies to optimize user experience, deliver breakthrough technologies, and ensure optimal performance on complex projects and technical initiatives",
    "Skilled in communicating consistently with beta users, discussing their specific workflow goals, presenting unique solutions, and modifying on a continuous basis to deliver the best possible user experience",
]

const LPDExpertise = [
    "Adept at listening to and analyzing clients’ needs, and communicating with team members to deliver the best solution",
    "Consistently employs collaborative lean and agile methodologies to optimize workflows, provide top class customer experience, and deliver breakthrough technologies to ensure optimal performance on complex projects and technical initiatives",
    "Skilled in communicating consistently with clients, discussing their specific design goals, presenting unique solutions, and modifying as necessary until achievement of full client approval and consensus",
    "Outstanding interpersonal and communication soft skills leveraged to train users, collaborate with team members, troubleshoot system issues and ensure total client satisfaction while directing multiple tasks effectively to ensure on target completion of all deliverables"
]

const GDExpertise = [LPDExpertise[0],
    "Excels at working with OPA (other peoples' artwork) creating both original designs with submitted elements and variations on a theme while adhering to strict brand & regulatory standards",
    LPDExpertise[2],
];

const QAAEExpertise = [
    "Researching and implementing new technologies and approaches",
    "Analyzing and communicating test results",
    "Creating reusable test data sets from real-world instances"];

const PDFSExpertise = [
    "Consistently employing collaborative agile methodologies to optimize workflows, and deliver breakthrough technologies to ensure optimal performance on complex projects and technical initiatives",
    "Listening to and analyzing end user goals and needs, and communicating with team members to deliver the best solution",
    "Skilled in communicating consistently with beta users, discussing their specific workflow goals, presenting unique solutions, and modifying on a continuous basis to deliver the best possible user experience",
    ];

/* proficiencies templates */

const TPMProficiencies = [{
        "title": "Languages",
        "content": "Full Stack Python (Flask, 4y+), Javascript/jQuery (4y+), SQL (3y+)"
    },
    {
        "title": "Tools",
        "content": "Git/Github, Trello/Asana (scrum boards), Slack"
    },
    {
        "title": "Hardware",
        "content": "Mac/Windows/Linux Server Administration, <span class='nowrap'>Containerized Cloud Platforms (AWS RDS, Heroku)</span>",
    },
    {
        "title": "Methodologies",
        "content": "Agile, Scrum, Lean, SDLC",
    },
]

const UXRProficiencies = [{
        "title": "Languages",
        "content": "Full Stack Python (Flask, 4y+), Javascript/jQuery (4y+), SQL (3y+)",
    },
    {
        "title": "Tools",
        "content": "InVision (1y+), Adobe Creative Suite (10y+)"
    },
    {
        "title": "Methodologies",
        "content": "Agile, Lean, SDLC",
    },
]

const CEProficiencies = [{
        "title": "Languages",
        "content": "Full Stack Python (Flask, 4y+), Javascript/jQuery (4y+), SQL (3y+), Java (1y+)",
    },
    {
        "title": "Frameworks",
        "content": "Flask (Python, 3y+)",
    },
    {
        "title": "Tools",
        "content": "Slack, Trello (scrum)"
    },
    {
        "title": "Traits",
        "content": "Autodidactic, Self-motivated, Excels at independent learning, Thrives on a small and highly collaborative team, Able to manage multiple tasks and priorities "
    },
    {
        "title": "Passions",
        "content": "Working on customer-facing issues, Documenting and automating repeated tasks, Synthesizing large amounts of data into a well-defined solution, Making and deploying fixes to frontend and backend services in production"
    },
    {
        "title": "Skills",
        "content": "Juggling small tasks along with large projects, Communicating complex ideas accurately with technical and non-technical co-workers, Improving and useful new adding features, Supporting tools used by internal teams, Creating and documenting procedures for common tasks, Customer service and collaboration, Written and verbal communication",
    },
    {
        "title": "Methodologies",
        "content": "Agile, Lean, SDLC",
    },
]

var FSDProficiencies = [{
    "title": "Languages",
    "content": "Full Stack Python (Flask, 4y+), Javascript/jQuery (4y+), SQLite / MySQL (3y+), Java (1y+)",
},
{   "title": "Methodologies",
    "content": "Agile, Lean, SDLC, TDD, Continuous Integration / Delivery / Deployment",
}].concat(TPMProficiencies.slice(1, 3));


const LPDProficiencies = [{
        "title": "Languages",
        "content": "Full Stack Python (Flask, 4y+), Javascript/jQuery (4y+), SQLite / MySQL (3y+)"
    },
    {
        "title": "Frameworks",
        "content": "Flask (Python, 3y+), Django (Python, 1y+)",
    },
    {
        "title": "Tools",
        "content": "Git/Github, Trello/Asana (scrum boards), Slack"
    },
    {
        "title": "Skills",
        "content": "Juggling small tasks along with large projects, Communicating complex ideas accurately with technical and non-technical co-workers, Supporting tools used by internal teams, Creating and documenting procedures for common tasks and then automating them, Customer service and collaboration, Excellent written and verbal communication",
    },
    {
        "title": "Hardware",
        "content": "Mac/Windows/Linux Server Administration, <span class='nowrap'>Containerized Cloud Platforms (AWS RDS, Heroku)</span>",
    },
    {
        "title": "Methodologies",
        "content": "Agile, Lean, SDLC, TDD, CI/CD/CD",
    },
]
const GDProficiencies = [{
        "title": "Programs",
        "content": "Adobe Illustrator (10y+), Adobe Photoshop (12y+), Adobe InDesign (10y+)",
    },
    {
        "title": "Skills",
        "content": "Working simultaneously on 5+ projects, Balancing short-term tasks with long-term projects, Combining disparate elements created by other professionals and building variations on established styles and themes, Excellent interpersonal communication",
    }
]

const QAAEProficiencies = [
    CEProficiencies[0],
    {
        "title": "Tools",
        "content": "Selenium, Trello (Scrum boards for bug tracking), Slack",
    },
    {
        "title": "Skills",
        "content": "Creating and documenting procedures for test conditions and automating them, Excellent written and verbal communication, Self-starter, Highly analytical and organized",
    },
    {
        "title": "Methodologies",
        "content": "Lean, Agile, SDLC, TDD, CI/CD/CD",
    },
    ]

const PDFSProficiencies = [
    {
        "title": "Languages",
        "content": "Full Stack Python (Flask, 4y+), Javascript/jQuery (4y+), SQLite / MySQL (3y+), Java (1y+)",
    },
    {
        "title": "Frameworks",
        "content": "Flask (Python, 3y+)",
    },    {   "title": "Methodologies",
        "content": "Agile, Lean, SDLC, TDD, Continuous Integration / Delivery / Deployment",
    },
    {
        "title": "Tools",
        "content": "Trello, Slack",
    },
    {
        "title": "Hardware",
        "content": "Linux Server Administration, <span class='nowrap'>Containerized Cloud Platforms (AWS RDS, Heroku)</span>",
    },

    ]


/* experience templates */
const TreehouseStickersExperience = {
    "company": "<a href='https://www.treehousestickers.com'>Treehouse Stickers</a> | Portland, Oregon",
    "role": "Technical Co-founder / Product Manager",
    "date": "(August/2012 – February/2018)",
    "description": `Codified business processes into a centralized cloud-native Python application, a full cycle customer order management system based on UX feedback from customers and employees. Spearheaded UI design from scratch, 
        building wireframes and functional prototypes. Conducted A/B beta user tests and implemented adjustments for optimal user experience. Built relationships with clients and production employees 
        while monitoring the solutions delivered to respective clients.`,
    "achievements": [
        "Led the SEO initiatives to maximize the return on investment by developing and maintaining the company web properties, achieving the #1 organic search result for “Custom Stickers Portland” in a competitive environment",
        "Delivered top-class user experience for new internal users by providing timely responses with information about product updates and feature request progress, addressing customer issues in a professional manner",
        "Grew business operations from a 4-person, $18,000 seed investment to 8-person, six-figure annual revenue and negotiated a successful exit via acquisition",
    ],
}
const IndependentEngagementExperience = {
    "company": "Independent Engagement",
    "role": "Graphic, Video & Web Designer",
    "date": "(August/2009 – Present)",
    "description": `Worked in a remote environment and developed customized technical and media solutions for clients from multiple industries. Held concurrent responsibility for design tasks and interacting with clients, identifying their needs, 
        and collecting relevant information about products, services and their users. Ensured compliance with approved standards to provide quality solutions.`,
    "achievements": [
        "Continued development on Treehouse Stickers platform as a contractor, providing training, maintenance and fulfilling feature requests for employees of the acquiring company",
        "Produced a video series for Niantic Labs on a a 3-week cross-country tour under field conditions, shooting, editing, and uploading each video in under 24 hours"
    ],
}
const TPMExperience = [TreehouseStickersExperience, IndependentEngagementExperience];
const UXRExperience = [TreehouseStickersExperience, IndependentEngagementExperience];
const CEExperience = TPMExperience;
const FSDExperience = [{
    "company": TreehouseStickersExperience["company"],
    "role": "Technical Co-founder / Lead Full Stack Developer",
    "date": TreehouseStickersExperience["date"],
    "description": "Codified business workflow processes into a centralized cloud-native Python application, a full cycle customer relationship management system based on UX feedback from customers and employees. Spearheaded UX & UI design from scratch, building wireframes and functional prototypes. Gained extensive experience with APIs, both using 3rd party APIs and building my own for using with frontend frameworks. Built in business analytics to define, capture, and use real-time event data for business insights and new product features. Conducted A/B beta user tests and implemented adjustments for optimal user experience. Built relationships with clients and production employees while monitoring the solutions delivered to respective clients.",
    "achievements": TreehouseStickersExperience["achievements"],
}]
const LPDExperience = [{
    "company": TreehouseStickersExperience["company"],
    "role": "Technical Co-founder / Lead Python Developer",
    "date": TreehouseStickersExperience["date"],
    "description": `Codified business processes into a centralized cloud-native Python application, a full cycle customer order management system based on UX feedback from customers and employees.
        Collaborated with users and developers to implement adjustments for optimal user experience. Built relationships with clients and employees while monitoring the solutions delivered to respective clients.`,
    "achievements": [
        TreehouseStickersExperience["achievements"][0],
        "Delivered top-class user experience for new internal users by providing timely responses with information about product updates and feature request timelines, addressing customer issues in a professional manner",
        TreehouseStickersExperience["achievements"][2],
        ]
},
{
    "company": IndependentEngagementExperience["company"],
    "role": "Graphic / Video / Web Designer",
    "date": IndependentEngagementExperience["date"],
    "description": `Worked in a remote environment and developed customized technical and media solutions for clients from multiple industries. Held concurrent responsibility for design tasks and interacting with clients, identifying their needs, 
        and collecting relevant information about products, services and their users. Interfaced with offshore teams in a leadership capacity, and ensured compliance with approved standards.`,
    "achievements": IndependentEngagementExperience["achievements"],
}]
const GDExperience = [
    {
        "company": TreehouseStickersExperience["company"],
        "role": "Technical Co-founder / Graphic Design Lead",
        "date": TreehouseStickersExperience["date"],
        "description": `Worked with client-submitted artwork to construct print-ready files. Built relationships with production employees 
            while ensuring the quality of print solutions delivered to customers. Codified business practices into a centralized cloud-native web application, resulting in the significant improvment of customer experience, order fidelity, and reduction of our-fault order reprints`,
        "achievements": [
            TreehouseStickersExperience["achievements"][0],
            "Delivered top-class design solutions by communicating directly with stakeholders, addressing customer issues in a professional manner",
            TreehouseStickersExperience["achievements"][2],
            "Executed negotiations to get acquired by a larger printing company"]
    },
    {
        "company": IndependentEngagementExperience["company"],
        "role": "Graphic / Video / Web Designer",
        "date": IndependentEngagementExperience["date"],
        "description": `Worked in a remote environment and developed customized technical and media solutions for clients from multiple industries. Held concurrent responsibility for design tasks, interacting with clients, identifying their needs, 
            and collecting relevant information about products, services and their users. Ensured compliance with strict regulatory standards.`,
        "achievements": [
            IndependentEngagementExperience["achievements"][1]],
    }
]
const QAAEExperience = [
    {
        "company": TreehouseStickersExperience["company"],
        "role": TreehouseStickersExperience["role"],
        "date": TreehouseStickersExperience["date"],
        "description": `Codified business processes into a centralized cloud-native Python application according to TDD and CI/CD/CD methodologies. Created, executed, and maintained test automations.
         Conducted automated tests for web browsers (Selenium) and mobile (Robotium). Used SQL to prepare and track test data, and for results analysis. Used coverage.py to provide metrics and reports.`,
        "achievements": [
            TreehouseStickersExperience["achievements"][1],
            "Built strong developer skills in several languages including Java, Javascript and Python",
            ]
    }
    ]

const PDFSExperience = [
    {
        "company": TreehouseStickersExperience["company"],
        "role": "Technical Co-founder / Full Stack Python Developer",
        "date": TreehouseStickersExperience["date"],
        "description": "Codified business workflow processes into a centralized cloud-native Python application (Frontend/Backend/Database), a full cycle customer relationship management system based on UX feedback from customers and employees. Spearheaded UX & UI design from scratch, building wireframes and functional prototypes. Gained extensive experience with APIs, both using 3rd party APIs and building my own for using with frontend frameworks.",
        "achievements": [
            TreehouseStickersExperience["achievements"][1],
            "Built strong developer skills in several languages including Java, Javascript and Python",
            ]
    }
    ]


/* education templates */

const teamTreehouse = {
    "name": "Team Treehouse - Online Training",
    "date": "(August/2015 – Present)",
    "description": "Continuing technology education in subjects ranging from Python, SQL and Javascript to HTML and CSS ",
}
const brooksIP = {
    "name": "Brooks Institute of Photography - Ventura CA",
    "date": "(July/2006 – February/2008)",
    "description": "Completed coursework in Visual Communications / Graphic Design",
}
const TPMEducation = [teamTreehouse, ];
const UXREduction = [teamTreehouse, brooksIP];
const CEEducation = [teamTreehouse, ];
const GDEducation = [brooksIP];
const QAAEEducation = [teamTreehouse, ];
const PDFSEducation = [teamTreehouse, ];
const POExperience = [{
    "company": TreehouseStickersExperience["company"],
    "role": "Technical Co-founder / Product Manager",
    "date": TreehouseStickersExperience["date"],
    "description": `Codified business processes into a centralized cloud-native Python application, a full cycle e-commerce / customer order management system based on UX feedback from customers and employees. Conducted A/B beta user tests and implemented adjustments for optimal user experience. 
        Collaborated with users and developers to implement new features and adjustments for optimal user experience. 
        Built relationships with clients and production employees while monitoring supply chain and production lines to ensure fluid product fulfillment in short, time-critical product cycles. `,
    "achievements": [
        "Delivered top-class user experience for new internal users by providing timely responses with information about product updates and feature request timelines, addressing customer issues in a professional manner",
        TreehouseStickersExperience["achievements"][2],
        ]
}, IndependentEngagementExperience];


/* END TEMPLATES */

// load data into the main dictionary to update. could be used as an API.
const data = {
    "TPM": {
        "title": "Technical Product Manager",
        "jobDesc": "Tech-savvy, dynamic, results-oriented professional with 9+ years experience enhancing client relationships and 4+ years developing innovative software solutions",
        "proficiencies": TPMProficiencies,
        "expertise": TPMExpertise,
        "experience": TPMExperience,
        "education": TPMEducation,
    },
    "UXR": {
        "title": "User Experience Researcher",
        "jobDesc": "Innovative, dynamic, detail-oriented professional with 4+ years experience developing innovative user-centric design solutions",
        "proficiencies": UXRProficiencies,
        "expertise": UXRExpertise,
        "experience": UXRExperience,
        "education": UXREduction,
    },
    "CE": {
        "title": "Customer Engineer",
        "jobDesc": "Tech-savvy, autodidactic, results-oriented professional with 9+ years experience enhancing customer experiences and 4+ years developing innovative software solutions",
        "proficiencies": CEProficiencies,
        "expertise": CEExpertise,
        "experience": CEExperience,
        "education": CEEducation,
    },
    "PM": {
        "title": "Product Manager",
        "jobDesc": "Tech-savvy, dynamic, results-oriented professional with 4+ years experience managing innovative software products",
        "proficiencies": TPMProficiencies,
        "expertise": TPMExpertise,
        "experience": TPMExperience,
        "education": TPMEducation,
    },
    "FSD": {
        "title": "Full Stack Developer",
        "jobDesc": "Tech-savvy, autodidactic, results-oriented professional with 4+ years experience developing innovative software tools",
        "proficiencies": FSDProficiencies,
        "expertise": FSDExpertise,
        "experience": FSDExperience,
        "education": [teamTreehouse, brooksIP],
    },
    "LPD": {
        "title": "Lead Python Developer",
        "jobDesc": "Savvy, diplomatic, results-oriented professional with 5+ years of entrepreneurship experience and 4+ years experience leading development teams creating innovative software products",
        "proficiencies": LPDProficiencies,
        "expertise": LPDExpertise,
        "experience": LPDExperience,
        "education": [teamTreehouse],
    },
    "GD": {
        "title": "Graphic Designer",
        "jobDesc": "Tech-savvy, dynamic, results-oriented design professional with 10+ years freelance graphic design experience and 5+ years managing print production operations",
        "proficiencies": GDProficiencies,
        "expertise": GDExpertise,
        "experience": GDExperience,
        "education": GDEducation,
    },
    "QAAE": {
        "title": "QA Automation Engineer",
        "jobDesc": "Tech-savvy, self-starting, detail-oriented professional with 4+ years developing test-driven software applications",
        "proficiencies": QAAEProficiencies,
        "expertise": QAAEExpertise,
        "experience": QAAEExperience,
        "education": QAAEEducation,
    },
    "DSE": {
        "title": "Developer Support Engineer",
        "jobDesc": "Tech-savvy, dynamic, results-oriented professional with 9+ years experience enhancing client relationships and 4+ years developing innovative software solutions",
        "proficiencies": TPMProficiencies,
        "expertise": TPMExpertise,
        "experience": TPMExperience,
        "education": TPMEducation,
    },
    "PDFS": {
        "title": "Python Developer (Full Stack)",
        "jobDesc": "Tech-savvy, dynamic, results-oriented professional with 4+ years developing innovative software solutions",
        "proficiencies": PDFSProficiencies,
        "expertise": PDFSExpertise,
        "experience": PDFSExperience,
        "education": PDFSEducation,
    },
    /*
    "CSM": {
        "title": "Customer Success Manager",
        "jobDesc": "Tech-savvy, dynamic, results-oriented professional with 9+ years experience enhancing client relationships and 4+ years developing innovative software solutions",
        "proficiencies": TPMProficiencies,
        "expertise": TPMExpertise,
        "experience": TPMExperience,
        "education": TPMEducation,
    },
    */
    "PO": {
        "title": "Product Manager / Owner",
        "jobDesc": "Tech-savvy, dynamic, results-oriented professional with 9+ years experience enhancing client relationships and 4+ years developing innovative software solutions",
        "proficiencies": TPMProficiencies,
        "expertise": TPMExpertise,
        "experience": POExperience,
        "education": TPMEducation,
    },

}


// import HTML elements to manipulate
const headTitle = document.getElementsByTagName('title')[0];
const jobDesc = document.getElementById('jobDesc');
const jobTitle = document.getElementById('jobTitle');
const proficiencies = document.getElementById('proficiencies');
const expertise = document.getElementById('expertise');
const experience = document.getElementById('experience');
const education = document.getElementById('education');


const headTitleContents = "Maxwell Hunter's Dynamic Resume "

function setHeadTitle(job = "") {
    let date = new Date();
    let dateArray = [date.getMonth()+1, date.getDate(), date.getFullYear().toString().substring(2)];
    let dateString = dateArray.join("-");
    if (job.length) {
        job = " | " + job;
    }
    headTitle.textContent = headTitleContents + dateString + job;
}

function openLinksInNewWindow() {
    let aElements = document.getElementsByTagName("a");
    for (let i = 0; i < aElements.length; i++) {
        aElements[i].target = "_blank";
    }
}

function addOptions(selected = "") {
    let options = document.createElement('div');
    options.id = "dropdown";
    options.innerHTML = "Select New Job Profile:<br/>";
    let flexBox = document.createElement('div');
    flexBox.id = "flexBox";
    for (let i=0; i<Object.keys(data).length; i++) {
        let newProfile = data[Object.keys(data)[i]]
        let newLink = document.createElement("a");
        newLink.id = Object.keys(data)[i];
        newLink.title = newProfile["title"];
        newLink.textContent = newLink.id;
        newLink.onclick = function() {
            loadNewJob(newLink.id);
        }
        flexBox.appendChild(newLink);
    }
    options.appendChild(flexBox);
    jobTitle.appendChild(options);
    if (selected) {
        selectedTag = document.getElementById(selected);
        selectedTag.classList.add("selected");
    }
}

//main function for loading new content
function loadNewJob(jobcode) {

    //before updating content, save the role to a query string
    saveRoleToQueryString(jobcode);

    //update job title
    jobTitle.textContent = data[jobcode]["title"] + " Profile";
    jobTitle.appendChild(document.createElement("br"));
    jobTitle.classList.add("selector");
    jobDesc.textContent = data[jobcode]["jobDesc"];
    // passing jobcode into this function sets that button as selected
    addOptions(jobcode);
    // while we're updating the title, we should change the <head> <title> as well
    setHeadTitle(data[jobcode]["title"]);


    //  update proficienies
    //delete old content
    while (proficiencies.firstChild) {
        proficiencies.removeChild(proficiencies.firstChild);
    }
    //add new content
    for (let i = 0; i < data[jobcode]['proficiencies'].length; i++) {
        let newProficiency = document.createElement("div");
        newProficiency.classList.add("row");
        let newTitle = document.createElement("h6");
        newTitle.innerHTML = data[jobcode]["proficiencies"][i]["title"];
        newProficiency.appendChild(newTitle);
        let newContent = document.createElement("p");
        newContent.innerHTML = data[jobcode]["proficiencies"][i]["content"];
        newProficiency.appendChild(newContent);
        proficiencies.appendChild(newProficiency);
    }

    //  update expertise
    //delete old content
    while (expertise.firstChild) {
        expertise.removeChild(expertise.firstChild);
    }
    //add new content
    for (let i = 0; i < data[jobcode]['expertise'].length; i++) {
        let newExpertise = document.createElement("li");
        newExpertise.textContent = data[jobcode]['expertise'][i];
        expertise.appendChild(newExpertise);
    }

    //  update experience
    //delete old content
    while (experience.firstChild) {
        experience.removeChild(experience.firstChild);
    }
    //add new content
    for (let i = 0; i < data[jobcode]['experience'].length; i++) {
        let newExperience = data[jobcode]['experience'][i]
        let newExperienceTitle = document.createElement("h6");
        newExperienceTitle.innerHTML = newExperience["company"] + "<br/>" +
            newExperience["role"] + "<br/>" + newExperience["date"];
        experience.appendChild(newExperienceTitle);

        let newExperienceDesc = document.createElement("p");
        newExperienceDesc.classList.add("experienceDesc");
        newExperienceDesc.textContent = newExperience["description"];
        experience.appendChild(newExperienceDesc);

        let keyAchievements = document.createElement("h6");
        keyAchievements.classList.add("keyAchievements");
        keyAchievements.textContent = "Key Achievements:";
        experience.appendChild(keyAchievements);
        let achievements = document.createElement("ul");
        for (let j = 0; j < newExperience['achievements'].length; j++) {
            let newAchievement = document.createElement("li");
            newAchievement.textContent = newExperience['achievements'][j];
            achievements.appendChild(newAchievement);
        }
        experience.appendChild(achievements);
    }

    //  update education, if it exists
    // delete old content
    while (education.firstChild) {
        education.removeChild(education.firstChild);
    }


    if (data[jobcode]['education'].length) {
        educationTitle.style.display = "inline";

        // add new content
        for (let i = 0; i < data[jobcode]['education'].length; i++) {
            let newEducation = data[jobcode]['education'][i]
            let newTitle = document.createElement("h6");
            newTitle.innerHTML = newEducation["name"] + "<br/>" + newEducation["date"];
            education.appendChild(newTitle);
            let newDescription = document.createElement("p");
            newDescription.textContent = newEducation["description"];
            education.appendChild(newDescription);
        }
    } else {
        //hide the education title if there's no content
        educationTitle.style.display = "none";
    }
    openLinksInNewWindow();
}

function saveRoleToQueryString(jobcode) {
    let newURL = new URL(window.location.href);
    newURL.search = '?role=' + jobcode;
    window.history.pushState({
        path: newURL.href
    }, '', newURL.href);
}

function getRoleFromQueryString() {
    var queryData = location.search;
    if (queryData) {
        try {
            queryData = queryData.substring(1, queryData.length).split("&");
            roleData = queryData[0].split("=")[1];
            loadNewJob(roleData);
            return true;
        } catch(err) {
            return false
        }
    }
    return false;
}

// INIT FUNCTION

//if there's a query string
if (getRoleFromQueryString()) {
    // options are already loaded with selected highlighted

//if there's no query string,
} else {
    // load the most recent position added
    loadNewJob(
        Object.keys(data)[
            Object.keys(data).length - 1
        ]
    );
}