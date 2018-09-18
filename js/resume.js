/*
The Idea: Make a dropdown menu of different jobs I'm applying for and have the
resume change depending on the job role.

Excpected Action: clicking on the job title displays a dropdown of different
job roles. Clicking on the role updates the resume text to highlight different
strengths, and hides the dropdown menu.

Data architecture: a 2-dimensional dictionary (a dict of dicts) that stores 
the data according to 1. the job role and 2. the part of the resume. 
some data is further separated out into deeper layers of lists and dictionaries
as is appropriate. Content may be defined ouside of the main data object to
avoid a POD.
*/

const teamTreehouse = {
    "name": "Team Treehouse - Online Training",
    "date": "(August/2015 – Present)",
    "description": "Continuing technology education in subjects ranging from Python and Javascript to HTML, CSS and SQL",
}

const brooksIP = {
    "name": "Brooks Institute of Photography - Ventura CA",
    "date": "(July/2006 – February/2008)",
    "description": "Completed Coursework in Visual Communications / Graphic Design",
}


const TPMProficiencies = [{
        "title": "Languages",
        "content": "Python (4y+), SQL (4y+), HTML (4y+), CSS (4y+), Javascript (4y+)",
    },
    {
        "title": "Tools",
        "content": "Git/Github, Trello, Slack, Heroku"
    },
    {
        "title": "Hardware",
        "content": "Mac/Windows/Linux Server Administration, Containerized Cloud Platforms (AWS, GCP, Heroku)",
    },
    {
        "title": "Methodologies",
        "content": "Agile, Lean, Microservice Architecture, SDLC",
    },
    /*
        {
        	"title": "",
        	"content", "",
        },
        */
]
const TPMExpertise = ["Adept at listening to and analyzing clients’ needs, and communicating with team members to deliver the best solution",
    "Consistently employs collaborative lean and agile methodologies to optimize workflows, provide top class customer service, and deliver breakthrough technologies and to ensure optimal performance on complex projects and technical initiatives",
    "Skilled in communicating consistently with clients, discussing their specific design goals, presenting unique solutions, and modifying as necessary until achievement of full client approval and consensus",
    "Outstanding interpersonal and communication soft skills leveraged to train users, troubleshoot system issues, and ensure total client satisfaction while directing multiple tasks effectively to ensure on target completion of all deliverables"
]
const TPMExperience = [{
        "company": "Treehouse Stickers | Portland, Oregon",
        "role": "Technical Co-founder / Product Manager",
        "date": "(August/2012 – February/2018)",
        "description": `Codified business processes into a centralized cloud-native Python application, a full cycle customer order management system based on UX feedback from customers and employees. Spearheaded UI design from scratch, 
    	building wireframes and functional prototypes. Conducted A/B beta user tests and implemented adjustments for optimal user experience. Built relationships with clients and production employees 
    	while monitoring the solutions delivered to respective clients.`,
        "achievements": ["Led the SEO initiatives to maximize the return on investment by developing and maintaining the company web properties, achieving the #1 organic search result for “Custom Stickers Portland” in a competitive environment",
            "Delivered top-class user experience for new internal users by providing timely responses with information about product updates and feature request progress, addressing customer issues in a professional manner",
            "Grew business operations from a $18,000 seed investment to six-figure annual revenue",
        ],
    },
    {
        "company": "Independent Engagement",
        "role": "Graphic, Video & Web Designer",
        "date": "(August/2009 – Present)",
        "description": `Worked in a remote environment and developed customized technical and media solutions for clients from multiple industries. Held concurrent responsibility for design tasks and interacting with clients, identifying their needs, 
		collecting relevant information about products, services and their users. Ensured compliance with approved standards to provide quality solutions.`,
        "achievements": ["Continued development on Treehouse Stickers platform as a contractor, providing training, maintenance and feature requests to employees of the acquiring company",
            "Produced a video series for Niantic Labs on a a 3-week cross-country tour under field conditions in under 24 hours each"
        ],
    }
]
const TPMEducation = [teamTreehouse,]

const UXRProficiencies = [{
        "title": "Languages",
        "content": "Python (4y+), HTML (4y+), CSS (4y+), Javascript (4y+)",
    },
    {
        "title": "Tools",
        "content": "InVision (1y+), Adobe Creative Suite (10y+)"
    },
    {
        "title": "Methodologies",
        "content": "Agile, Lean, Microservice Architecture, SDLC",
    },
]

const UXRExpertise = ["Adept at listening to and analyzing users' goals and needs, and communicating with team members to deliver the best solution",
    "Consistently employs collaborative lean and agile methodologies to optimize experience and deliver breakthrough technologies and to ensure optimal performance on complex projects and technical initiatives",
    "Skilled in communicating consistently with clients, discussing their specific design goals, presenting unique solutions, and modifying as necessary until achievement of full client approval and consensus",
]
const UXRExperience = [{
        "company": "Treehouse Stickers | Portland, Oregon",
        "role": "Technical Co-founder / UX Designer",
        "date": "(August/2012 – February/2018)",
        "description": `Codified business processes into a centralized cloud-native Python application, a full cycle customer order management system based on UX feedback from customers and employees. Spearheaded UI design from scratch, 
    	building wireframes and functional prototypes. Conducted A/B beta user tests and implemented adjustments for optimal user experience. Built relationships with clients and production employees 
    	while monitoring the solutions delivered to respective clients.`,
        "achievements": ["Led the SEO initiatives to maximize the return on investment by developing and maintaining the company web properties, achieving the #1 organic search result for “Custom Stickers Portland” in a competitive environment",
            "Delivered top-class user experience for new internal users by providing timely responses with information about product updates and feature request progress, addressing customer issues in a professional manner",
            "Grew business operations from a $18,000 seed investment to six-figure annual revenue, thanks to outstanding user experience",
        ],
    },
    {
        "company": "Independent Engagement",
        "role": "Graphic, Video & Web Designer",
        "date": "(August/2009 – Present)",
        "description": `Worked in a remote environment and developed customized technical and media solutions for clients from multiple industries. Held concurrent responsibility for design tasks and interacting with clients, identifying their needs, 
		collecting relevant information about products, services and their users. Ensured compliance with approved standards to provide quality solutions.`,
        "achievements": ["Continued development on Treehouse Stickers platform as a contractor, providing training, maintenance and feature requests to employees of the acquiring company",
            "Produced a video series for Niantic Labs on a a 3-week cross-country tour under field conditions in under 24 hours each"
        ],
    }
];

const CEProficiencies = [{
        "title": "Languages",
        "content": "Python (4y), Javascript (4y+), Java (1y+)",
    },
    {
    	"title": "Frameworks",
    	"content": "Flask (Python, 3y+), excited to learn new ones! ",
    },
    {
        "title": "Tools",
        "content": "Slack, Trello (scrum)"
    },
    {
    	"title": "Traits",
    	"content": "Self-motivated, Excels at independent learning, Thrives on a small, highly collaborative team, Able to manage multiple tasks and priorities, "
    },
    {
    	"title": "Passions",
    	"content": "Working on customer-facing issues, documenting and automating repeated tasks, synthesizing large amounts of data into a well-defined solution, making and deploying fixes to frontend and backend services in production"
    },
    {
    	"title": "Skills",
    	"content": "Juggling small tasks along with large projects, Communicating complex ideas accurately with technical and non-technical co-workers, Improving and useful new adding features, Supporting tools used by internal teams, Creating and documenting procedures for common tasks, Customer service and Collaboration, Written and verbal communication",
    },
    {
        "title": "Methodologies",
        "content": "Agile, Lean, Microservice Architecture, SDLC",
    },
]
const CEExpertise = TPMExpertise;
const CEExperience = TPMExperience;
const CEEducation = [teamTreehouse]


const test = "test";
const data = {
    "TPM": {
        "title": "Technical Product Manager",
        "jobDesc": "Tech-savvy, dynamic, and results-oriented professional with 9+ years enhancing client relationships and 4+ years developing innovative software solutions",
        "proficiencies": TPMProficiencies,
        "expertise": TPMExpertise,
        "experience": TPMExperience,
        "education": TPMEducation,
    },
    "UXR": {
        "title": "User Experience Researcher",
        "jobDesc": "Innovative, dynamic, and detail-oriented professional with 4+ years developing innovative user-centric design solutions",
        "proficiencies": UXRProficiencies,
        "expertise": UXRExpertise,
        "experience": UXRExperience,
        "education": [teamTreehouse,brooksIP],
    },
    "CE": {
        "title": "Customer Engineer",
        "jobDesc": "Tech-savvy, dynamic, and results-oriented professional with 9+ years enhancing customer experiences and 4+ years developing innovative software solutions",
        "proficiencies": CEProficiencies,
        "expertise": CEExpertise,
        "experience": CEExperience,
        "education": CEEducation,
    },
    "TEST": {
        "jobDesc": "Test description",
        "title": test,
        "proficiencies": [{
            "title": test,
            "content": test,
        }],
        "expertise": [test],
        "experience": [{
            "company": "test company",
            "role": "test role",
            "date": "(then - now)",
            "description": "Yeah, it was like that",
            "achievements": ["I did a bunch of stuff"],
        }],
        "education": [{
            "name": "Test School",
            "date": "(then - now)",
            "description": "School of hard knocks",
        }],

    }
}

const jobTitle = document.getElementById('jobTitle');
const proficiencies = document.getElementById('proficiencies');
const expertise = document.getElementById('expertise');
const experience = document.getElementById('experience');
const education = document.getElementById('education');

function addOptions(selected = "") {
    let options = document.createElement('div');
    options.innerHTML = `
            <div id="dropdown">
            	Select New Role:
                <a id="TPM" title="Technical Product Manager" onclick="loadNewJob('TPM')">TPM</a>
                <a id="UXR" title="User Experience Researcher" onclick="loadNewJob('UXR')">UXR</a>
                <a id="CE" title="Customer Engineer" onclick="loadNewJob('CE')">CE</a>
            </div>
            `;
    jobTitle.appendChild(options);
    if (selected) {
        selectedTag = document.getElementById(selected);
        selectedTag.classList.add("selected");
    }
}

function loadNewJob(jobcode) {
    //main function for loading new content

    //before updating content, save the role to a query string
    saveRoleToQueryString(jobcode);

    //update job title
    jobTitle.textContent = data[jobcode]["title"] + " Profile";
    jobTitle.classList.add("selector");
    // passing jobcode into this function sets that button as selected
    addOptions(jobcode);

    //	update proficienies
    //delete old content
    while (proficiencies.firstChild) {
        proficiencies.removeChild(proficiencies.firstChild);
    }
    //add new content
    for (let i = 0; i < data[jobcode]['proficiencies'].length; i++) {
        let newProficiency = document.createElement("div");
        newProficiency.classList.add("row");
        let newTitle = document.createElement("h6");
        newTitle.textContent = data[jobcode]["proficiencies"][i]["title"];
        newProficiency.appendChild(newTitle);
        let newContent = document.createElement("p");
        newContent.textContent = data[jobcode]["proficiencies"][i]["content"];
        newProficiency.appendChild(newContent);
        proficiencies.appendChild(newProficiency);
    }

    // 	update expertise
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

    //	update experience
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

    //	update education, if it exists
    while (education.firstChild) {
        education.removeChild(education.firstChild);
    }


    if (data[jobcode]['education'].length) {
        educationTitle.style.display = "inline";
        // delete old content

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
        educationTitle.style.display = "none";
    }
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
        queryData = queryData.substring(1, queryData.length).split("&");
        roleData = queryData[0].split("=")[1];
        loadNewJob(roleData);
        return true;
    }
    return false;
}

if (getRoleFromQueryString()) {
    //if there's a query string
    // options are already loaded with selected highlighted
} else {
    //if there's no query string
    // add options with nothing selected
    addOptions();
}