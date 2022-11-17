import { Component, OnInit, Input } from '@angular/core';



@Component({

  selector: 'app-ngx-graph',
  templateUrl: './ngx-graph.component.html',
  styleUrls: ['./ngx-graph.component.css']
})
export class NgxGraphComponent implements OnInit {

  constructor() { }
  
 
  @Input() model: any;
  @Input() index:number;     

  aa:{
   
  }

  ngOnInit(): void {
   
    this.aa
  }

}
