//This is the title for your window tab, and your Radar
document.title = "Kenzan Tech Radar";

//This is your raw data
//
// Key
//
// movement:
//   t = moved
//   c = stayed put
//
// blipSize: 
//  intValue; This is optional, if you omit this property, then your blip will be size 70.
//            This give you the ability to be able to indicate information by blip size too
//
// url:
// StringValue : This is optional, If you add it then your blips will be clickable to some URL
//
// pc: polar coordinates
//     r = distance away from origin ("radial coordinate")
//     - Each level is 100 points away from origin
//     t = angle of the point from origin ("angular coordinate")
//     - 0 degrees is due east
//
// Coarse-grained quadrants
// - Techniques: elements of a software development process, such as experience design; and ways of structuring software, such micro-services.
// - Tools: components, such as databases, software development tools, such as versions control systems; or more generic categories of tools, such as the notion of polyglot persistance.
// - Platforms: things that we build software on top of: mobile technologies like Android, virtual platforms like the JVM, or generic kinds of platforms like hybrid clouds
// - Programming Languages and Frameworks
//
// Rings:
// - Adopt: blips you should be using now; proven and mature for use
// - Trial: blips ready for use, but not as completely proven as those in the adopt ring; use on a trial basis, to decide whether they should be part of your toolkit
// - Assess: things that you should look at closely, but not necessarily trial yet - unless you think they would be a particularly good fit for you
// - Hold: things that are getting attention in the industry, but not ready for use; sometimes they are not mature enough yet, sometimes they are irredeemably flawed
//      Note: there's no "avoid" ring, but throw things in the hold ring that people shouldn't use.

var h = 800;
var w = 800;

var radar_data = [
    { "quadrant": "Techniques",
        "left" : 45,
        "top" : 18,
        "color" : "#8FA227",
        "items" : [ 
            { name: 'Git flow / Pull Requests ^', arc:'adopt', movement: 'c' },
            {"name":"Incremental data warehousing", arc:'trial',"movement":"c"},    
            {"name":"Events for messages - CQRS", arc:'adopt', "movement":"c"},
            {"name":"Measure Pipeline disruptions", arc:'trial', "movement":"c"}, 
            {"name":"Continuous Experimentation", arc:'access', "movement":"c"},
            { name: 'Reduce iRules dependence ^', arc:'access', movement: 'c' },
            {"name":"SaaS for non-core systems", arc:'trial', "movement":"c"},   
            {"name":"Pair Programming", arc:'hold', "movement":"c"}, 
            {"name":"iOS Accessibility", arc:'adopt', "movement":"c"},
            {"name":"Single Page App", "movement":"c", arc:'adopt', "url":"http://www.google.com"},
            {"name":"iOS Adaptivity", arc:'trial', "movement":"c"},   
            {"name":"Build Pipelines", arc:'adopt', "movement":"c"},   
            {"name":"Data Informed Decion Making", arc:'hold', "movement":"c"},
            {"name":"Polygot Programming", arc:'access', "movement":"c"},
            { name: 'internal load balancing off F5^', arc:'trial', movement: 'c' },
            {"name":"Isolated dev envs", arc:'adopt', "movement":"c"},  
            {"name":"Edge Services", arc:'trial', "movement":"c"}, 
            {"name":"Clean Code", arc:'hold', "movement":"c"},
            {"name":"Wide and Thin Front-Ends", arc:'hold', "movement":"c"},
            {"name":"Zookeeper for App Config", arc:'access', "movement":"c"}, 
            {"name":"Property based testing", arc:'access', "movement":"c"},
            {"name":"Evolutionary architecture", arc:'trial', "movement":"c"},
            {"name":"Code Reviews", arc:'adopt', "movement":"c"},
            {"name":"Valuable, cheap tests", arc:'hold', "movement":"c"},
            {"name":"Sacrificial Architecture", arc:'access', "movement":"c"},   
            {"name":"Sensible defaults", arc:'trial', "movement":"c"},   
            {"name":"Dependency Injection", arc:'trial', "movement":"c"},   
            {"name":"Coding architects", arc:'adopt', "movement":"c"}
        ]
    },
    { "quadrant": "Tools",
        "left": w-200+30,
        "top" : 18,
        "color" : "#587486",
        "items" : [ 
            { name: 'Git flow / Pull Requests ^', arc:'adopt', movement: 'c' },
            {"name":"Incremental data warehousing", arc:'trial',"movement":"c"},    
            {"name":"Events for messages - CQRS", arc:'adopt', "movement":"c"},
            {"name":"Measure Pipeline disruptions", arc:'trial', "movement":"c"}, 
            {"name":"Continuous Experimentation", arc:'access', "movement":"c"},
            { name: 'Reduce iRules dependence ^', arc:'access', movement: 'c' },
            {"name":"SaaS for non-core systems", arc:'trial', "movement":"c"},   
            {"name":"Pair Programming", arc:'hold', "movement":"c"}, 
            {"name":"iOS Accessibility", arc:'adopt', "movement":"c"},
            {"name":"Single Page App", "movement":"c", arc:'adopt', "url":"http://www.google.com"},
            {"name":"iOS Adaptivity", arc:'trial', "movement":"c"},   
            {"name":"Build Pipelines", arc:'adopt', "movement":"c"},   
            {"name":"Data Informed Decion Making", arc:'hold', "movement":"c"},
            {"name":"Polygot Programming", arc:'access', "movement":"c"},
            { name: 'internal load balancing off F5^', arc:'trial', movement: 'c' },
            {"name":"Isolated dev envs", arc:'adopt', "movement":"c"},  
            {"name":"Edge Services", arc:'trial', "movement":"c"}, 
            {"name":"Clean Code", arc:'hold', "movement":"c"},
            {"name":"Wide and Thin Front-Ends", arc:'hold', "movement":"c"},
            {"name":"Zookeeper for App Config", arc:'access', "movement":"c"}, 
            {"name":"Property based testing", arc:'access', "movement":"c"},
            {"name":"Evolutionary architecture", arc:'trial', "movement":"c"},
            {"name":"Code Reviews", arc:'adopt', "movement":"c"},
            {"name":"Valuable, cheap tests", arc:'hold', "movement":"c"},
            {"name":"Sacrificial Architecture", arc:'access', "movement":"c"},   
            {"name":"Sensible defaults", arc:'trial', "movement":"c"},   
            {"name":"Dependency Injection", arc:'trial', "movement":"c"},   
            {"name":"Coding architects", arc:'adopt', "movement":"c"}
  ]
    },
    { "quadrant": "Platforms",
        "left" :45,
         "top" : (h/2 + 18),
        "color" : "#DC6F1D",
        "items" : [
            { name: 'Git flow / Pull Requests ^', arc:'adopt', movement: 'c' },
            {"name":"Incremental data warehousing", arc:'trial',"movement":"c"},    
            {"name":"Events for messages - CQRS", arc:'adopt', "movement":"c"},
            {"name":"Measure Pipeline disruptions", arc:'trial', "movement":"c"}, 
            {"name":"Continuous Experimentation", arc:'access', "movement":"c"},
            { name: 'Reduce iRules dependence ^', arc:'access', movement: 'c' },
            {"name":"SaaS for non-core systems", arc:'trial', "movement":"c"},   
            {"name":"Pair Programming", arc:'hold', "movement":"c"}, 
            {"name":"iOS Accessibility", arc:'adopt', "movement":"c"},
            {"name":"Single Page App", "movement":"c", arc:'adopt', "url":"http://www.google.com"},
            {"name":"iOS Adaptivity", arc:'trial', "movement":"c"},   
            {"name":"Build Pipelines", arc:'adopt', "movement":"c"},   
            {"name":"Data Informed Decion Making", arc:'hold', "movement":"c"},
            {"name":"Polygot Programming", arc:'access', "movement":"c"},
            { name: 'internal load balancing off F5^', arc:'trial', movement: 'c' },
            {"name":"Isolated dev envs", arc:'adopt', "movement":"c"},  
            {"name":"Edge Services", arc:'trial', "movement":"c"}, 
            {"name":"Clean Code", arc:'hold', "movement":"c"},
            {"name":"Wide and Thin Front-Ends", arc:'hold', "movement":"c"},
            {"name":"Zookeeper for App Config", arc:'access', "movement":"c"}, 
            {"name":"Property based testing", arc:'access', "movement":"c"},
            {"name":"Evolutionary architecture", arc:'trial', "movement":"c"},
            {"name":"Code Reviews", arc:'adopt', "movement":"c"},
            {"name":"Valuable, cheap tests", arc:'hold', "movement":"c"},
            {"name":"Sacrificial Architecture", arc:'access', "movement":"c"},   
            {"name":"Sensible defaults", arc:'trial', "movement":"c"},   
            {"name":"Dependency Injection", arc:'trial', "movement":"c"},   
            {"name":"Coding architects", arc:'adopt', "movement":"c"}
        ]
    },
    { "quadrant": "Languages & Frameworks",
        "color" : "#B70062",
        "left"  : (w-200+30),
        "top" :   (h/2 + 18),
        "items" : [ 
            { name: 'Git flow / Pull Requests ^', arc:'adopt', movement: 'c' },
            {"name":"Incremental data warehousing", arc:'trial',"movement":"c"},    
            {"name":"Events for messages - CQRS", arc:'adopt', "movement":"c"},
            {"name":"Measure Pipeline disruptions", arc:'trial', "movement":"c"}, 
            {"name":"Continuous Experimentation", arc:'access', "movement":"c"},
            { name: 'Reduce iRules dependence ^', arc:'access', movement: 'c' },
            {"name":"SaaS for non-core systems", arc:'trial', "movement":"c"},   
            {"name":"Pair Programming", arc:'hold', "movement":"c"}, 
            {"name":"iOS Accessibility", arc:'adopt', "movement":"c"},
            {"name":"Single Page App", "movement":"c", arc:'adopt', "url":"http://www.google.com"},
            {"name":"iOS Adaptivity", arc:'trial', "movement":"c"},   
            {"name":"Build Pipelines", arc:'adopt', "movement":"c"},   
            {"name":"Data Informed Decion Making", arc:'hold', "movement":"c"},
            {"name":"Polygot Programming", arc:'access', "movement":"c"},
            { name: 'internal load balancing off F5^', arc:'trial', movement: 'c' },
            {"name":"Isolated dev envs", arc:'adopt', "movement":"c"},  
            {"name":"Edge Services", arc:'trial', "movement":"c"}, 
            {"name":"Clean Code", arc:'hold', "movement":"c"},
            {"name":"Wide and Thin Front-Ends", arc:'hold', "movement":"c"},
            {"name":"Zookeeper for App Config", arc:'access', "movement":"c"}, 
            {"name":"Property based testing", arc:'access', "movement":"c"},
            {"name":"Evolutionary architecture", arc:'trial', "movement":"c"},
            {"name":"Code Reviews", arc:'adopt', "movement":"c"},
            {"name":"Valuable, cheap tests", arc:'hold', "movement":"c"},
            {"name":"Sacrificial Architecture", arc:'access', "movement":"c"},   
            {"name":"Sensible defaults", arc:'trial', "movement":"c"},   
            {"name":"Dependency Injection", arc:'trial', "movement":"c"},   
            {"name":"Coding architects", arc:'adopt', "movement":"c"}
        ]
    }
];
