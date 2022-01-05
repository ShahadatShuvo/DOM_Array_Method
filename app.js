// # DOM Select 

const addUser = document.querySelector('#addUser');
const doubleMoney = document.querySelector('#doubleMoney');
const showOnlyMillioniare = document.querySelector('#showOnlyMillioniare');
const sortByRichest = document.querySelector('#sortByRichest');
const calculateEntireWealth = document.querySelector('#calculateEntireWealth');
const createNewUser = document.querySelector('#createRow');

// console.log(addUser);
let arr = [];

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function displayUsers(arr) {
    removeAllChildNodes(createNewUser);
    for (let i = 0; i < arr.length; i++) {
        const newRow = document.createElement('tr');

        const newUserName = document.createElement('th');
        newUserName.innerHTML = arr[i].name;
        newRow.appendChild(newUserName);

        const newUserMoney = document.createElement('th');
        newUserMoney.innerHTML = '$ ' + formatToCurrency(arr[i].money);
        newRow.appendChild(newUserMoney);

        createNewUser.appendChild(newRow);
    }
}

function formatToCurrency(amount) {
    return (amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api/');
    const data = await res.json();
    const user = data.results[0];
    // create user object 
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000),
    };
    arr.push(newUser);
    displayUsers(arr);
}

addUser.addEventListener('click', () => {
    getRandomUser();
});

doubleMoney.addEventListener('click', function() {
    for (let i = 0; i < arr.length; i++) {
        arr[i].money = arr[i].money * 2;
    }
    displayUsers(arr);

});

showOnlyMillioniare.addEventListener('click', () => {
    let millionArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].money >= 1000000) {
            const newUser = {
                name: arr[i].name,
                money: arr[i].money,
            };
            millionArr.push(newUser);
        }
    }
    displayUsers(millionArr);
});

sortByRichest.addEventListener('click', () => {
    arr.sort((a, b) => {
        return b.money - a.money;
    });
    displayUsers(arr);
});

calculateEntireWealth.addEventListener('click', () => {
    const temp = document.querySelector('.table-success');
    if (temp == null) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            sum += arr[i].money;
        }
        const table = document.querySelector('.table');
        const step1 = document.createElement('thead');
        step1.className = 'table-success';
        const step2 = document.createElement('tr');
        step1.appendChild(step2);
        const step3 = document.createElement('th');
        const step4 = document.createElement('th');
        step2.appendChild(step3);
        step2.appendChild(step4);
        step3.innerHTML = `Total Wealth:`;
        step4.innerHTML = '$ ' + formatToCurrency(sum);
        table.appendChild(step1);
        console.log(`Developed by: HossAin Shuvo`);
        console.log(`Email: hossainshuvo7860@gmail.com`);
        console.log(`Facebook: https://www.facebook.com/hossain.shuvo.7860/`);
    } else {
        const e = document.querySelector('tbody');
        if (e && e.nextSibling) {
            e.parentNode.removeChild(e.nextSibling)
        }
    }
});