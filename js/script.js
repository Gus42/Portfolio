//projects lists
var projectsList = [
	{
		"name": "This Portfolio",
		"img": "img/portfolio.png",
		"link": "http://gus42.github.io/Portfolio/",
		"date": "Febbraio 2016",
		"skills": ["HTML/CSS","JavaScript","Knockout.js","JQuery"],
		"description": "",
		"github": "https://github.com/Gus42/Portfolio"
	},
	{
		"name": "Linux Server Configuration",
		"img": "img/linux-server.png",
		"link": "",
		"date": "Dicembre 2015",
		"skills": ["Linux","Shell Commands"],
		"description": "",
		"github": "https://github.com/Gus42/Linux-Server-Configuration"
	},
	{
		"name": "Conference Organization App",
		"img": "img/conference.png",
		"link": "",
		"date": "Dicembre 2015",
		"skills": ["Python","Google App Engine"],
		"description": "",
		"github": "https://github.com/Gus42/Conference-Organization-App"
	},
	{
		"name": "Item Catalog",
		"img": "img/catalog.png",
		"link": "",
		"date": "Dicembre 2015",
		"skills": ["HTML/CSS","Python","Flask","SQL"],
		"description": "",
		"github": ""
	},
	{
		"name": "Tournament Results",
		"img": "img/tournament.png",
		"link": "",
		"date": "Novembre 2015",
		"skills": ["Python","SQL"],
		"description": "",
		"github": ""
	},
	{
		"name": "Percolation",
		"img": "img/percolation.png",
		"link": "",
		"date": "Ottobre 2015",
		"skills": ["Java"],
		"description": "",
		"github": "https://github.com/Gus42/Percolation"
	},
	{
		"name": "Jasmine",
		"img": "img/jasmine.png",
		"link": "",
		"date": "Ottobre 2015",
		"skills": ["TDD:Jasmine"],
		"description": "In this Project I used for the first time a framework for the test driven development of JavaScript",
		"github": ""
	},
	{
		"name": "Neighborhood Map",
		"img": "img/neighborhood-map.png",
		"link": "http://gus42.github.io/Neighborhood-Map/",
		"date": "Ottobre 2015",
		"skills": ["HTML/CSS","JavaScript","Knockout.js","Google Maps API","Foursquare API"],
		"description": "Neighborhood-Map is a single page application, it is the 5th project of Front-End Web Developer Nanodegree of Udacity."+
					   "It shows some parks in Nottingham city (UK), the user can search a park in the list or use the map to select it."+
					   "A selected park will show the nearest restaurants to it.",
		"github": "https://github.com/Gus42/Neighborhood-Map"
	},
	{
		"name": "Classic Arcade Game Clone",
		"img": "img/arcade.png",
		"link": "",
		"date": "Settembre 2015",
		"skills": ["HTML5:Canvas","JavaScript"],
		"description": "",
		"github": ""
	},
	{
		"name": "Basic Portfolio",
		"img": "img/udacity-portfolio.png",
		"link": "",
		"date": "Agosto 2015",
		"skills": ["HTML/CSS"],
		"description": "",
		"github": "https://github.com/Gus42/FEND-Portfolio"
	},
	{
		"name": "Cobweb",
		"img": "img/cobweb.png",
		"link": "",
		"date": "Luglio 2015",
		"skills": ["HTML5:Canvas","JavaScript"],
		"description": "",
		"github": "https://github.com/Gus42/cobweb-plugin"
	},
	{
		"name": "Facebook Reviews",
		"img": "img/reviews.png",
		"link": "",
		"date": "Luglio 2015",
		"skills": ["HTML/CSS","JavaScript","PHP","Facebook Graph API"],
		"description": "",
		"github": "https://github.com/Gus42/Review"
	},
	{
		"name": "Widescreen Slider",
		"img": "img/slider.png",
		"link": "",
		"date": "Giugno 2015",
		"skills": ["HTML/CSS","JavaScript","JQuery"],
		"description": "",
		"github": "https://github.com/Gus42/Slider"
	},
	{
		"name": "Bekeris",
		"img": "img/bekeris.png",
		"link": "",
		"date": "Giugno 2015",
		"skills": ["HTML/CSS","JavaScript","JQuery"],
		"description": "",
		"github": "https://github.com/Gus42/Bekeris"
	},
	{
		"name": "price4you",
		"img": "img/price4you.png",
		"link": "",
		"date": "Maggio 2015",
		"skills": ["HTML/CSS"],
		"description": "La pagina price4you nasce da un'esercitazione condotta durante un tirocinio in Lettonia."
						+"<br>- Scritto in HTML e CSS3."
						+"<br>- E' la fedele riproduzione in codice del design desiderato."
						+"<br>- Ho utilizzato Adobe Photoshop per riprodurre fedelmente colori e misure del sito.",
		"github": "https://github.com/Gus42/Price4you"
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

	// Set Height and Width for the .effect of App
	self.effect = function(data, event) {
		$(".effect").width($(event.currentTarget).width() + 20);
		$(".effect").height($(event.currentTarget).height() + 20);
	}

	// Open App
	appDetail = ko.observable(false);
	app = ko.observable();
	self.openApp = function() {
		app(this);
	}

	/*
	document.addEventListener("click", function(e) {
		console.log("Sto cliccando: "+ e.target);
	});

	//document.getElementsByTagName("html")[0].click(function() {
	document.getElementsByClassName("body")[0].click(function() {
		console.log("Hido la app");
		document.getElementsByClassName("app-complete").style.display = 'none';
	});

	document.getElementsByClassName("app-complete")[0].click(function(event) {
		console.log("fermo l'evento");
	    event.stopPropagation();
	});
	*/


	$("html").click(function() {
		if(app()!=null){
			if(appDetail()){
				appDetail(false);
				app(null);
				$(".opacity").css('opacity', '1');
			}else{
				appDetail(true);
				$(".opacity").css('opacity', '0.2');
			}
		}
	});

	$(".app-complete").click(function(event) {
		console.log("fermo l'evento");
	    event.stopPropagation();
	});

};

ko.applyBindings(new ViewModel());
