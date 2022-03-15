class brick{
    constructor(game) {
        this.game = game;
        this.dots = [];
        this.data = [];
        this.row = 0;
        this.col = 0;

        // creat data
        this.creatData();
        this.creatDots()
    }
    creatData(){
        let baseData = [
            [
                [x,x,x,x]
            ],
            [
                [x,x],
                [x,x]
            ],
            [
                [x,x,x],
                [_,x,_]
            ],
            [
                [x,x,_],
                [_,x,x]
            ],
            [
                [_,x,x],
                [x,x,_]
            ],
            [
                [x,_],
                [x,_],
                [x,x]
            ],
            [
                [_,x],
                [_,x],
                [x,x]
            ]
        ];
        let r = Math.floor(Math.random() * 6);
        this.data = baseData[r];
        // console.table(this.data)
    }
    canFall(){// xét điều kiện để khối gạch có thể rơi
        let brickCanFall = true;
        this.dots.forEach((dot) => {
            if(! dot.canFall()){
                brickCanFall = false;
            }
        });
        return brickCanFall;
    }
    fall() {
        if (this.canFall()) {// cho khối gạch rơi đến hàng cuối cùng
            this.row++;
            this.dots.forEach((dot) => {// vòng lặp dùng để khiếng cho từng dots trong khối gạch cùng rơi xuống
                dot.fall();
            });
        }else {// nếu nó k thể rơi xuống được nữa thì mik sẻ tạo ra khối gạch mới
            this.game.creatNewBrick();// tạo khối gạch mới
            this.appendToBoard();//dính khối gạch vừa rơi.
            this.game.board.checkFullRow();// check xem hàng đã full ô vuông chưa
        }
    }
    moveDown(){// xét vòng lặp nếu đường đi xuống trống thì nó rơi thẳng xuống k cần time
        while(this.canFall()){
            this.fall();
        }
    }
    rotate(){// dùng để xoay khối birck
        let newData = [];
        for(let col = 0 ; col < this.data[0].length; col++){
            let newRow = [];
            for(let row = this.data.length - 1;row >= 0; row--){
                newRow.push(this.data[row][col]);
            }
            newData.push(newRow);
        }
        // check vị trí mới xem có thể xoay được không
        let isNewData = true;
        for(let newRow = 0; newRow < newData.length; newRow++){
            for(let newCol = 0; newCol < newData[0].length; newCol++){
                // duyệt data
                if(newData[newRow][newCol] == x && ! this.game.board.isEmptyCell(newRow, newCol)){
                    isNewData = false;// check xem dữ liệu mới và dữ liệu trong board k trùng dữ liệu x
                }
            }
        }
        if(isNewData){
            this.data = newData;
            this.creatDots();
        }

    }
    appendToBoard(){
        this.dots.forEach((dot) => {
            this.game.board.data[dot.row][dot.col] = x;// tạo data cho khối rơi xuống mà lần rơi sau nó không mất đi

        });
    }
    canMoveLeft(){// xét điều kiện để khối gạch có thể di chuyển sang trái hay không
        let brickCanMoveLeft = true;
        this.dots.forEach((dot) => {
            if(! dot.canMoveLeft()){
                brickCanMoveLeft = false;
            }
        });
        return brickCanMoveLeft;
    }
    moveLeft() {
        if (this.canMoveLeft()) {// cho khối gạch di chuyển sang trái
            this.col--;
            this.dots.forEach((dot) => {// vòng lặp dùng để khiếng cho từng dots trong khối gạch cùng di chuyển sang trái
                dot.moveLeft();
            });
        }
    }
    canMoveRight(){// xét điều kiện để khối gạch có thể di chuyển sang phải hay không
        let brickCanMoveRight = true;
        this.dots.forEach((dot) => {
            if(! dot.canMoveRight()){
                brickCanMoveRight = false;
            }
        });
        return brickCanMoveRight;
    }
    moveRight() {
        if (this.canMoveRight()) {// cho khối gạch di chuyển sang phải hết mức
            this.col++;
            this.dots.forEach((dot) => {// vòng lặp dùng để khiếng cho từng dots trong khối gạch cùng di chuyển sang phải
                dot.moveRight();
            });
        }
    }

    creatDots(){
        this.dots = [];
        // duyệt dữ liệu data
        for(let row = 0; row < this.data.length; row++) {
            for(let col = 0; col < this.data[0].length; col++){
                if(this.data[row][col] == x){
                    let newDots = new dot(this.game, row + this.row, col + this.col);// tạo đối tượng mới
                    this.dots.push(newDots);
                }
            }
        }

    }
    draw(){
        this.dots.forEach((dot) => dot.draw() );// vẽ những khối gách có hình thái random
    }
}