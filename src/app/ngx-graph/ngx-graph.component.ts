
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, Input } from '@angular/core';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';


//import { Node, Edge, ClusterNode } from '@swimlane/ngx-graph';


@Component({

  selector: 'app-ngx-graph',
  templateUrl: './ngx-graph.component.html',
  styleUrls: ['./ngx-graph.component.css']
})


export class NgxGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('visNetworkIN', { static: false }) visNetworkIN!: ElementRef;
  @ViewChild('visNetworkOUT', { static: false }) visNetworkOUT!: ElementRef;
  private networkInstance: any;


  constructor() { }
  sumSTksatot: number = 0;
  sumTSksatot: number = 0

  @Input() arr: any;
  @Input() arrST: any;
  @Input() arrTS: any;
  @Input() index: number;





  calcSumKsatot() {

    //חישוב סהכ קשתות נכנסות ויוצאות
    let count: number = 0;
    this.arrST.forEach(e => { count = e.count + count });
    this.sumSTksatot = count;

    count = 0
    this.arrTS.forEach(e => { count = e.count + count });
    this.sumTSksatot = count;

  }


  //פונקציה ליצירת גרפים
  sohwGrafh() {


    // create an array with nodes
    //קשתות יוצאות 
    let arr: any[] = [];
    let arrEdges: any[] = [];

    //חול אובייקטך
    let obj = {}
    obj["id"] = this.arrST[0].Source
    obj["label"] = this.arrST[0].Source
    arr.push(obj);

    //הכנסה של איבר ראשי למערך
    this.arrST.forEach(element => {
      obj = {}
      if (this.arrST[0].Source != element.Target) {
        obj["id"] = element.Target
        obj["label"] = element.Target
        arr.push(obj);
      }
    });

    let nodes = new DataSet<any>(arr);

    //הכנסת ערכים from to

    this.arrST.forEach(element => {
      obj = {}

      obj["from"] = element.Source
      obj["to"] = element.Target
      arrEdges.push(obj);
    });




    let edges = new DataSet<any>(arrEdges);
    const dataIN = { nodes, edges };
    const containerIN = this.visNetworkIN;
    this.networkInstance = new Network(containerIN.nativeElement, dataIN, {});





    //קשתות נכנסות

    let arr1: any[] = [];
    let arrEdges1: any[] = [];
    let obj1 = {}
    obj1["id"] = this.arrTS[0].Source
    obj1["label"] = this.arrTS[0].Source
    arr1.push(obj1);

    this.arrTS.forEach(element => {
      obj1 = {}
      if (this.arrTS[0].Source != element.Source) {
        obj1["id"] = element.Source
        obj1["label"] = element.Source
        arr1.push(obj1);
      }


    });


    nodes = new DataSet<any>(arr1);


    this.arrTS.forEach(element => {
      obj1 = {}

      obj1["from"] = element.Source
      obj1["to"] = element.Target
      arrEdges1.push(obj1);


    });

    // create an array with edges
    edges = new DataSet<any>(arrEdges1);
    const dataOUT = { nodes, edges };

    const containerOUT = this.visNetworkOUT;
    this.networkInstance = new Network(containerOUT.nativeElement, dataOUT, {});

  }




  ngOnInit(): void {

    this.sohwGrafh()
    this.calcSumKsatot()

  }

  ngOnChanges(): void {

    this.sohwGrafh()
    this.calcSumKsatot()

  }

  ngAfterViewInit(): void {





  }


}
