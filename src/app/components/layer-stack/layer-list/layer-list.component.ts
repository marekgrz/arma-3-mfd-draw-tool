import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.less']
})
export class LayerListComponent implements OnInit {


  youTree = [
    {
      name: 'first elem',
      id: 1234567890,
      childrens: [
        {
          name: 'first child elem',
          id: '01234567',
          childrens: []
        },
        {
          name: 'second child elem',
          id: '01234561',
          childrens: [
            {
              name: 'second child elem',
              id: '01234561',
              childrens: [
                {
                  name: 'second child elem',
                  id: '01234561',
                  childrens: []
                }
              ]
            }
          ]
        }
      ]
    },
  ];

  config =  {
    rootTitle: 'Draw',
    showAddButtons: false, // show/hide add button for all elements
    showRenameButtons: true, // show/hide rename buttons for all elements
    showDeleteButtons: true, // show/hide delete buttons for all elements
    showRootActionButtons: false,
  };

  constructor() { }

  ngOnInit(): void {
  }
}
