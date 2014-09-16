function addCommas( int ) { return int.toString().replace( /\B(?=(\d{3})+(?!\d))/g, "," ) }

var Killer = new Object();

// Initialization variables
Killer.version = "0.1.1";
Killer.clicks = 0;
Killer.kills = 0;
Killer.allTimeKills = 0;
Killer.killsPS = 0;
Killer.killsPC = 1;
Killer.level = 1;
Killer.xp = 0;
Killer.items = 0;
Killer.lastTime = new Date();
Killer.lastMessage = 1;
Killer.knifeProgression = 0;

Killer.SaveGame = function( a ) {
	// Converts all important variable information into a base64 string seperated with 
	// special characters that will later be used to split the string in the load function
	
	var save = '';
	
	// Base settings
	save += $.base64.btoa( Killer.version ) + ';';
	save += $.base64.btoa( Killer.clicks ) + ';';
	save += $.base64.btoa( ( Killer.kills ).toFixed( 1 ) ) + ';';
	save += $.base64.btoa( ( Killer.allTimeKills ).toFixed( 1 ) ) + ';';
	save += $.base64.btoa( ( Killer.killsPS ).toFixed( 1 ) ) + ';';
	save += $.base64.btoa( ( Killer.killsPC ).toFixed( 1 ) ) + ';';
	save += $.base64.btoa( Killer.level ) + ';';
	save += $.base64.btoa( ( Killer.xp ).toFixed( 1 ) ) + ';';
	save += $.base64.btoa( Killer.items ) + ';';
	save += $.base64.btoa( Killer.lastMessage ) + ';';
	save += $.base64.btoa( Killer.knifeProgression );
	save += '|';
	
	// Items
	$.each( items, function( k, v ) {
		save += $.base64.btoa( k ) + ';';
		save += $.base64.btoa( parseFloat( ( v.price ).toFixed( 1 ) ) ) + ';';
		save += $.base64.btoa( parseInt( v.mult[ 0 ] ) ) + ';';
		save += $.base64.btoa( parseInt( v.mult[ 1 ] ) ) + ';';
		save += $.base64.btoa( parseInt( v.count ) );
		
		save += '#';
	} );
	save = save.substr( 0, save.length - 1 ) + '|';
	
	// Upgrades
	$.each( upgrades, function( k, v ) {
		save += $.base64.btoa( k ) + '&';
		$.each( v, function( k, v ) {
			save += $.base64.btoa( k ) + '$';
			save += $.base64.btoa( v.get ) + ';';
			save += $.base64.btoa( v.disp ) + ';';
			
			save = save.substr( 0, save.length - 1 ) + '@';
		} );
		
		save = save.substr( 0, save.length - 1 ) + '#';
	} );
	save = save.substr( 0, save.length - 1 );
	
	// Determines whether we are saving or exporting the save
	if( a ) { // Saving to browser local storage
		localStorage[ 'save' ] = save;
		
		// Run Notification
		Killer.Notification( 'Game Saved' );
	} else { // Exporting the save to be displayed in main menu
		if( $( '#load-wrapper' ).css( 'display' ) == 'block' ) $( '#load-wrapper' ).css( 'display', 'none' );
		$( '#export-str' ).html( save );
		$( '#export-game' ).css( 'display', 'block' );
		
		// Run Notification
		Killer.Notification( 'Game Exported' );
	}
}

Killer.LoadGame = function( a ) {
	// Taking the base64 string previously made in the save game function and
	// splitting it apart in order to update the game variables to where they were
	// when the save game state was taken
	
	if( !a ) return;
	
	var str = a.split( '|', 3 ); // Split base64 string apart into the 3 main sections
	var base = str[ 0 ].split( ';' );
	
	if( $.base64.atob( base[ 0 ] ) != Killer.version ) {
		Killer.Notification( 'Your save game in not compatible with this version &amp; cannot be loaded' );
		return;
	}
	
	// Init stats
	Killer.clicks = parseInt( $.base64.atob( base[ 1 ] ) );
	Killer.kills = parseFloat( $.base64.atob( base[ 2 ] ) );
	Killer.allTimeKills = parseFloat( $.base64.atob( base[ 3 ] ) );
	Killer.killsPS = parseFloat( $.base64.atob( base[ 4 ] ) );
	Killer.killsPC = parseInt( $.base64.atob( base[ 5 ] ) );
	Killer.level = parseInt( $.base64.atob( base[ 6 ] ) );
	Killer.xp = parseFloat( $.base64.atob( base[ 7 ] ) );
	Killer.items = parseInt( $.base64.atob( base[ 8 ] ) );
	Killer.lastMessage = parseInt( $.base64.atob( base[ 9 ] ) );
	Killer.knifeProgression = parseInt( $.base64.atob( base[ 10 ] ) );
	
	// Items JSON object
	var itemS = new Array;
	var q = str[ 1 ].split( '#' );
	for( var w = 0; w < q.length; w++ ) itemS.push( q[ w ].split( ';' ) );
	
	$.each( itemS, function( k, v ) {
		var itemname = $.base64.atob( v[ 0 ] );
		items[ itemname ].price = parseFloat( $.base64.atob( v[ 1 ] ) ); // EX: items[ 'knife' ].price
		items[ itemname ].mult[ 0 ] = parseInt( $.base64.atob( v[ 2 ] ) ); // EX: items[ 'knife' ].mult[ 0 ]
		items[ itemname ].mult[ 1 ] = parseInt( $.base64.atob( v[ 3 ] ) ); // EX: items[ 'knife' ].mult[ 1 ]
		items[ itemname ].count = parseInt( $.base64.atob( v[ 4 ] ) ); // EX: items[ 'knife' ].count
	} );
	
	// Upgrades JSON object
	var types = str[ 2 ].split( '#' );
	
	$.each( types, function( k, v ) {
		var name = v.split( '&' );
		var mainname = $.base64.atob( name[ 0 ] );
		var allupgrades = name[ 1 ].split( '@' );
		
		$.each( allupgrades, function( k, v ) {
			var upgradesequence = v.split( '$' );
			var upgradenumber = $.base64.atob( upgradesequence[ 0 ] );
			var upgradeparts = upgradesequence[ 1 ].split( ';' );
			
			$.base64.atob( upgradeparts[ 0 ] ) == 'true' ? upgrades[ mainname ][ upgradenumber ].get = true : upgrades[ mainname ][ upgradenumber ].get = false; // EX: upgrades[ 'knife' ][ 1 ].get
			$.base64.atob( upgradeparts[ 1 ] ) == 'true' ? upgrades[ mainname ][ upgradenumber ].disp = true : upgrades[ mainname ][ upgradenumber ].disp = false; // EX: upgrades[ 'knife' ][ 1 ].disp
		} );
	} );
	
	// Update HTML elements appropriately
	$( '#the-knife' ).attr( 'src', 'assets/img/knife-' + Killer.knifeProgression + '.png' );
	$( '#stats-clicks' ).html( 'Total Clicks: ' + Killer.clicks );
	$( '#stats-kills' ).html( 'Kills: ' + ( Killer.kills ).toFixed( 1 ) );
	$( '#stats-kills-ps' ).html( 'Kills Per Second: ' + ( Killer.killsPS  ).toFixed( 1 ));
	$( '#stats-kills-pc' ).html( 'Kills Per Click: ' + ( Killer.killsPC ).toFixed( 1 ) );
	$( '#level' ).html( 'Level ' + Killer.level );
	$( '#exp-bar' ).css( 'background', '-webkit-gradient( linear, left top, right top, color-stop( ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #c5a870 ), color-stop( ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 ), color-stop( 100%, #f0d5a2 ) )' );
	$( '#exp-bar' ).css( 'background', '-moz-linear-gradient( left, #c5a870 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 100% )' );
	$( '#exp-bar' ).css( 'background', '-o-linear-gradient( left, #c5a870 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 100% )' );
	$( '#exp-bar' ).css( 'background', '-ms-linear-gradient( left, #c5a870 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 100% )' );
	$( '#exp-bar' ).css( 'background', 'linear-gradient( to right, #c5a870 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 100% )' );
	$( '#stats-items' ).html( 'Total Items: ' + Killer.items );
	Killer.lastMessage == 1 && Killer.allTimeKills < kills[ Killer.lastMessage ].count ? $( '#kill.message' ).html( 'Your kills are not noteworthy enough yet!' ) : $( '#kill-message' ).html( 'You have killed more people than ' + kills[ Killer.lastMessage ].text );
	$( '#stats-total-kills' ).html( 'All Time Kills: ' + ( Killer.allTimeKills ).toFixed( 1 ) );
	$( '#current-kills' ).html( ( Killer.kills ).toFixed( 1 ) + ' Kills' );
	$( '#current-kills-ps' ).html( ( Killer.killsPS ).toFixed( 1 ) + ' Kills Per Second' );
	
	$.each( items, function( k, v ) {
		$( '#count-' + k ).html( addCommas( v.count ) );
		$( '#num-' + k ).html( 'Cost: ' + addCommas( v.price ) );
	} );
	
	// Empty any existing upgrades that are displayed and show the ones identified in the save state
	$( '#upgrade-container' ).empty();
	$.each( upgrades, function( k, v ) {
		var x = k;
		$.each( v, function( k, v ) {
			if( v.get == false && v.disp == true ) {
				$( '#upgrade-container' ).append( ' \
					<section class="upgrade-wrapper" id="' + ( k ).toLowerCase().replace( / /g, '_' ) + '"> \
						<img src="assets/img/upgrades/' + x + '' + v.id + '.png" /> \
					</section> \
				' );
				$( '#' + ( k ).toLowerCase().replace( / /g, '_' ) ).on( 'click', function() { Killer.PurchaseUpgrade( x, k ) } );
				$( '#' + ( k ).toLowerCase().replace( / /g, '_' ) ).on( 'mouseenter', function() {
					if( $( '.popup-title-right' ).html() != k ) {
						$( '.popup-title-right' ).html( k );
						$( '.popup-image-right' ).attr( 'src', 'assets/img/upgrades/' + x + '' + v.id + '.png' );
						v.mult[ 0 ] == 0 ? $( '.popup-text-right' ).html( 'Multiply the amount gained from this item category by ' + ( v.mult[ 1 ] + 1 ) ) : $( '.popup-text-right' ).html( 'Increase the base amount gained from this item category by ' + v.mult[ 0 ] );
						$( '.popup-cost-right' ).html( addCommas( v.cost ) );
					}
					$( '#popup' ).css( 'display', 'block' );
				} );
				$( '#' + ( k ).toLowerCase().replace( / /g, '_' ) ).on( 'mouseleave', function() { $( '#popup' ).css( 'display', 'none' ); } );				
				
				if( $( '#upgrade-container' ).html != '' ) $( '#upgrade-container' ).slideDown( 'slow' );
			}
		} );
	} );
	
	// Empty the load game input field and hide the load option
	$( '#load-game input[ type=text ]' ).val( '' );
	$( '#load-wrapper' ).css( 'display', 'none' );
	Killer.SwapMenu( 'statistics', 'menu' );
	
	// Run Notification
	Killer.Notification( 'Game Loaded' );
}

Killer.ResetGame = function() {
	// Resets all the key variables in the game to their default state and
	// updates all the DOM elements to show this
	
	// Base Stats
	Killer.clicks = 0;
	$( '#stats-clicks' ).html( 'Total Clicks: 0' );
	$( '#the-knife' ).attr( 'src', 'assets/img/knife-0.png' );
	Killer.kills = 0;
	$( '#stats-kills' ).html( 'Kills: 0.0' );
	$( '#current-kills' ).html( '0.0 Kills' );
	Killer.allTimeKills = 0;
	$( '#stats-total-kills' ).html( 'All Time Kills: 0.0' );
	Killer.killsPS = 0;
	$( '#stats-kills-ps' ).html( 'Kills Per Second: 0.0' );
	$( '#current-kills-ps' ).html( '0.0 Kills Per Second' );
	Killer.killsPC = 1;
	$( '#stats-kills-pc' ).html( 'Kills Per Click: 1.0' );
	Killer.level = 1;
	$( '#level' ).html( 'Level 1' );
	Killer.xp = 0;
	$( '#exp-bar' ).css( 'background', '-webkit-gradient( linear, left top, right top, color-stop( 0%, #c5a870 ), color-stop( 0%, #f0d5a2 ), color-stop( 100%, #f0d5a2 ) )' );
	$( '#exp-bar' ).css( 'background', '-moz-linear-gradient( left, #c5a870 0%, #f0d5a2 0%, #f0d5a2 100% )' );
	$( '#exp-bar' ).css( 'background', '-o-linear-gradient( left, #c5a870 0%, #f0d5a2 0%, #f0d5a2 100% )' );
	$( '#exp-bar' ).css( 'background', '-ms-linear-gradient( left, #c5a870 0%, #f0d5a2 0%, #f0d5a2 100% )' );
	$( '#exp-bar' ).css( 'background', 'linear-gradient( to right, #c5a870 0%, #f0d5a2 0%, #f0d5a2 100% )' );
	Killer.lastMessage = 1;
	$( '#kill-message' ).html( 'Your kills are not noteworthy enough yet!' );
	Killer.items = 0;
	$( '#stats-items' ).html( 'Total Items: 0' );
	
	// Items
	$.each( items, function( k, v ) {
		v.price = v.base;
		$( '#num-' + k ).html( 'Cost: ' + addCommas( v.base ) );
		v.mult[ 0 ] = 0;
		v.mult[ 1 ] = 1;
		v.count = 0;
		$( '#count-' + k ).html( '0' );
	} );
	
	// Upgrades
	$.each( upgrades, function( k, v ) {
		$.each( v, function( k, v ) {
			v.get = false;
			v.disp = false;
		} );
	} );
	
	// Remove any visible upgrades
	$( '#upgrade-container' ).slideUp( 'slow' );
	$( '#upgrade-container' ).empty();
	
	// Empties saved game data
	localStorage[ 'save' ] = '';
	
	// Resets menus to statistics
	Killer.SwapMenu( 'statistics', 'menu' );
	
	// Run Notification
	Killer.Notification( 'Game Reset' );
}

Killer.IncreaseItem = function( a ) {
	// Increases the counter for the item type given to it, recalculates the price for
	// the item and checks for + displays any upgrades that are unlocked
	
	if( items[ a ].price <= Killer.kills || ( items[ a ].count == 0 && items[ a ].base <= Killer.kills ) ) {
		items[ a ].count == 0 ? Killer.kills -= items[ a ].base : Killer.kills -= items[ a ].price;
		items[ a ].count += 1;
		items[ a ].price = Math.ceil( items[ a ].price + ( items[ a ].price * 0.18 ) );
		Killer.items += 1;
		
		$.each( upgrades[ a ], function( k, v ) {
			if( items[ a ].count >= v.amount && v.disp == false ) {
				$( '#upgrade-container' ).append( ' \
					<section class="upgrade-wrapper" id="' + ( k ).toLowerCase().replace( / /g, '_' ) + '"> \
						<img src="assets/img/upgrades/' + a + '' + v.id + '.png" /> \
					</section> \
				' );
				$( '#' + ( k ).toLowerCase().replace( / /g, '_' ) ).on( 'click', function() { Killer.PurchaseUpgrade( a, k ) } );
				$( '#' + ( k ).toLowerCase().replace( / /g, '_' ) ).on( 'mouseenter', function() {
					if( $( '.popup-title-right' ).html() != k ) {
						$( '.popup-title-right' ).html( k );
						$( '.popup-image-right' ).attr( 'src', 'assets/img/upgrades/' + a + '' + v.id + '.png' );
						v.mult[ 0 ] == 0 ? $( '.popup-text-right' ).html( 'Multiply the amount gained from this item category by ' + ( v.mult[ 1 ] + 1 ) ) : $( '.popup-text-right' ).html( 'Increase the base amount gained from this item category by ' + v.mult[ 0 ] );
						$( '.popup-cost-right' ).html( addCommas( v.cost ) );
					}
					$( '#popup' ).css( 'display', 'block' );
				} );
				$( '#' + ( k ).toLowerCase().replace( / /g, '_' ) ).on( 'mouseleave', function() { $( '#popup' ).css( 'display', 'none' ); } );
				v.disp = true;
				$( '#upgrade-container' ).slideDown( 'slow' );
			}
		} );
		
		Killer.ReCalc( a, '' );
	}
}

Killer.ReCalc = function( a, b ) {
	// Global recalculation function. Checks all values and updates them appropriately
	// and updates the DOM elements when required
	
	b == 'a' ? Killer.xp += ( items[ 'knife' ].mult[ 0 ] + 0.5 ) * items[ 'knife' ].mult[ 1 ] : Killer.xp += Math.round( Math.sqrt( Killer.level ) * items[ 'knife' ].mult[ 1 ] );
	Killer.killsPC = 1;
	for( x = Killer.level; x >= 2; x-- ) Killer.killsPC += ( 1 + items[ 'knife' ].mult[ 0 ] ) * ( ( x * 0.1 ) + ( items[ 'knife' ].mult[ 1 ] - 1 ) );
	
	if( Killer.xp >= Math.pow( Killer.level, 2 ) * 100 ) {
		Killer.xp = 0;
		Killer.level += 1;
		Killer.killsPS += ( Killer.level * 0.0375 );
		
		$( '#level' ).html( 'Level ' + Killer.level );
	}
	$( '#exp-bar' ).css( 'background', '-webkit-gradient( linear, left top, right top, color-stop( ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #c5a870 ), color-stop( ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 ), color-stop( 100%, #f0d5a2 ) )' );
	$( '#exp-bar' ).css( 'background', '-moz-linear-gradient( left, #c5a870 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 100% )' );
	$( '#exp-bar' ).css( 'background', '-o-linear-gradient( left, #c5a870 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 100% )' );
	$( '#exp-bar' ).css( 'background', '-ms-linear-gradient( left, #c5a870 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 100% )' );
	$( '#exp-bar' ).css( 'background', 'linear-gradient( to right, #c5a870 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 ' + ( Killer.xp / ( Math.pow( Killer.level, 2 ) * 100 ) ) * 100 + '%, #f0d5a2 100% )' );
	
	if( a != '' ) {
		Killer.killsPS += ( items[ a ].kps + items[ a ].mult[ 0 ] ) * items[ a ].mult[ 1 ];
		items[ a ].total += ( items[ a ].kps + items[ a ].mult[ 0 ] ) * items[ a ].mult[ 1 ];
		
		$( '#count-' + a ).html( addCommas( items[ a ].count ) );
		$( '#num-' + a ).html( 'Cost: ' + addCommas( items[ a ].price ) );
	}
	
	if( kills.hasOwnProperty( Killer.lastMessage ) ) {
		if( kills[ Killer.lastMessage ].count <= Killer.allTimeKills ) {
			$( '#kill-message' ).html ( 'You have killed more people than ' + kills[ Killer.lastMessage ].text );
			Killer.lastMessage++;
		}
	}
	
	$( '#stats-kills' ).html( 'Kills: ' + addCommas( ( Killer.kills ).toFixed( 1 ) ) );
	$( '#stats-total-kills' ).html( 'All Time Kills: ' + addCommas( ( Killer.allTimeKills ).toFixed( 1 ) ) );
	$( '#stats-clicks' ).html( 'Total Clicks: ' + addCommas( Killer.clicks ) );
	$( '#stats-kills-ps' ).html( 'Kills Per Second: ' + addCommas( ( Killer.killsPS ).toFixed( 1 ) ) );
	$( '#stats-kills-pc' ).html( 'Kills Per Click: ' + addCommas( ( Killer.killsPC ).toFixed( 1 ) ) );
	
	$( '#stats-items' ).html( 'Total Items: ' + addCommas( Killer.items ) );
	$( '#current-kills' ).html( addCommas( ( Killer.kills ).toFixed( 1 ) ) + ' Kills' );
	$( '#current-kills-ps' ).html( addCommas( ( Killer.killsPS ).toFixed( 1 ) ) + ' Kills Per Second' );
}

Killer.AutoKill = function() {
	// Automation function ran every 1/5th of a second to accurately make the 
	// kills counters checked against the kills per second count
	
	if( Killer.killsPS == 0 ) return;
	
	var curtime = new Date();
	delta_ms = curtime.getTime() - Killer.lastTime.getTime();
	Killer.lastTime.setTime( curtime.getTime() );
	
	Killer.kills += Killer.killsPS * ( delta_ms / 1000 );
	Killer.allTimeKills += Killer.killsPS * ( delta_ms / 1000 );
	
	Killer.ReCalc( '', 'a' );
}

Killer.CreateItems = function( i ) {
	// Loops through the items JSON object and creates each of the item displays
	// and appends it to the left third of the page
	
	$.each( i, function( k, v ) {
		v.price = v.base;
		
		$( '#left' ).append( ' \
			<section class="item" id="' + k + '" onclick="javascript: Killer.IncreaseItem( \'' + k + '\' )"> \
				<img src="assets/img/items/' + k + '.png" /> \
				<p id="count-' + k + '" class="item-amount">' + addCommas( v.count ) + '</p> \
				<p class="item-name">' + v.name + '</p> \
				<p class="item-next">Gives ' + ( v.kps + v.mult[ 0 ] ) * v.mult[ 1 ] + ' kills</p> \
				<p id="num-' + k + '" class="item-cost">Cost: ' + addCommas( v.base ) + '</p> \
			</section> \
		' );
	} );
}

Killer.PurchaseUpgrade = function( a, b ) {
	// Takes the upgrade sub-category and the upgrade name and updates the
	// multipliers appropriately & remove the upgrade display from the DOM
	
	var y = upgrades[ a ][ b ];
	
	if( y.get == true || items[ a ].count < y.amount || Killer.kills < y.cost ) return;
	Killer.Notification( y.desc );
	Killer.knifeProgression++;
	if( a == 'knife' ) $( '#the-knife' ).attr( 'src', 'assets/img/knife-' + Killer.knifeProgression );
	y.mult[ 0 ] == 0 ? items[ a ].mult[ 1 ] += y.mult[ 1 ] : items[ a ].mult[ 0 ] += y.mult[ 0 ];
	Killer.kills -= y.cost;
	upgrades[ a ][ b ].get = true;
	$( '#' + ( b ).toLowerCase().replace( / /g, '_' ) ).remove();
	$( '#popup' ).css( 'display', 'none' );
	
	Killer.killsPS -= items[ a ].total;
	items[ a ].total = 0;
	for( var i = items[ a ].count; i >= 0; i-- ) items[ a ].total += ( items[ a ].kps + items[ a ].mult[ 0 ] ) * items[ a ].mult[ 1 ];
	Killer.killsPS += items[ a ].total;
	
	if( $.trim( $( '#upgrade-container' ).html() ) == '' ) $( '#upgrade-container' ).slideUp( 'slow' );
	Killer.ReCalc( '', '' );
	$( '#' + a + ' .item-next' ).html( 'Gives ' + ( items[ a ].kps + items[ a ].mult[ 0 ] ) * items[ a ].mult[ 1 ] + ' kills' );
}

Killer.SwapMenu = function( a, b ) {
	// Swaps what it displayed in the right hand menu when a menu
	// button is pressed
	
	if( $( '#' + a ).css( 'display' ) == 'block' ) return;
	$( '#' + a ).css( 'display', 'block' );
	$( '#' + b ).css( 'display', 'none' );
	
	if( a == 'statistics' ) {
		$( '#export-game' ).css( 'display', 'none' );
		$( '#load-wrapper' ).css( 'display', 'none' );
	}
}

Killer.ShowLoad = function() {
	// Hides the export dialog if it is visible and displays the 
	// load game dialog
	
	if( $( '#export-game' ).css( 'display' ) == 'block' ) $( '#export-game' ).css( 'display', 'none' );
	$( '#load-wrapper' ).css( 'display', 'block' );
}

Killer.ClickKill = function() {
	// Increments the kill counters when the knife is clicked
	
	Killer.clicks += 1;
	Killer.allTimeKills += Killer.killsPC;
	Killer.kills += Killer.killsPC;
	
	Killer.ReCalc( '', '' );
}

Killer.Notification = function( a ) {
	// Sets the text inside the notification element and animates it
	// in then back out after 3 seconds
	
	$( '#notifications' ).css( 'right', '-400px' );
	$( '#notifications' ).html( a );
	$( '#notifications' ).animate( { 'right': '0' }, 1500, function() {
		setTimeout( function() {
			$( '#notifications' ).animate( { 'right': '-400px' }, 1500, function() {
				$( '#notifications' ).css( 'right', '9000px' );
			} );
		}, 3000 );
	} );
}

Killer.Init = function() {
	// Initialisation functions and element that are set/ran when
	// the DOM has fully loaded the page
	
	Killer.CreateItems( items );
	if( localStorage[ 'save' ] != '' ) Killer.LoadGame( localStorage[ 'save' ] );
	$( '#load-game' ).on( 'submit', function( event ) { event.preventDefault(); Killer.LoadGame( $( '#load-game input[ name=savestr ]' ).val() ) } );
	$( '#the-knife' ).click( Killer.ClickKill );
	$( '#save' ).on( 'click', function() { Killer.SaveGame( true ) } );
	$( '#export' ).on( 'click', function() { Killer.SaveGame( false ) } );
	$( '#load' ).click( Killer.ShowLoad );
	$( '#reset' ).click( Killer.ResetGame );
	$( '#version' ).html( 'Version: ' + Killer.version );
	setInterval( Killer.AutoKill, 20 );
	setInterval( function() { Killer.SaveGame( true ) }, 30000 );
}

$( window ).ready( function() { Killer.Init() } );