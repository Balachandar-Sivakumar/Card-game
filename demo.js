let photos = ['01.jpg', '02.jpg', '03.jpg', '04.jpg', '05.jpg', '06.jpg'],
    flag = true, first_ind, sec_ind, trigger = true;

function shuffleArray(data) {
    return data.sort(() => Math.random() - 0.5);
}

function start() {
    let img_con = document.querySelector('.images');
    img_con.innerHTML = '';
    let num = [];

    for (let i = 0; i < 2; i++) shuffleArray(photos).forEach(n => img_con.innerHTML += `<div class='flip_box'><img src="${n}"><div class='back_side'></div></div>`);

    let images = Array.from(document.querySelectorAll('img')),
        back = Array.from(document.querySelectorAll('.back_side'));

    for (let i = 0; i < back.length; i++) num.push(i);

    back.forEach((n, i) => n.addEventListener('click', () => {
        n.classList.add('rotate');
        if (flag) return (first_ind = i, flag = false);

        sec_ind = i;
        if (images[first_ind].src === images[sec_ind].src) {
            num = num.filter(x => x !== first_ind && x !== sec_ind);
            if (!num.length) return trigger = false;
        }
        flag = true;
        setTimeout(() => num.forEach(n => back[n].classList.remove('rotate')), 250);
    }));
}

start();

let show = document.querySelector('.h2_tag'),
    pop = document.querySelector('.pop_up_div');

function pop_up(content) {
    pop.classList.toggle('show');
    show.innerHTML = content;
}

document.querySelector('.restart').addEventListener('click', () => window.location.reload());

function timing(time) {
    let timer = document.getElementById("time"),
        str_time = setInterval(() => {
            time--;
            let min = Math.floor(time / 60), sec = time % 60;
            timer.innerHTML = `${min.toString().padStart(2, '0')} : ${sec.toString().padStart(2, '0')}`;
            if (time == 0 || !trigger) {
                clearInterval(str_time);
                pop_up(!trigger ? '🎉 Congratulations! 🎉 You won the game 🏆' : '⏳Time up you lose the game');
            }
        }, 1000);
}

timing(180);
