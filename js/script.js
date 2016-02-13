//projects lists
var projectsList = [
	{
		"name": "This Portfolio",
		"img": "img/k.jpg",
		"link": "http://gus42.github.io/Portfolio/",
		"date": "02/2016",
		"skills": ["HTML","CSS","JavaScript","Knockout.js","MVC"],
		"description": "",
		"github": "https://github.com/Gus42/Portfolio"
	},
	{
		"name": "Linux Server Configuration",
		"img": "img/k.jpg",
		"link": "",
		"date": "30/12/2015",
		"skills": ["Linux","Vagrant","Shell Commands"],
		"description": "",
		"github": "https://github.com/Gus42/Linux-Server-Configuration"
	},
	{
		"name": "Conference Organization App",
		"img": "img/k.jpg",
		"link": "",
		"date": "31/12/2015",
		"skills": ["Python","Google App Engine"],
		"description": "",
		"github": "https://github.com/Gus42/Conference-Organization-App"
	},
	{
		"name": "Item Catalog",
		"img": "img/k.jpg",
		"link": "",
		"date": "",
		"skills": ["HTML","CSS","Python","Flask","SQL"],
		"description": "",
		"github": ""
	},
	{
		"name": "Tournament Results",
		"img": "img/k.jpg",
		"link": "",
		"date": "",
		"skills": ["Python","SQL"],
		"description": "",
		"github": ""
	},
	{
		"name": "Movie Trailer",
		"img": "img/k.jpg",
		"link": "",
		"date": "",
		"skills": ["Python"],
		"description": "",
		"github": ""
	},
	{
		"name": "Percolation",
		"img": "img/k.jpg",
		"link": "",
		"date": "13/10/2015",
		"skills": ["Java"],
		"description": "",
		"github": "https://github.com/Gus42/Percolation"
	},
	{
		"name": "Jasmine",
		"img": "img/k.jpg",
		"link": "",
		"date": "",
		"skills": ["Jasmine"],
		"description": "",
		"github": ""
	},
	{
		"name": "Neighborhood Map",
		"img": "img/k.jpg",
		"link": "http://gus42.github.io/Neighborhood-Map/",
		"date": "06/10/2015",
		"skills": ["HTML","CSS","JavaScript","MVC","Knockout.js","Google Maps API","Foursquare API"],
		"description": "Neighborhood-Map is a single page application, it is the 5th project of Front-End Web Developer Nanodegree of Udacity."+
					   "It shows some parks in Nottingham city (UK), the user can search a park in the list or use the map to select it."+
					   "A selected park will show the nearest restaurants to it.",
		"github": "https://github.com/Gus42/Neighborhood-Map"
	}
];

function arrayUnique(array) {
    var a = array.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
}

function commonElementInArrays(a,b) {
	for(var i=0;i<a.length;i++) {
		for(var j=0;j<b.length;j++) {
			if(a[i]==b[j].skill){
				if(b[j].check()==true)
					return true;
			}
		}
	}
	return false;
}

var ViewModel = function() {
	var self = this;

	// SKILLS
	var skills = [];
	function skillsArray(){
		for(var i=0;i<projectsList.length;i++) {
			skills = skills.concat(projectsList[i].skills);
		}
		return arrayUnique(skills);
	}
	skills = skillsArray();

	for(var i=0;i<skills.length;i++)
		skills[i] = {"skill": skills[i], "check": ko.observable(true)};

	self.skills = skills;



	// Projects visible
	self.projectsVisible = ko.computed( function() {
		projects = [];
		projectsList.forEach(function(project) {
			if (commonElementInArrays(project.skills,self.skills)) {
				projects.push(project);
			}
		});
		return projects;
	});

	// Open App
	appDetail = ko.observable(false);

	self.openApp = function(app) {
		console.log(this);
	}

	// TOGGLE FILTERS
	filtersVisible = ko.observable(false);
	self.toggleFilters = function() {
		filtersVisible(!filtersVisible());
	}

	self.toggleAllFilters = function() {
		self.skills.forEach(function(skill) {
			skill.check(!skill.check());
		});
	}

	self.unselectedAllFilters = function() {
		self.skills.forEach(function(skill) {
			skill.check(false);
		});
	}

};

ko.applyBindings(new ViewModel());
