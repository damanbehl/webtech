$( function() {
    /*--------------------------------------
     #User Object
     --------------------------------------*/

    var User = {
        handle : '@bebaps',
        img : 'bebaps.jpg',
    };

    /*--------------------------------------
     #State Management
     --------------------------------------*/

    $( 'main' ).on( 'click', 'textarea', function() {
        $( this ).parents( 'form' ).addClass( 'expand' );
    } );

    $( '.posts' ).on( 'click', '.thread > .post', function() {
        $( this ).parents( '.thread' ).toggleClass( 'expand' );
    } );

    /*--------------------------------------
     #Templating
     --------------------------------------*/

    /**
     * Compile Templates
     */
    var post   = Handlebars.compile( $( '#template-post' ).html() );
    var compose = Handlebars.compile( $( '#template-compose' ).html() );
    var thread  = Handlebars.compile( $( '#template-thread' ).html() );

    /**
     * Create New post
     */
    function renderpost( User, message ) {
        var data = {
            handle : User.handle,
            img : User.img,
            message : message
        };
        return post( data );
    };

    /**
     * Compose Area
     */
    function renderCompose() {
        return compose();
    }

    /**
     * Create a New Thread
     */
    function renderThread( User, message ) {
        var getpost   = renderpost( User, message );
        var getCompose = renderCompose();

        var getThread = {
            postTemplate : getpost,
            composeTemplate : getCompose
        };
        return thread( getThread );
    }

    /*--------------------------------------
     #Composition
     --------------------------------------*/

    $( document ).on( 'submit', 'form', function() {
        event.preventDefault();
        message = $( 'textarea', this ).val();

        if ( $( this ).parent( 'header' ).length ) {
            $( '.posts' ).append( renderThread( User, message ) );
        } else {
            $( this ).parent().append( renderpost( User, message ) );
        }

        $( 'textarea' ).val( '' );
        $( 'form' ).removeClass( 'expand' );
    } );

} );
