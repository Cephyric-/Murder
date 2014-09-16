var items = {
	'knife': {
		'name': 'Knives',
		'base': 9.0,
		'kps': 0.1,
		'total': 0,
		'price': 0,
		'mult': [ 0, 1 ],
		'count': 0
	},
	'murderer': {
		'name': 'Murderers',
		'base': 57.0,
		'kps': 0.3,
		'total': 0,
		'price': 0,
		'mult': [ 0, 1 ],
		'count': 0
	},
	'vigilante': {
		'name': 'Vigilante Cops',
		'base': 492.0,
		'kps': 1.3,
		'total': 0,
		'price': 0,
		'mult': [ 0, 1 ],
		'count': 0
	},
	'sharpshooter': {
		'name': 'Sharpshooters',
		'base': 4508.0,
		'kps': 9,
		'total': 0,
		'price': 0,
		'mult': [ 0, 1 ],
		'count': 0
	},
	'atv': {
		'name': 'Gun-Mounted ATVs',
		'base': 45330.0,
		'kps': 68.1,
		'total': 0,
		'price': 0,
		'mult': [ 0, 1 ],
		'count': 0
	},
	'robot': {
		'name': 'Sentient Robots',
		'base': 498914.0,
		'kps': 623.7,
		'total': 0,
		'price': 0,
		'mult': [ 0, 1 ],
		'count': 0
	},
	'superhero': {
		'name': 'Brainwashed Superheroes',
		'base': 5987478.0,
		'kps': 5987.5,
		'total': 0,
		'price': 0,
		'mult': [ 0, 1 ],
		'count': 0
	}
}

var upgrades = {
	'knife': {
		'Box Cutter': {
			'id': 1,
			'desc': 'You equip a blade obtained from a warehouse worker',
			'amount': 10,
			'cost': 100,
			'mult': [ 0.1, 0 ],
			'get': false,
			'disp': false
		},
		'Switch Blade': {
			'id': 2,
			'desc': 'You equip a blade obtained from a wannabe gangster',
			'amount': 25,
			'cost': 1000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Combat Pocket-Blade': {
			'id': 3,
			'desc': 'You equip a blade obtained from a house you were raiding for food',
			'amount': 50,
			'cost': 10000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Combat Knife': {
			'id': 4,
			'desc': 'You equip a blade obtained from an ex-army corporal tries to stop you killing his wife',
			'amount': 75,
			'cost': 100000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Fantasy Blade': {
			'id': 5,
			'desc': 'You equip a blade obtained from an obsessed anime fan trying to be a hero',
			'amount': 100,
			'cost': 1000000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		}
	},
	'murderer': {
		'Jack The Ripper': {
			'id': 1,
			'desc': 'Jack the Ripper has been found and set to work terrorizing women once again',
			'amount': 10,
			'cost': 100,
			'mult': [ 0.1, 0 ],
			'get': false,
			'disp': false
		},
		'Kim Jong Un': {
			'id': 2,
			'desc': 'After hearing about the cause Kim Jong Un is allowing use of his Korean military',
			'amount': 25,
			'cost': 1000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Al Capone': {
			'id': 3,
			'desc': 'Al Capone donates his gangster drones to help the murderous cause',
			'amount': 50,
			'cost': 10000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Bonnie and Clyde': {
			'id': 4,
			'desc': 'Bonnie &amp; Clyde have been revived through breakthroughs in medical science and now work for you',
			'amount': 75,
			'cost': 100000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Seung-Hui Cho': {
			'id': 5,
			'desc': 'Seung-Hui Cho has been hired to terrorize schools once again',
			'amount': 100,
			'cost': 1000000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		}
	},
	'vigilante': {
		'Elizabeth Bathory': {
			'id': 1,
			'desc': 'Elizabeth Bathory has been freed from her prison and is torturing girls again',
			'amount': 10,
			'cost': 100,
			'mult': [ 0.4, 0 ],
			'get': false,
			'disp': false
		},
		'Talat Pasha': {
			'id': 2,
			'desc': 'Talat Pasha has sent word to the Ottomans to continue killing Armenians',
			'amount': 25,
			'cost': 1000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Josef Mengele': {
			'id': 3,
			'desc': 'The Angel of Death has set up shop experimenting on twins once again',
			'amount': 50,
			'cost': 10000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Reinhard Heydrich': {
			'id': 4,
			'desc': 'Reinhad Heydrich commanded the German army to invade Poland',
			'amount': 75,
			'cost': 100000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Osama Bin Laden': {
			'id': 5,
			'desc': 'Osama Bin Laden has told the Al-Qaeda to bomb all their enemies',
			'amount': 100,
			'cost': 1000000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		}
	},
	'sharpshooter': {
		'Rob Furlong': {
			'id': 1,
			'desc': 'Rob Furlong has been contracted to gun down anyone they see',
			'amount': 10,
			'cost': 100,
			'mult': [ 2.7, 0 ],
			'get': false,
			'disp': false
		},
		'Simo Hayha': {
			'id': 2,
			'desc': 'Simo Hayha has been contracted to gun down anyone they see',
			'amount': 25,
			'cost': 1000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Chris Kyle': {
			'id': 3,
			'desc': 'Chris Kyle has been contracted to gun down anyone they see',
			'amount': 50,
			'cost': 10000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Lee Harvey Oswald': {
			'id': 4,
			'desc': 'Lee Harvey Oswald has been contracted to gun down anyone they see',
			'amount': 75,
			'cost': 100000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Zhang Taofang': {
			'id': 5,
			'desc': 'Zhang Taofang has been contracted to gun down anyone they see',
			'amount': 100,
			'cost': 1000000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		}
	},
	'atv': {
		'Three Wheelers': {
			'id': 1,
			'desc': 'An army of Three Wheeler ATVs have been send to mow down anyone in the way',
			'amount': 10,
			'cost': 100,
			'mult': [ 19.6, 0 ],
			'get': false,
			'disp': false
		},
		'Four Wheelers': {
			'id': 2,
			'desc': 'An army of Four Wheeler ATVs have been send to mow down anyone in the way',
			'amount': 25,
			'cost': 1000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Six Wheelers': {
			'id': 3,
			'desc': 'An army of Six Wheeler ATVs have been send to mow down anyone in the way',
			'amount': 50,
			'cost': 10000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Sand Rails': {
			'id': 4,
			'desc': 'An army of Sand Rail ATVs have been send to mow down anyone in the way',
			'amount': 75,
			'cost': 100000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Dune Buggies': {
			'id': 5,
			'desc': 'An army of Dune Buggy ATVs have been send to mow down anyone in the way',
			'amount': 100,
			'cost': 1000000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		}
	},
	'robot': {
		'Cybermen': {
			'id': 1,
			'desc': 'The cyberiad has been re-activated and are wreaking havoc on the universe',
			'amount': 10,
			'cost': 100,
			'mult': [ 187.1, 0 ],
			'get': false,
			'disp': false
		},
		'Lore': {
			'id': 2,
			'desc': 'Lore has sent The Borg to assimilate the universe',
			'amount': 25,
			'cost': 1000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'ED-209': {
			'id': 3,
			'desc': 'ED-209 has been sent out vapourizing anyone without a hall pass',
			'amount': 50,
			'cost': 10000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Robocop': {
			'id': 4,
			'desc': 'Robocop has been reprogrammed and is murdering innocent civilians',
			'amount': 75,
			'cost': 100000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'T-800': {
			'id': 5,
			'desc': 'The Terminator has been sent back in time kill Sarah Connor (and anyone that gets in the way!)',
			'amount': 100,
			'cost': 1000000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		}
	},
	'superhero': {
		'Batman': {
			'id': 1,
			'desc': 'Batman has joined up with The Joker and is destroying Gotham',
			'amount': 10,
			'cost': 100,
			'mult': [ 598.8, 0 ],
			'get': false,
			'disp': false
		},
		'Spiderman': {
			'id': 2,
			'desc': 'Symbiote Spiderman is wreaking havoc on Manhatton',
			'amount': 25,
			'cost': 1000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Iron Man': {
			'id': 3,
			'desc': 'Jarvis has remote access to all the armours and is using them to ruin New York',
			'amount': 50,
			'cost': 10000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'The Hulk': {
			'id': 4,
			'desc': 'The Hulk has lost control and is roaming the US destroying everything in his path',
			'amount': 75,
			'cost': 100000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		},
		'Superman': {
			'id': 5,
			'desc': 'Superman has been influenced by Red Kryptonite and is flattening the planet',
			'amount': 100,
			'cost': 1000000,
			'mult': [ 0, 1 ],
			'get': false,
			'disp': false
		}
	}
}

var kills = {
	1: {
		'count': 42,
		'text': 'Mad Jack in World War II.'
	},
	2: {
		'count': 160,
		'text': 'Chris Kyle in the Iraq War.'
	},
	3: {
		'count': 505,
		'text': 'Simo H&auml;yh&auml; in the Winter War.'
	},
	4: {
		'count': 650,
		'text': 'girls killed by Elizabeth Bathory.'
	},
	5: {
		'count': 2600,
		'text': 'twins killed by the Angel of Death.'
	},
	6: {
		'count': 2996,
		'text': 'died in 9/11.'
	},
	7: {
		'count': 5000,
		'text': 'the chemical attack on the Kurdish village of Halabja authorized by Saddam Hussein.'
	},
	8: {
		'count': 40000,
		'text': 'People guillotined by Maximellien Robespierre.'
	},
	9: {
		'count': 60000,
		'text': 'Jews forced out of Germany by Reinhard Heydrich.'
	},
	10: {
		'count': 300000,
		'text': 'Japanese people killed in The Rape of Nanking under the rule of Emporer Hirohito.'
	},
	11: {
		'count': 400000,
		'text': 'Hungarian Jews deported and murdered by Adolf Eichmann.'
	},
	12: {
		'count': 999999,
		'text': 'the time in which Chell was asleep. You monster.'
	},
	13: {
		'count': 1000000,
		'text': 'the Cambodians killed in the country genocide ordered by Pol Pot.'
	},
	14: {
		'count': 1500000,
		'text': 'Armenians killed by the Ottoman Empire under the rule of Talat Pasha.'
	},
	15: {
		'count': 3000000,
		'text': 'people killed in the Korean War started by Kim Il Sung.'
	},
	16: {
		'count': 55500000,
		'text': 'the Germans in World War II. You are literally worse than Hitler.'
	},
	17: {
		'count': 60000000,
		'text': 'those killed by Genghis Khan and his army.'
	},
	18: {
		'count': 107602707791,
		'text': 'have ever been born on Earth.'
	}
}