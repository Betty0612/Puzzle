const memoryGame= 
{
    tileCount: 20, //number of tiles
    tileOnRow: 5, //number of tiles in one row
    divBoard: null,
    divScore: null,
    tiles: [], //there will be board of tiles
    tilesChecked: [],
    moveCount: 26, //number of moves
    tilesImg: [ //tiles image
        '../img/img1.jpg',
        '../img/img2.jpg',
        '../img/img3.jpg',
        '../img/img4.png',
        '../img/img5.jpg',
        '../img/img6.png',
        '../img/img7.jpg',
        '../img/img8.png',
        '../img/img9.png',
        '../img/img10.png'
    ],
    canGet: true, //can player click on tiles
    canGetById: [true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true, true],
    tilePairs: 0, //number of tile pairs
    firstEl: null,
    secondEl: null,

    tileClick : function(e) {
        if (this.canGet && this.canGetById[e.target.dataset.index]) {

            if (!this.tilesChecked[0] || (this.tilesChecked[0].dataset.index !== e.target.dataset.index)) 
            {
                this.tilesChecked.push(e.target);
                e.target.style.backgroundImage = 'url(' + this.tilesImg[e.target.dataset.cardType] + ')';
                
                if (this.tilesChecked.length !== 2)
                    this.firstEl = e.target.dataset.index;
            }

            if (this.tilesChecked.length === 2) {
                this.canGet = false;
                this.secondEl = e.target.dataset.index;

                if (this.tilesChecked[0].dataset.cardType === this.tilesChecked[1].dataset.cardType) {
                    setTimeout(this.stayOverturned.bind(this), 500);
                } else {
                    setTimeout(this.resetTiles.bind(this), 500);
                }

                this.moveCount--;
                this.divScore.innerText = "You have "+ this.moveCount+ " moves";
                if (this.moveCount==0){
                    alert ("Game Over");
                    location.reload(true);
                }
            }
        }
    },
    stayOverturned : function() {
        
       this.tilesChecked[0].style.backgroundImage=this.backgroundImage;
       this.tilesChecked[1].style.backgroundImage=this.backgroundImage;

       this.canGetById[this.firstEl] = false;
       this.canGetById[this.secondEl] = false;

        this.tilesChecked = [];
        this.canGet=true;
        this.tilePairs++;
        if (this.tilePairs >= this.tileCount / 2) {
            alert('Congratulations! You won!');
            location.reload(true);
        }
    },

    resetTiles : function() {
        this.tilesChecked[0].style.backgroundImage = 'url(../img/refresh.png)';
        this.tilesChecked[1].style.backgroundImage = 'url(../img/refresh.png)';

        this.canGetById[this.firstEl] = true;
        this.canGetById[this.secondEl] = true;
        this.firstEl = null;
        this.secondEl = null;

        this.tilesChecked = [];
        this.canGet = true;
    },

    startGame : function() {
        //clean board
        this.divBoard = document.querySelector('.game-board');
        this.divBoard.innerHTML = '';

        //clean
        this.divScore = document.querySelector('.game-score');
        this.divScore.innerHTML = '';

        //clean variables because game can start again
        this.tiles = [];
        this.tilesChecked = [];
        this.moveCount = 26; //player has 26 moves; 
        this.canGet = true;
        this.tilePairs = 0;

        //generate the board of tiles
        for (let i=0; i<this.tileCount; i++) {
            this.tiles.push(Math.floor(i/2));
        }

        //shuffle
        for (let i=this.tileCount-1; i>0; i--) {
            const swap = Math.floor(Math.random()*i);
            const tmp = this.tiles[i];
            this.tiles[i] = this.tiles[swap];
            this.tiles[swap] = tmp;
        }
        //insert tiles on the board
        for (let i=0; i<this.tileCount; i++) {
            const tile = document.createElement('div');
            tile.classList.add("game-tile");
            this.divBoard.appendChild(tile);
            
            tile.dataset.cardType = this.tiles[i];
            tile.dataset.index = i; // dataset - metod to store indexes of clicked tiles

            tile.style.left = 5 + (tile.offsetWidth+10) * (i%this.tileOnRow) + 'px'
            tile.style.top = 5 + (tile.offsetHeight+10) * (Math.floor(i/this.tileOnRow)) + 'px';

            tile.addEventListener('click', this.tileClick.bind(this));
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.game-start').addEventListener('click', function() {
        memoryGame.startGame();
    });
});