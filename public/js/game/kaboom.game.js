/**
 * Created by JetBrains WebStorm.
 * User: dylanbeattie
 * Date: 04/06/2011
 * Time: 15:07
 * To change this template use File | Settings | File Templates.
 */

KaboomGame = function (level) {
    this.level = level;
    this.players = [];
    this.DISTANCE = 5;
    this.TILE_SIZE = 48;
}

KaboomGame.prototype = {
        playerChangedVelocity : function(player) {
            /* TODO: find the GAME player matching the supplied player and
               update their position and velocity with those from the
               supplied player.
                */
        },

    addPlayer : function(player) {
        /* TODO: find the first empty spawn point and put the supplied player in it. */
    },

    removePlayer: function(player) {
        /* TODO: Find and free the player slot used by the specified player */
        /* TODO: remember to set the corresponding spawn point.player back to null */
    },

    createPlayer : function() {
        var spawn = level.getFirstEmptySpawnPoint();
        if (spawn == null) return(null);
        var player = new KaboomPlayer("Player " + spawn.number, tilesToPixels(spawn.position));
        return(player);
    },

    tilesToPixels : function(position) {
        var pixelX = position.x * TILE_SIZE;
        var pixelY = position.y * TILE_SIZE;
        var p = new Position(pixelX, pixelY)
    },

    update: function() {
		var game = this;
		/* For each player, assume they have moved DISTANCE in their own velocity */
		this.players.forEach(function(p, idx)
		{
			if (p != null)
			{
				p.position.x += game.DISTANCE * p.velocity.dx;
				p.position.y += game.DISTANCE * p.velocity.dy;
			}
		});
        /* TODO: check for wall/bomb collisions, etc. */
    }
}
