var h = 0;
var w = 0;

function ChangeHeight() {
	if( $( window ).height() == h ) return;
	
	h = $( window ).height() - 152;
	$( '#left' ).css( 'height', h + 'px' );
	$( '#middle' ).css( 'height', h + 'px' );
	$( '#right' ).css( 'height', h + 'px' );
}

function ChangeWidth() {
	if( $( window ).width() == w ) return;
	
	w = $( window ).width();
	$( '#the-knife' ).css( 'margin-left', ( $( '#middle' ).width() / 2 ) - ( document.getElementById( 'the-knife' ).clientWidth / 2 ) );
	$( '.popup-text-right' ).css( 'width', $( '#right' ).width() - 91 );
}

$( document ).ready( function() { ChangeHeight(); ChangeWidth() } );
$( window ).on( 'resize', function() { ChangeHeight(); ChangeWidth() } );