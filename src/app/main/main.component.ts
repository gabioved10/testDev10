import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';





@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  arrayBuffer: any;
  file: any;
  nodesCount: number = 0;//משתנה כמות קודקודים 
  avgDegree: number = 0;//משתנה לחישוב דרגה ממוצעת 
  weightedDegree: number = 0;//משתנה לחישוב דרגה ממוצעת משוקלל
  edgesCount: number = 0;//משתנה כמות קשתות
  mergeArray: any[] = [];//מערך מאוחד ללא כפיליות כולל משקלים ך
  findArray: any[] = [];//מערך לרשומות שנמאו בחיפוש
  SelectedArray: object[] = []; //רשומה שנבחרה לצורך העברה לקומונטטה גרף
  targetSource: object[] = [];//רשומות קשתות נכנסות
  sourceTarget: object[] = [];//רשומות קשתות נכנסות
  showAll: number = 0;
  showGraph: number = 0;
  Density: number = 0
  // findInex=0;//משתנה לזיהוי מספר אינדקס בחיפוש


  //פונקציות לקליטת קובץ אקסל

  incomingfile(event: any) {
    this.file = event.target.files[0];
    this.Upload()
  }

  Upload() {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name_0 = workbook.SheetNames[0];
      var first_sheet_name_1 = workbook.SheetNames[1];
      var worksheet_0 = workbook.Sheets[first_sheet_name_0];
      var worksheet_1 = workbook.Sheets[first_sheet_name_1];
      var nodes: any = XLSX.utils.sheet_to_json(worksheet_0, { raw: true });//מערך nodes
      var edges: any = XLSX.utils.sheet_to_json(worksheet_1, { raw: true });//מערך edges
      this.nodesCount = nodes.length//חישוב כמות קודקודים
      this.sumFunction(edges, nodes);//שליחת מערך לצורך חישובים edges
      this.showGraph = 1;
    }

    fileReader.readAsArrayBuffer(this.file);
  }

  //  פונקציה לביצוע חישובים מקבלת ג'יסון של edges

  sumFunction(edgesArr: [], nodesArr: []) {

    let count: number = 1;
    let countKeset: number = 0;
    let mergeArr: any[] = [];
    let TempArr: any = [];
    let index = 1;

    let obj = {
      index: 1,
      Source: '',
      Target: '',
      Label: '',
      TargetLabel: '',
      count: 1
    };


    //יצירת מערך מאוחד ללא כפיליות כולל משקלים בשם mergeArr

    edgesArr.forEach((element) => {
      TempArr = mergeArr.filter(e => e["Source"] == element["Source"] && e["Target"] == element["Target"]);

      //בדיקה האם האיבר קיים במערך
      if (TempArr.length == 0) {

        //הכנסת איבר חדש למערך
        obj.index = index;
        obj.Source = element["Source"]
        obj.Target = element["Target"]
        TempArr = nodesArr.filter(e => e["Id"] == element["Source"]);//חיפוש שם מקור
        obj.Label = TempArr[0]["Label"];
        TempArr = nodesArr.filter(e => e["Id"] == element["Target"]);//חיפוש שם יעד
        obj.TargetLabel = TempArr[0]["Label"];
        obj.count = 1;
        mergeArr.push(obj);
        index++;

        //איפוס למשתנה obj
        obj = {
          index: 1,
          Source: '',
          Target: '',
          Label: '',
          TargetLabel: '',
          count: 1
        };
      }

      //איבר קיים במערך
      else {
        mergeArr.forEach((ele) => {
          if (ele.Source == element["Source"] && ele.Target == element["Target"]) {
            ele["count"]++;
          }
        });

      }

    })


    //פונקציה לחישוב סהכ משקלים

    for (let i = 0; i < mergeArr.length; i++) {
      countKeset = countKeset + mergeArr[i].count
    }

    this.edgesCount = mergeArr.length//כמות הקשתות
    this.avgDegree = (this.edgesCount / this.nodesCount)//דרגה ממוצעת
    this.weightedDegree = countKeset / this.nodesCount;//דרגה ממוצעת משוקלל
    this.Density = this.edgesCount/(this.nodesCount *(this.nodesCount-1)/2)//-  מספר הקשרים ברשת חלקי מספר קשרים אפשרי חישוב צפיפות
    this.mergeArray = mergeArr;
  };


  //פונקציה לחיפוש ובניית מערך לאיתור טקסט

  findTextFunction(textFind: string) {

    if (textFind == "") {
      alert("Insert Text")
      return 0;
    }
    this.findArray = [];
    this.showAll = 1;
    this.mergeArray.forEach(element => {
      let ele = element["Label"];

      //הורדת גרשיים פסיק ומרכאות
      ele = element["Label"].replace("'", '')
      ele = element["Label"].replace(",", '')

      let finalString = '';

      for (let i = 0; i < ele.length; i++) {
        if (ele.charAt(i) != '"') {
          finalString += ele.charAt(i);
        }
      }

      ele = finalString;

      //הכנסת המחרוזת למערך        

      let myArray = ele.split(" ");


      for (let index = 0; index < myArray.length; index++) {
        if(element.index==8794){
          element=element;
        }
        if (this.levenshtein(myArray[index], textFind) == 1) {
         
          this.findArray.push(element);
          break;
                 }
      }

    });


  }


  //פונקציה לתצוגת כל הרשומות כולל משקלים
  showAllFunction() {
    this.showAll = 0;
  }

  //פונקציה להעברת רשומה שנבחרה לקומפוננטה גרף
  graphFunction(item) {
    this.SelectedArray = [];
    this.sourceTarget = [];
    this.targetSource = [];
    this.SelectedArray.push(item);
    this.sourceTarget = this.mergeArray.filter(e => e["Source"] == item["Source"]);
    this.targetSource = this.mergeArray.filter(e => e["Target"] == item["Source"]);
    this.showGraph = 1;
  }




  //פונקציה לוינשטיין לחיפוש 
  levenshtein(s: string, t: string) {

    if (s === t) {
      return 0;
    }
    var n = s.length, m = t.length;
    if (n === 0 || m === 0) {
      return n + m;
    }
    var x = 0, y, a, b, c, d, g, h, k;
    var p = new Array(n);
    for (y = 0; y < n;) {
      p[y] = ++y;
    }

    for (; (x + 3) < m; x += 4) {
      var e1 = t.charCodeAt(x);
      var e2 = t.charCodeAt(x + 1);
      var e3 = t.charCodeAt(x + 2);
      var e4 = t.charCodeAt(x + 3);
      c = x;
      b = x + 1;
      d = x + 2;
      g = x + 3;
      h = x + 4;
      for (y = 0; y < n; y++) {
        k = s.charCodeAt(y);
        a = p[y];
        if (a < c || b < c) {
          c = (a > b ? b + 1 : a + 1);
        }
        else {
          if (e1 !== k) {
            c++;
          }
        }

        if (c < b || d < b) {
          b = (c > d ? d + 1 : c + 1);
        }
        else {
          if (e2 !== k) {
            b++;
          }
        }

        if (b < d || g < d) {
          d = (b > g ? g + 1 : b + 1);
        }
        else {
          if (e3 !== k) {
            d++;
          }
        }

        if (d < g || h < g) {
          g = (d > h ? h + 1 : d + 1);
        }
        else {
          if (e4 !== k) {
            g++;
          }
        }
        p[y] = h = g;
        g = d;
        d = b;
        b = c;
        c = a;
      }
    }

    for (; x < m;) {
      var e = t.charCodeAt(x);
      c = x;
      d = ++x;
      for (y = 0; y < n; y++) {
        a = p[y];
        if (a < c || d < c) {
          d = (a > d ? d + 1 : a + 1);
        }
        else {
          if (e !== s.charCodeAt(y)) {
            d = c + 1;
          }
          else {
            d = c;
          }
        }
        p[y] = d;
        c = a;
      }
      h = d;
    }

    return h;
  }

  ngOnInit(): void {

  }

}

