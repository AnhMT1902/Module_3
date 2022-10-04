let classA8 = [
    {
        name: "Ha",
        gender: 'female',
        point: 8
    },
    {
        name: "Huy",
        gender: 'male',
        point: 9
    },
    {
        name: "Hung",
        gender: 'male',
        point: 7
    },
    {
        name: "Phuong",
        gender: 'female',
        point: 6
    },
    {
        name: "Huyen",
        gender: 'female',
        point: 10
    },
    {
        name: "Long",
        gender: 'male',
        point: 5
    },
    {
        name: "Luan",
        gender: 'male',
        point: 10
    },
    {
        name: "Linh",
        gender: 'female',
        point: 8
    }
];
let sumMale = 0;
let sumFemale = 0;

for (const value of classA8) {
    if (value.gender === "female") {
        sumFemale += value.point;
    } else if (value.gender === "male") {
        sumMale += value.point;
    }
}

console.log("tong diem nam: " + sumMale + ", tong diem nu: " + sumFemale)