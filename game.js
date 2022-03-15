// main chính
const GAME_WIDTH = 200;
const GAME_HEIGHT = 400;
class game{
    constructor() {
        this.canvas = null;
        this.context = null;
        this.btnStart = null;
        this.status = null;
        this.speed = 1000;
        this.init();
    }
    init(){
        this.btnStart = document.getElementById('btn_start');
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;// chiều dài canvas
        this.canvas.height = GAME_HEIGHT;// chiều rộng canvas
        document.body.appendChild(this.canvas);
        //khởi tạo đối tượng board
        this.board = new board(this);
        // vẽ những ô vuông nhỏ
        // this.d = new dot(this, 5, 6)
        // get keyboard - bắt sự kiện bàn phím
        this.listenKeyBoard();
        // break the brick
        this.brick = new brick(this);
        // set tốc độ rơi của khối ô vuông
        //this.startGame();
        // bắt đầu game loop
        this.loop();
        //
    }
    // startGame(){// tốc độ của khối gạch khi rơi xuống
    //     setInterval( () => {
    //         this.brick.fall();
    //     }, 500);
    // }
    startGame(){
        return setInterval(()=>{
            //this.block.fall();
            this.brick.fall();
        }, this.speed);
    }
    creatNewBrick(){// tạo khối gạch mới
        this.brick = new brick(this);
    }
    listenKeyBoard(){
        document.addEventListener('keydown', (event) => {
            if(this.status != null){
                console.log(event.code);
                switch (event.code){
                    case 'ArrowLeft':
                        this.brick.moveLeft();
                        break; // mũi tên sang trái
                    case 'ArrowRight':
                        this.brick.moveRight();
                        break;// sang phải
                    case 'ArrowUp':
                        this.brick.rotate();// khiến cho những khối nó xoay
                        break;// lên
                    case 'ArrowDown':
                        this.brick.moveDown();// khiến cho nhứng khối vuông rơi xuống ngay lật tức
                        break;// xuống
                }
            }

        });
        this.btnStart.addEventListener('click', (event)=>{
            let status = event.srcElement.attributes.status.value;
            switch (status) {
                case 'start':
                    this.status = this.startGame();
                    this.btnStart.attributes.status.value = 'stop';
                    this.btnStart.value = "STOP";
                    break;
                case 'stop':
                    clearInterval(this.status);
                    this.status = null;
                    this.btnStart.attributes.status.value = 'start';
                    this.btnStart.value = "START";
                    // statements_def
                    break;
            }
        });

    }
    loop(){
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }
    update(){
    }
    clearScreen(){//xóa ô vuông cũ bằng cách vẽ những ô vuông đó có màu trắng
        this.context.fillStyle = '#ffffff';// những ô phía trước sẻ có màu trắng
        this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);// từ vị trí (0,0) tới cuối cùng
    }
    draw(){
        // this.d.draw();// vẽ ô vuông;
        this.clearScreen();
        this.board.draw();
        this.brick.draw();
        // this.d.draw();
    }
}
var g = new game();