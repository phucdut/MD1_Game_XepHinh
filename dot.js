class dot{
    constructor(game, row, col) {
        this.game = game;
        this.size = 20;
        this.row = row; // số hàng
        this.col = col;// số cột
    }
    hitLeft(){
        return this.col == 0;// check giới hạn khi di chuyển sang trái
    }
    canMoveLeft(){
        if (this.hitLeft()) return false;
        if ( ! this.game.board.isEmptyCell(this.row, this.col - 1)) {// check ô trống di chuyển sang trái
            return false;
        }
        return true;
    }
    moveLeft(){
        if(this.canMoveLeft()){
            this.col--;// di chuyển sang trái
        }
    }
    hitRight(){
        return this.col == NUM_COLS - 1;// check giới hạn khi di chuyển sang phải
    }
    canMoveRight(){
        if (this.hitRight()) return false;
        if ( ! this.game.board.isEmptyCell(this.row, this.col + 1)) {// check ô trống di chuyển sang trái
            return false;
        }
        return true;
    }
    moveRight(){
        if(this.canMoveRight()){
            this.col++;// di chuyển sang phai
        }
    }
    hitBottom(){
        return this.row == NUM_ROWS - 1;// check ô vuông rơi xuống cuối cùng
    }
    canFall() {// check xem những ô vuông có thể rơi tiếp hay k
        if (this.hitBottom()) return false;
        if ( ! this.game.board.isEmptyCell(this.row + 1, this.col)) {// check xem ô đó có trống k để ô vuông rơi xuống
            return false;
        }
        return true;
    }
    fall(){
        if(this.canFall()){
            this.row++;
        }
    }

    update(){

    }
    draw(){
        let x = this.col * this.size;// lấy vị trí x cho ô vuông
        let y = this.row * this.size;// lấy vị trí y cho ô vuông
        this.game.context.fillStyle = '#800000';// tạo cho nhưng ô vuông nhỏ có màu đỏ
        this.game.context.fillRect(x + 1, y + 1, this.size - 2, this.size - 2);// truyền vào các thông số để vẻ hình vuông;
    }


}