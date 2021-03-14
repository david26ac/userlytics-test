$(document).ready(() => {

    //function to print divisible numbers
    let numbers = $('.numbers');
    function show_numbers(number){
        numbers.empty()
        //defined function to add numbers with colors
        function paint(color, number){
            numbers.append(`
                <div class="number ${color}">
                    <span>${number}</span>
                </div>
            `)
        }

        //Specify the total numbers to be divisible by 3 or 5
        let total_number = number;

        //loop to check 
        for(let i = 1; i <= total_number; i++){
            if (i % 3 === 0 ){
                //divisible by 5
                if(i % 5 === 0){
                    paint('purple', i);

                    //check for last number
                } else if(i === total_number){
                    paint('green', i);
                }
                else{
                    paint('red', i);
                }
            } else if(i % 5 === 0){
                //divisible by 3
                if(i % 3 === 0){
                    paint('purple', i);

                    //check for last number
                } else if(i === total_number){
                    paint('green', i);
                } else{
                    paint('blue', i);
                }
            } else{
                if(i === total_number){
                    paint('green', i);
                } else{
                    //no divisible
                    paint('normal', i)
                }
            }
        }
    }
    //Launch function
    show_numbers(121)

    //Event onChange input to take value and print numbers
    var input_number = $('#input_number');
    var max_number = parseInt($('#input_number').attr('max'))
    var msg = $('.msg')
    input_number.change((e) => {
        msg.empty()
        e.preventDefault();
        console.log(max_number)
        let number_to_check = parseInt(input_number.val())

        if(number_to_check <= max_number){
            show_numbers(number_to_check);
            if(number_to_check === ''){
                show_numbers(121);
            }
        } else{
            msg.append(`
                It mus be a max number of 400
            `)
        }
    })
})