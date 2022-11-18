import { Component, OnInit, Input } from '@angular/core';



@Component({

  selector: 'app-ngx-graph',
  templateUrl: './ngx-graph.component.html',
  styleUrls: ['./ngx-graph.component.css']
})
export class NgxGraphComponent implements OnInit {

  constructor() { }
  sumSTksatot:number=0;
  sumTSksatot:number=0  
 
  @Input() arr: any;
  @Input() arrST: any;
  @Input() arrTS: any;
  @Input() index:number;
     

  calcSumKsatot(){
    let count: number = 0;
    this.arrST.forEach(e => {count = e.count +count });
    this.sumSTksatot=count;
    count=0
    this.arrTS.forEach(e => {count = e.count +count });
    this.sumTSksatot=count;

  }

  ngOnInit(): void {
    this.calcSumKsatot()
    
  }

  ngOnChanges():void{
    this.calcSumKsatot()

  }

}
