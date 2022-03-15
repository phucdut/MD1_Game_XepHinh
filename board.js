// tạo dữ liệu data bảng để chơi
const _ = null;
const x = 'x';
const  NUM_ROWS = 20;
const  NUM_COLS = 10;
class board{
    constructor(game) {
        this.game = game;
        this.number = 0;
        this.data = [
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_]
        ];
        this.coutSpeed = 0;

    }
    isEmptyCell(row, col){// check xem data  rơi có rông hay không
        return this.data[row][col] == _;
    }
    isRowFull(row){// check xem nếu dữ liệu trống thì bỏ qua còn nếu đã lấp đầy thì return true để xóa hàng đó
        let full = true;
        for(let col = 0; col < NUM_COLS; col++){
            if(this.isEmptyCell(row,col)){
                full = false;
            }
        }
        return full;
    }
    checkFullRow(){//  kiểm tra hàng đó đã full chưa nấu full thì xóa hàng đó và tạo hàng mới ở đầu data
        for(let row = NUM_ROWS - 1; row >= 0; row--){
            if(this.isRowFull(row)){
                this.removeRow(row);
                this.number += 10;
                this.coutSpeed += 1;
            }
            if(this.checkEndGame()){
                clearInterval(this.game.status);
                let display = document.getElementById('display').innerHTML = 'Bạn đã kết thúc trò chơi';
            }
            if(this.coutSpeed  == 15){// điều chỉnh tốc độ cho game, nếu ăn đc 15 hàng thì tăng 1 level và tăng tốc độ rơi của khối gạch
                this.game.speed -= 100;
                this.coutSpeed  = 0;
                clearInterval(this.game.status);
                this.game.status = this.game.startGame();
            }
            document.getElementById('txt_level').value = Math.floor((1000-this.game.speed)/100);//
            document.getElementById('txt_score').value = this.number;
        }
    }
    removeRow(row){// nếu đầu thì xóa hàng đi và tạo 1 hàng mới ở trên cùng để bù cho data đã mất
        this.data.splice(row, 1);// xóa data 1 hàng ở vị trí row
        this.data.unshift([_,_,_,_,_,_,_,_,_,_]);// tạo data mới
        this.createDots();// tạo 1 data mới để chơi
    }
    checkEndGame(){
        let endGame = false;
        for(let col =0; col < this.data[0].length; col++){
            if(this.data[0][col] === x){
                endGame = true;
                break;
            }
        }
        return endGame;
    }
    createDots(){
        this.dots = [];
        // duyệt dữ liệu data
        for(let row = 0; row < NUM_ROWS; row++){
            for(let col = 0; col < NUM_COLS; col++){
                if(this.data[row][col] == x){
                    let newDots = new dot(this.game, row, col);// tạo đối tượng mới
                    this.dots.push(newDots);
                }
            }
        }

    }
    draw(){
        // let dots = [];
        // // duyệt dữ liệu data
        // for(let row = 0; row < NUM_ROWS; row++){
        //     for(let col = 0; col < NUM_COLS; col++){
        //         if(this.data[row][col] == x){
        //             let newDots = new dot(this.game, row, col);// tạo đối tượng mới
        //             dots.push(newDots);
        //         }
        //     }
        // }
        this.createDots();
        this.dots.forEach((dot) => dot.draw() );// lấy đối tượng để vẻ, lặp và vẽ từng khối ô vuông
    }
}