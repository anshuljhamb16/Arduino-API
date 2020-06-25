const app = require("express")();
var port_number = process.env.PORT || 4000;
var server = app.listen(port_number);
var io = require('socket.io')(server);
const cors = require("cors");
const bodyParser = require("body-parser");
var uids=[];

var arr=[];


io.on('connection', (socket) => {
  console.log('new client connected!')
  socket.on('datanode', (data) => {
    console.log(data);
    console.log(typeof(data));
    var newnode = {
      uid: data.uid,
      wifissid1: data.wifissid1,
      wifissid2: data.wifissid2,
      d1: data.d1,
      d2: data.d2,
      xcoord: 0,
      ycoord: 0,
      x:2,
      sector:0
    }
    arr.push(newnode)
    console.log(newnode);
    setInterval(function(){
      if(arr.length>=4){
        thisisfunction();
        arr=[];
        socket.emit("datatonode",uids)
      }
    },1000)
    
  });
});


var list = [
  {
    uid: 1,
    wifissid1: "BSCIPS4",
    wifissid2: "BSCIPS5",
    d1: 3.6,
    d2: 3.5,
    xcoord: 0,
    ycoord: 0,
    x: 2,
    sector: 0,
  },
  {
    uid: 2,
    wifissid1: "BSCIPS5",
    wifissid2: "BSCIPS6",
    d1: 4.0,
    d2: 2.0,
    xcoord: 0,
    ycoord: 0,
    x: 2,
    sector: 0,
  },
  {
    uid: 3,
    wifissid1: "BSCIPS5",
    wifissid2: "BSCIPS6",
    d1: 4.0,
    d2: 2.5,
    xcoord: 0,
    ycoord: 0,
    x: 2,
    sector: 0,
  },
  {
    uid: 4,
    wifissid1: "BSCIPS8",
    wifissid2: "BSCIPS9",
    d1: 2.5,
    d2: 3.5,
    x: 2,
    xcoord: 0,
    ycoord: 0,
    sector: 0,
  },
  {
    uid: 5,
    wifissid1: "BSCIPS8",
    wifissid2: "BSCIPS9",
    d1: 2.5,
    d2: 2.5,
    x: 2,
    xcoord: 0,
    ycoord: 0,
    sector: 0,
  },
];

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());

app.listen(3000, () => {
  console.log(`Started on PORT ${port_number}`);
});
app.post("/api", async function (req, res) {
  var x = req.body.value1;
  var y = req.body.value2;
  var z = +x + +y;
  console.log(req.body);
  res.json({ value: z });
});

// app.get("/apiget1", function(req,res){
//   console.log(req.query)
//   var x = req.query.value1;
//   var y = req.query.value2;
//   var z = +x + +y;
//   res.json({"value":z})
// })
app.get("/apiget", function (req, res) {
  res.send("Hello");
});

function setsector(first, second) {
  if (first == "BSCIPS5" || first == "BSCIPS6") {
    if (second == "BSCIPS4") return 2;
    else if (second == "BSCIPS6" || second == "BSCIPS5") return 3;
    else if (second == "BSCIPS7") return 6;
  }
  if (first == "BSCIPS8" || first == "BSCIPS9") {
    if (second == "BSCIPS7") return 5;
    else if (second == "BSCIPS8" || second == "BSCIPS9") return 4;
  }
  if (first == "BSCIPS17" || first == "BSCIPS18") {
    if (second == "BSCIPS16") return 13;
    else if (second == "BSCIPS18" || second == "BSCIPS17") return 12;
  }
  if (first == "BSCIPS15" || first == "BSCIPS16") {
    if (second == "BSCIPS17") return 13;
    else if (second == "BSCIPS16" || second == "BSCIPS15") return 14;
    else if (second == "BSCIPS14") return 11;
  }
  if (first == "BSCIPS26" || first == "BSCIPS27") {
    if (second == "BSCIPS25") return 21;
    else if (second == "BSCIPS26" || second == "BSCIPS27") return 20;
  }
  if (first == "BSCIPS24" || first == "BSCIPS25") {
    if (second == "BSCIPS26") return 21;
    else if (second == "BSCIPS24" || second == "BSCIPS25") return 22;
    else if (second == "BSCIPS23") return 19;
  }
  if (first == "BSCIPS23" || first == "BSCIPS22") {
    if (second == "BSCIPS21") return 23;
    else if (second == "BSCIPS23" || second == "BSCIPS22") return 18;
    else if (second == "BSCIPS24") return 19;
  }
  if (first == "BSCIPS21" || first == "BSCIPS20") {
    if (second == "BSCIPS22") return 23;
    else if (second == "BSCIPS20" || second == "BSCIPS21") return 24;
    else if (second == "BSCIPS19") return 17;
  }
  if (first == "BSCIPS12" || first == "BSCIPS11") {
    if (second == "BSCIPS13") return 15;
    else if (second == "BSCIPS12" || second == "BSCIPS11") return 16;
    else if (second == "BSCIPS10") return 9;
  }
  if (first == "BSCIPS14" || first == "BSCIPS13") {
    if (second == "BSCIPS12") return 15;
    else if (second == "BSCIPS13" || second == "BSCIPS14") return 10;
    else if (second == "BSCIPS15") return 11;
  }
  if (first == "BSCIPS2" || first == "BSCIPS3") {
    if (second == "BSCIPS1") return 1;
    else if (second == "BSCIPS3" || second == "BSCIPS2") return 8;
    else if (second == "BSCIPS4") return 7;
  }
  if (first == "BSCIPS4" || first == "BSCIPS5") {
    if (second == "BSCIPS3") return 7;
    else if (second == "BSCIPS4" || second == "BSCIPS5") return 2;
    else if (second == "BSCIPS6") return 3;
  }
}

async function thisisfunction() {
  var temp;
  var t;
  var a;
  var b;
  var cosb1;
  var cosb2;
  for (let i = 0; i < 5; i++) {
    list[i].sector = setsector(list[i].wifissid1, list[i].wifissid2);
    t =
      (Math.pow(list[i].d2, 2) -
        (2 * list[i].x * list[i].x + list[i].d1 * list[i].d1)) /
      (2 * list[i].x * list[i].d1);
    cosb1 = (t - Math.sqrt(2 - t * t)) / 2;
    cosb2 = (t + Math.sqrt(2 - t * t)) / 2;
    console.log(t);
    if (cosb1 <= 1 && cosb1 >= -1) {
      b = Math.acos(cosb1);
    } else {
      b = Math.acos(cosb2);
    }
    a = Math.asin((list[i].x + list[i].d1 * Math.cos(b)) / list[i].d2);
    list[i].xcoord = list[i].d1 * Math.sin(b);
    list[i].ycoord = list[i].d2 * Math.sin(a);
    // console.log(Math.sin(b))
    // console.log(Math.sin(a))
  }
  for (let i = 0; i < 5; i++) {
    for (let j = i + 1; j < 5; j++) {
      if (list[i].sector == list[j].sector) {
        // console.log(list[i].ycoord)
        // console.log(list[j].ycoord)
        temp = Math.sqrt(
          Math.pow(list[i].xcoord - list[j].xcoord, 2) +
            Math.pow(list[i].ycoord - list[j].ycoord, 2)
        );
        if (temp < 1.5) {
          list[i].status = 1;
          list[j].status = 1;
          console.log(`UID ${list[i].uid} & UID ${list[j].uid} too close!`);
          var obj = {uid1:list[i].uid,uid2:list[2].uid};
          console.log(obj)
          uids.push(obj);
          console.log(uids)
        } else {
          console.log("you are safe!");
        }
      }
    }
  }
}
